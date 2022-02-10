import * as React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import SingleTreeTable from './components/SingleTreeTable';

const { Cell } = ResponsiveGrid;

function FusionSingletreeTable() {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          breadcrumbs={[{ name: '列表页面' }, { name: '表格列表' }, { name: '单层树表' }]}
          description="单层树表单层树表单层树表单层树表单层树表单层树表单层树表单层树表单层树表合并单元格"
          title="单层树表"
        />
      </Cell>

      <Cell colSpan={12}>
        <SingleTreeTable />
      </Cell>
    </ResponsiveGrid>
  );
}

export default FusionSingletreeTable;
