import * as React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import BasicList from './components/BasicList';

const { Cell } = ResponsiveGrid;

function TableListPage() {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          breadcrumbs={[{ name: '列表页面' }, { name: '表格列表' }]}
          description="表格列表描述表格列表描述表格列表描述表格列表描述表格列表描述表格列表描述表格列表描述"
          title="表格列表"
        />
      </Cell>

      <Cell colSpan={12}>
        <BasicList />
      </Cell>
    </ResponsiveGrid>
  );
}

export default TableListPage;
