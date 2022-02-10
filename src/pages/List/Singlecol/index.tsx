import * as React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import SingleColFilterTable from './components/SingleColFilterTable';

const { Cell } = ResponsiveGrid;

function FusionSinglecolTable() {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          breadcrumbs={[{ name: '列表页面' }, { name: '表格列表' }, { name: '单列过滤' }]}
          description="单列过滤单列过滤单列过滤单列过滤单列过滤单列过滤单列过滤单列过滤单列过滤单列过滤"
          title="单列过滤"
        />
      </Cell>

      <Cell colSpan={12}>
        <SingleColFilterTable />
      </Cell>
    </ResponsiveGrid>
  );
}

export default FusionSinglecolTable;
