import * as React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import Tasks from './components/Tasks';
import UserInfo from './components/UserInfo';
import SelectLang from './components/SelectLang';

const { Cell } = ResponsiveGrid;

function Solution() {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          breadcrumbs={[]}
          description="包括状态管理方案、多语言切换的示例"
          title="官方推荐方案"
        />
      </Cell>

      <Cell colSpan={12}>
        <Tasks />
      </Cell>

      <Cell colSpan={12}>
        <UserInfo />
      </Cell>

      <Cell colSpan={12}>
        <SelectLang />
      </Cell>
    </ResponsiveGrid>
  );
}

export default Solution;
