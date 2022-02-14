import { getConfiguredCache } from 'money-clip';
import geoip from 'ipfs-geoip';
// import PQueue from 'p-queue'
import HLRU from 'hashlru';
import { create } from 'ipfs-http-client';
const geoipVersion = geoip;

let geoipCache: any, failedAddrs: any, queue: any, geoipLookupPromises: any, pass: any;
const isNonHomeIPv4 = (t: any) => t[0] === 4 && t[1] !== '127.0.0.1';
const parseLatency = (latency: string) => {
  if (latency === 'n/a') return;
  let value = parseInt(latency);
  const unit = latency.substring(latency.length - 1, -1);

  value = unit === 's' ? value * 1000 : value;

  return value;
};
class PeerLocationResolver {
  constructor() {
    geoipCache = getConfiguredCache({
      name: 'geoipCache',
      version: '^7.0.0',
      maxAge: 604800000,
    });

    failedAddrs = HLRU(500);

    //   queue = new PQueue({
    //   concurrency: 4,
    //   autoStart: true
    // })

    geoipLookupPromises = new Map();

    pass = 0;
  }

  async findLocations({ peers: peers, ipfs: ipfs }: any) {
    const exampleIp = '66.6.44.4';
    try {
      const result = await geoip.lookup(ipfs, exampleIp);
    } catch (err) {
      console.error('Error: ' + err);
    }

    try {
      const result = await geoip.lookupPretty(ipfs, '/ip4/' + exampleIp);
    } catch (err) {
      console.error('Error: ' + err);
    }

    const res = [];

    for (const p of this.optimizedPeerSet(peers)) {
      const peerId = p.peer;
      const addr = p.Addr.split('/');
      const ipv4Tuple = [addr[1].substring(addr[1].length - 1, addr[1].length), addr[2]];
      if (!ipv4Tuple) {
        continue;
      }

      const ipv4Addr = ipv4Tuple[1];
      if (failedAddrs.has(ipv4Addr)) {
        continue;
      }

      // maybe we have it cached by ipv4 address already, check that.
      const location = await geoipCache.get(ipv4Addr);

      if (location) {
        res[peerId] = location;
        continue;
      }

      // no ip address cached. are we looking it up already?
      if (geoipLookupPromises.has(ipv4Addr)) {
        continue;
      }

      // geoipLookupPromises.set(ipv4Addr, queue.add(async () => {
      //   try {
      //     const data = await geoip.lookup(getIpfs(), ipv4Addr)
      //     await geoipCache.set(ipv4Addr, data)
      //   } catch (e) {
      //     // mark this one as failed so we don't retry again
      //     failedAddrs.set(ipv4Addr, true)
      //   } finally {
      //     geoipLookupPromises.delete(ipv4Addr)
      //   }
      // }))
    }

    return res;
  }

  optimizedPeerSet(peers: any) {
    if (pass < 3) {
      // use a copy of peers sorted by latency so we can resolve closest ones first
      // (https://github.com/ipfs-shipyard/ipfs-webui/issues/1273)
      const ms = (x: any) => {
        return parseLatency(x.Latency) || 9999;
      };

      const sortedPeersByLatency = peers.concat().sort((a: number, b: number) => ms(a) - ms(b));
      // take the closest subset, increase sample size each time
      // this ensures initial map updates are fast even with thousands of peers
      pass = pass + 1;

      switch (pass - 1) {
        case 0:
          return sortedPeersByLatency.slice(0, 10);
        case 1:
          return sortedPeersByLatency.slice(0, 100);
        default:
          return sortedPeersByLatency.slice(0, 200);
      }
    }
    return peers;
  }
}
export default PeerLocationResolver;
