import { PREVIEW_FILES } from './cluster/config';
import * as nearApiJs from 'near-api-js';
import * as nearConfig from '@/utils/near/config';
import Constract from '@/utils/contract'
import axios from 'axios';

export const setElectronLocalStorage = () => {
  try {
    let port = Number(document.body.getAttribute('data-port'));
    if (port) {
      //dist url change
      axios
        .post(`http://localhost:${port}/api/setLocalStorage`, {
        // .post(`https://sdcloudstorage.on.fleek.co:${port}/api/setLocalStorage`, {
          localStorage: JSON.stringify(localStorage),
        })
        .then((res: any) => {})
        .catch((error: any) => {});
    }
  } catch (error) {
    console.error('[ error ]-37', error);
  }
};

export const sidToCid = (sid: string) => {
  return sid  
};

export const getCidUrl = (cid: string,name:string) => {
  if (!cid) return '';
  console.log(name);
  
  let url = PREVIEW_FILES + cid+'.ipfs.dweb.link/'+name;
  console.log('url==================',url);
  
  return url;
};

export const cidToSid = (cid: string) => {
 return cid
};

export const getAccount = async (accountId: string) => {
  const connection = nearApiJs.Connection.fromConfig({
    networkId: nearConfig.NETWORK_ID,
    provider: { type: 'JsonRpcProvider', args: { url: nearConfig.NODE_URL + '/' } },
    signer: {},
  });
  let account = new nearApiJs.Account(connection, accountId);
  return account;
};
const parseUrl = (url:any) => {
  const a = document.createElement('a');
  a.href = url;
  return {
    source: url,
    protocol: a.protocol.replace(':', ''),
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: (function() {
      const ret:any = {};
      const seg = a.search.replace(/^\?/, '').split('&');
      const len = seg.length;
      let i = 0;
      let s;
      for (; i < len; i++) {
        if (!seg[i]) {
          continue;
        }
        s = seg[i].split('=');
        ret[s[0]] = s[1];
      }
      return ret;
    })(),
    file: (a.pathname.match(/\/([^/?#]+)$/i) || [, ''])[1],
    hash: a.hash.replace('#', ''),
    path: a.pathname.replace(/^([^/])/, '/$1'),
    relative: (a.href.match(/tps?:\/\/[^/]+(.+)/) || [
      ,
      '',
    ])[1],
    segments: a.pathname.replace(/^\//, '').split('/'),
  };
};
export const recoverAccount = async () => {
  
  // let {createFullAccessKey,signIn} = Constract
  // const keypair = await createFullAccessKey()    
  // const userInfo = JSON.parse(localStorage.getItem('undefined_wallet_auth_key')||'')
  // // const userId = decodeURIComponent(parseUrl(location.href).params.account_id)
  // const pubilckey = decodeURIComponent(parseUrl(location.href).params.all_keys)
  // console.log(pubilckey);
  
  // localStorage.setItem(`near-api-js:keystore:${userInfo.accountId}:${nearConfig.ACCOUNT_ID_SUFFIX}`, keypair);

};


