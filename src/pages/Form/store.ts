import { createStore } from 'ice';
import foo from './models/foo';

const store = createStore({
  foo,
});

export default store;
