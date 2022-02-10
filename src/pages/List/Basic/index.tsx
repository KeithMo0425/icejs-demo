import * as React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import BasicList from './components/BasicList';

const { Cell } = ResponsiveGrid;

function BasicListPage() {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          breadcrumbs={[{ name: '列表页面' }, { name: '小卡片列表' }]}
          description="小卡片列表描述小卡片列表描述小卡片列表描述小卡片列表描述小卡片列表描述小卡片列表描述小卡片列表描述"
          title="小卡片列表"
        />
      </Cell>

      <Cell colSpan={12}>
        <BasicList />
      </Cell>
    </ResponsiveGrid>
  );
}

export default BasicListPage;
