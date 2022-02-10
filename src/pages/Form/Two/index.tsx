import * as React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import TwoColumnForm from './components/TwoColumnForm';

const { Cell } = ResponsiveGrid;

function FormTwo() {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          breadcrumbs={[{ name: '表单页面' }, { name: '双列基础表单' }]}
          description="双列基础表单双列基础表单双列基础表单双列基础表单双列基础表单双列基础表单双列基础表单"
          title="双列基础表单"
        />
      </Cell>

      <Cell colSpan={12}>
        <TwoColumnForm />
      </Cell>
    </ResponsiveGrid>
  );
}

export default FormTwo;
