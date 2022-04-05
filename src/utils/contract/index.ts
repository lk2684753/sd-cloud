import * as nearAPI from 'near-api-js';
import { NEAR_CONTRACTID, DID_TITLE, ACCOUNT_ID_SUFFIX, ACCOUNT_HELPER_URL, NODE_URL } from '../near/config';
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'
const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGVlRjQwZDNlRDhERGFENjJjNzk5ZjVmQkJiNDZmMjk3YWJlZTIyOTciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDI5OTIyOTYwMTIsIm5hbWUiOiJmaXJzdF9zZHlfYXBpIn0.9E2Z6owH3YSlf7nD7nYI5Iof2XNh8FPlCUaMfUOvgi0'
export const client = new Web3Storage({ token: API_TOKEN })
const nearConfig = {
  networkId: ACCOUNT_ID_SUFFIX,
  nodeUrl: NODE_URL,
  contractName: NEAR_CONTRACTID,
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: ACCOUNT_HELPER_URL,
};
interface Contract {
  connect: any;
  near: any;
  walletAccount: any;
  contract: any;
  getID: any;
  signIn: any;
  signOut: any;
  init: any;
  createFullAccessKey: any;
  isLogin: any;
  getlist: Function;
  signAndSend: any;
  getAccessKey: Function
}

let obj: Contract = {
  connect: () => { },
  near: null,
  walletAccount: null,
  contract: null,
  getID: null,
  signIn: null,
  signOut: null,
  init: null,
  createFullAccessKey: () => { },
  isLogin: () => { },
  getlist: Function,
  signAndSend: () => { },
  getAccessKey: Function
};

obj.connect = async () => {
  try {
    obj.near = await nearAPI.connect({
      ...nearConfig,
      deps: {
        keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
      },
    });
  } catch (error) {
    console.log('[ error ]-48', error);
  }
};
obj.getAccessKey = async () => {
  console.log(123);

  const account = await obj.near.account(obj.getID)
  const key = await account.getAccessKeys()
  console.log(key);
}
obj.init = async () => {
  try {
    // obj.near = await nearAPI.connect({
    //   ...nearConfig,
    //   deps: {
    //     keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
    //   },
    // });
    obj.walletAccount = new nearAPI.WalletConnection(obj.near, NEAR_CONTRACTID);
    obj.isLogin = obj.walletAccount.isSignedIn();
    console.log('islogin========', obj.isLogin);

    obj.getID = obj.walletAccount.getAccountId();
    console.log('getID===========', obj.getID);

    obj.signIn = () => {
      obj.walletAccount.requestSignIn(NEAR_CONTRACTID, 'demo');
    };

    obj.signOut = () => {
      obj.walletAccount.signOut();
    };
    console.log(obj.walletAccount.account(),);
    obj.contract = await new nearAPI.Contract(
      obj.walletAccount.account(),
      nearConfig.contractName,
      {
        viewMethods: [
          'view_account',
          'view_files_in_folder',
          'check_did_status',
          'view_all_files',
          'view_file_share',
          'view_file_exist',
        ],
        changeMethods: [
          'reg_did_using_account',
          'store',
          'file_delete',
          'folder_create',
          'folder_rename',
          'folder_delete',
          'file_copy_to_folder',
          'files_delete',
          'file_delete_in_folder',
          'files_delete_in_folder',
          'save_account_image',
          'file_share',
          'file_rename',
          'save_account_name',
          'save_account_custom_node'
        ],
        sender: obj.walletAccount.getAccountId(),
      },
    );
    if (obj.getID) {
      try {
        console.log(DID_TITLE + obj.getID);
        const status = await obj.contract.check_did_status({ did: `${DID_TITLE}${obj.getID}` });
        console.log(status);
      } catch (error) {
        await obj.contract.reg_did_using_account({});
      }
    } else {
      obj.signIn()
    }
  } catch (error) {
    console.log('[ error ]-111', error);
  }
  obj.createFullAccessKey = async () => {
    const keyPair = nearAPI.KeyPair.fromRandom("ed25519");
    return keyPair.toString()
  }
  obj.getlist = (list: any) => {
    list.map((item: any) => {
      const fileType = item.file_name.substring(item.file_name.lastIndexOf('.') + 1);
      switch (fileType) {
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'bmp':
        case 'gif':
        case 'webp':
        case 'psd':
        case 'svg':
        case 'tiff':
          item.icon = 'icon-tupiandefuben';
          break;
        case 'mp4':
        case 'm2v':
        case 'mkv':
        case 'rmvb':
        case 'wmv':
        case 'avi':
        case 'wav':
        case 'flv':
        case 'mov':
        case 'm4v':
          item.icon = 'icon-shipindefuben';
          break;
        case 'txt':
          item.icon = 'icon-Txt';
          break;
        case 'xls':
        case 'xlsx':
          item.icon = 'icon-Excel';
          break;
        case 'doc':
        case 'docx':
          item.icon = 'icon-Word';
          break;
        case 'ppt':
        case 'pptx':
          item.icon = 'icon-PPT';
          break;
        case 'pdf':
          item.icon = 'icon-Pdf';
          break;
        case 'exe':
          item.icon = 'icon-yasuobao';
          break;
        case 'mp3':
        case 'ogg':
        case 'wav':
          item.icon = 'icon-yinpindefuben';
          break;
        default:
          item.icon = 'icon-weizhiwenjian';
          break;
      }
    });
    return list;
  };
};

export default obj;
