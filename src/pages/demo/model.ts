export default {
  namespace: 'demo',
  state: {
    demo: '',
  },
  reducers: {
    save(state: object, action: any) {
      return { ...state, ...action.state };
    },
  },
};
