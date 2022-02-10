import * as React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import NotFound from './components/NotFound';

const { Cell } = ResponsiveGrid;

function FeedbackNotFound() {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          breadcrumbs={[{ name: 'Feedback页面' }, { name: '结果页面' }, { name: '404页面' }]}
          description="404页面描述404页面描述404页面描述404页面描述404页面描述404页面描述404页面描述"
          title="404页面"
        />
      </Cell>

      <Cell colSpan={12}>
        <NotFound />
      </Cell>
    </ResponsiveGrid>
  );
}

export default FeedbackNotFound;
