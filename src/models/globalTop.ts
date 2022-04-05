import Contract from '@/utils/contract';
import { DID_TITLE } from '@/utils/near/config';
import { getCidUrl } from '@/utils/common';

export default {
  namespace: 'globalTop',
  state: {
    foldersList: [],
    fileList: [],
    userinfo: {
      name: '',
      image: 'https://bafybeig3q3g27gsjbcldzuhm4o3clcuuqsvuc7ousbkvxxdjtdgtgmxpzq.ipfs.dweb.link/avata.png',
    },
  },
  reducers: {
    save(state: any, action: any) {
      return { ...state, ...action.state };
    },
    add(state: object, acton: any) {
      return {
        ...state,
      };
    },
    saveFoldersList(state: object, action: any) {
      return { ...state, fileList: action.payload };
    },
    addFolders(state: object, action: any) {
      return { ...state, folderList: action.foldersList };
    },
  },
  effects: {
    *getFileList(payload: any, { call, put }: any): any {
      let { contract, getID } = Contract;
      const files = yield call(contract.view_account({ did: DID_TITLE + getID }));
      yield put({ type: 'saveFoldersList', payload: files });
    },
    *getUserinfo(payload: any, { call, put }: any): any {
      let { contract } = Contract;
      let userName = localStorage.getItem('userId');
      if (!contract) return;
      try {
        const result = yield contract.view_account({
          did: `${DID_TITLE}${userName}`,
        });
        
        let parseResult = JSON.parse(result);
        
        let image = getCidUrl(parseResult.account.account_images,parseResult.account.account_images_name);
        yield put({
          type: 'save',
          state: {
            userinfo: {
              name: parseResult.account.account_name!=''?parseResult.account.account_name:userName,
              image: image,
            },
          },
        });
      } catch (error) {
      }
    },
  },
};
