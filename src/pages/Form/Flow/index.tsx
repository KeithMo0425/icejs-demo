import * as React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import FlowForm from './components/FlowForm';

const { Cell } = ResponsiveGrid;

function FlowGroup() {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          breadcrumbs={[{ name: '表单页面' }, { name: '步骤表单' }]}
          description="步骤表单步骤表单步骤表单步骤表单步骤表单步骤表单步骤表单"
          title="步骤表单"
        />
      </Cell>

      <Cell colSpan={12}>
        <FlowForm />
      </Cell>
    </ResponsiveGrid>
  );
}

export default FlowGroup;
