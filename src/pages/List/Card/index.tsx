import * as React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import CardList from './components/CardList';

const { Cell } = ResponsiveGrid;

function CardListPage() {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          breadcrumbs={[{ name: '列表页面' }, { name: '大卡片列表' }]}
          description="大卡片列表描述大卡片列表描述大卡片列表描述大卡片列表描述大卡片列表描述大卡片列表描述大卡片列表描述"
          title="大卡片列表"
        />
      </Cell>

      <Cell colSpan={12}>
        <CardList />
      </Cell>
    </ResponsiveGrid>
  );
}

export default CardListPage;
