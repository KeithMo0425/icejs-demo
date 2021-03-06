import * as React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import ClassifiedForm from './components/ClassifiedForm';

const { Cell } = ResponsiveGrid;

function FormClassified() {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          breadcrumbs={[{ name: '表单页面' }, { name: '分类表单' }]}
          description="分类表单分类表单分类表单分类表单分类表单分类表单分类表单"
          title="分类表单"
        />
      </Cell>

      <Cell colSpan={12}>
        <ClassifiedForm />
      </Cell>
    </ResponsiveGrid>
  );
}

export default FormClassified;
