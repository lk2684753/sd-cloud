export default {
  namespace: 'menu',
  state: {
    audioList: [],
    audioActiveIndex: 0,
  },
  reducers: {
    save(state: object, action: any) {
      return { ...state, ...action.state };
    },
  },
};
