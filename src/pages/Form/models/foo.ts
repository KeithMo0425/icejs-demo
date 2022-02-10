const delay = (time) => new Promise((resolve) => setTimeout(() => resolve(true), time));

export default {
  state: {
    name: '',
  },
  reducers: {
    updateName(prevState, payload) {
      return {
        ...prevState,
        ...payload,
      };
    },
  },
  effects: (dispatch) => ({
    async getUserName() {
      await delay(2000);
      dispatch.foo.updateName({ name: '123123' });
    },
  }),
};
