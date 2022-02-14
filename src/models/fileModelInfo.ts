import { object } from 'multiaddr/dist/src/protocols-table';

export default {
  namespace: 'fileModelInfo',
  state: {
    fileDownloadStatus: {},
    showCheck: () => {},
    fileModelDisplay: 'close',
  },
  reducers: {
    save(state: any, action: any) {
      return { ...state, ...action.state };
    },
  },
};
