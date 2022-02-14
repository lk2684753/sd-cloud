import styles from './index.less';
import { connect } from 'dva';
import WorldMap from './components/worldMap';
import PeersTable from './components/peersTable';
import { BASE_URL } from '@/utils/cluster/config';
import { useState, useEffect } from 'react';
import PeerLocationResolver from '@/utils/cluster/findeAddr';
import axios from 'axios';
import Empty from '@/components/Empty';
import Space from '@/components/Space';
// import * as IPFS from 'ipfs-core'
import { create } from 'ipfs-http-client';
interface Props {}

const Page: React.FC<Props> = (props) => {
  const [peersData, setPeersData] = useState<any[]>([]);
  useEffect(() => {
    console.log('props', props);

    (async () => {
      // console.log(123);
      // const ipfs = create({url:'http://122.114.37.226:25001/api/v0'})
      // const data = await ipfs.swarm.peers({verbose: true})
      // console.log('data======',data);

      axios({
        method: 'post',
        url:
          BASE_URL +
          ':25001/api/v0/swarm/peers?verbose=true&streams=true&latency=true&direction=true',
      })
        .then(async (res: any) => {
          console.log(res);

          setPeersData([...res.data.Peers]);
          res.data.Peers.map((item: any) => {
            console.log(item);

            (item.icon = 'icon-zhongguo'),
              (item.site = 'China'),
              (item.belongCluster = 'SDClould'),
              (item.cluster = item.Streams ? item.Streams[0].Protocol : '');
            const addr = item.Addr.split('/');
            const ipv4Tuple = [addr[1].substring(addr[1].length - 1, addr[1].length), addr[2]];

            item.connect = ipv4Tuple[1];
          });
          const peerLocResolver = new PeerLocationResolver();
        })
        .catch((err: any) => {});
    })();
  }, []);
  return (
    <div className={styles.node}>
      <WorldMap peersData={peersData} />
      {peersData.length ? (
        <PeersTable peersData={peersData}></PeersTable>
      ) : (
        <>
          <Space height={100}></Space>
          <Empty title="none"></Empty>
        </>
      )}
    </div>
  );
};

function mapStateToProps(state: any) {
  const { token } = state.globalTop;
  return {
    token,
  };
}

export default connect(mapStateToProps)(Page);
