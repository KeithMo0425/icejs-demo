import * as React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import SettingPersonBlock from './components/SettingPersonBlock';

const { Cell } = ResponsiveGrid;

function Person() {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          breadcrumbs={[{ name: '设置页面' }, { name: '个人设置' }]}
          title="个人设置"
        />
      </Cell>

      <Cell colSpan={12}>
        <SettingPersonBlock />
      </Cell>
    </ResponsiveGrid>
  );
}

export default Person;