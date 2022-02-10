import React from 'react';
import store from './store';

const { Provider } = store;

function Layout({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}

export default Layout;
