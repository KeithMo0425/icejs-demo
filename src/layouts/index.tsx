import React from 'react';
import { useLocation } from 'ice';

import BasicLayout from './BasicLayout';
import UserLayout from './UserLayout';

const NoLayoutRoutes = ['/login', '/register'];

function Layouts({ children }: { children: React.ReactNode }) {
  const params = useLocation();

  const Layout = NoLayoutRoutes.includes(params.pathname) ? UserLayout : BasicLayout;

  return <Layout>{children}</Layout>;
}

export default Layouts;
