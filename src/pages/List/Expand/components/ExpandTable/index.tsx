import * as React from 'react';
import { Card, Table, Pagination, Field, Button } from '@alifd/next';
import { useFusionTable } from 'ahooks';

import styles from './index.module.css';

const { useState } = React;

const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: any): Promise<any> => {
  let query = `page=${current}&size=${pageSize}`;
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });
  return fetch(`https://randomuser.me/api?results=${pageSize}&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      total: 55,
      list: res.results.slice(0, 10),
    }));
};

function tableActions(val: string, index: number, record: any) {
  return (
    <div className={styles.tableActions}>
      <Button
        onClick={() => console.log(record, '操作1')}
        text
        type="primary"
      >
        操作1
      </Button>

      <Button
        onClick={() => console.log(record, '操作2')}
        text
        type="primary"
      >
        操作2
      </Button>

      <Button
        onClick={() => console.log(record, '操作3')}
        text
        type="primary"
      >
        操作3
      </Button>
    </div>
  );
}

function subTableActions(val: string, index: number, record: any) {
  return (
    <div className={styles.tableActions}>
      <Button
        onClick={() => console.log(record, '子表格操作1')}
        text
        type="primary"
      >
        子表格操作1
      </Button>
    </div>
  );
}

function SubTable(props: any) {
  return (
    <Table
      dataSource={props.dataSource}
      hasBorder={false}
      primaryKey="postcode"
      size="small"
    >
      <Table.Column
        dataIndex="country"
        title="country"
      />

      <Table.Column
        dataIndex="state"
        title="state"
      />

      <Table.Column
        dataIndex="city"
        title="city"
      />

      <Table.Column
        dataIndex="street.name"
        title="street"
      />

      <Table.Column cell={subTableActions} />
    </Table>
  );
}

export default function ExpandTable() {
  const field = Field.useField([]);
  const { paginationProps, tableProps } = useFusionTable(getTableData, {
    field,
  });
  const [openRows, setOpenrows] = useState([]);
  return (
    <Card
      className={styles.container}
      free
    >
      <Card.Content>
        <Table.StickyLock
          {...tableProps}
          expandedRowIndent={[0, 0]}
          expandedRowRender={(record) => <SubTable dataSource={[record.location]} />}
          hasBorder={false}
          onRowOpen={(keys) => setOpenrows(keys)}
          openRowKeys={openRows}
          primaryKey="email"
          tableWidth={1000}
        >
          <Table.Column
            dataIndex="name.last"
            lock
            title="name"
            width={140}
          />

          <Table.Column
            dataIndex="email"
            title="email"
            width={500}
          />

          <Table.Column
            dataIndex="phone"
            title="phone"
            width={300}
          />

          <Table.Column
            dataIndex="login.username"
            title="username"
            width={300}
          />

          <Table.Column
            dataIndex="login.uuid"
            title="uuid"
            width={300}
          />

          <Table.Column
            dataIndex="gender"
            title="gender"
            width={200}
          />

          <Table.Column
            cell={tableActions}
            width={500}
          />
        </Table.StickyLock>

        <Pagination
          style={{ marginTop: 16, textAlign: 'right' }}
          {...paginationProps}
        />
      </Card.Content>
    </Card>
  );
}
