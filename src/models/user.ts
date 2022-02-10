import { request } from 'ice';
import { IRootState, IRootDispatch } from '@/store';

interface IState {
  name: string;
  department: string;
  avatar: string;
  userid: number | null;
}

export default {
  state: {
    name: 'default',
    department: '',
    avatar: '',
    userid: null,
  },

  effects: (dispatch: IRootDispatch) => ({
    async fetchUserProfile() {
      const res = await request('/api/profile');
      if (res.status === 'SUCCESS') {
        dispatch.user.update(res.data);
      }
    },
  }),

  reducers: {
    update(prevState: IState, payload: IState) {
      return { ...prevState, ...payload };
    },
  },
};
