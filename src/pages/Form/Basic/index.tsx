import * as React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';

import pageStore from '@/pages/Form/store';

import BasicForm from './components/BasicForm';

const { Cell } = ResponsiveGrid;

function FormBasic() {
  const [pageState, pageDispatchers] = pageStore.useModel('foo');

  React.useEffect(() => {
    pageDispatchers.getUserName();
  }, []);

  console.log(pageState);

  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          breadcrumbs={[{ name: '表单页面' }, { name: '单列基础表单' }]}
          description={pageState.name}
          title="单列基础表单"
        />
      </Cell>

      <Cell colSpan={12}>
        <BasicForm />
      </Cell>
    </ResponsiveGrid>
  );
}

export default FormBasic;
