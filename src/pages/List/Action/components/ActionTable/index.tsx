import * as React from 'react';
import { Card, Table, Button, Icon, Pagination, Message } from '@alifd/next';
import { TableProps } from '@alifd/next/lib/table';
import { useFusionTable, useFullscreen } from 'ahooks';

import CustomList, { Column } from './CustomList';
import { getColumnKey } from './util';

import styles from './index.module.css';

const { useState } = React;
// @ts-ignore
const TableActionIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1899388_oxn3zhg34oj.js',
});

const getTableData = ({ current, pageSize }: { current: number; pageSize: number }): Promise<any> => {
  const query = `page=${current}&size=${pageSize}`;
  return fetch(`https://randomuser.me/api?results=${pageSize}&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      total: 55,
      list: res.results.slice(0, 10),
    }));
};

// 根据 hidden 切换当前 column 是否显示
const filterColumns = (columnList: Column[]) => {
  const newColumnList = [...columnList];
  return newColumnList
    .filter((columnItem) => {
      if (columnItem.hidden) {
        return false;
      }
      return true;
    })
    .map((columnItem) => {
      if (columnItem.children) {
        const groupProps = { ...columnItem };
        delete groupProps.children;

        return (
          <Table.ColumnGroup
            key={getColumnKey(columnItem)}
            {...groupProps}
          >
            {filterColumns(columnItem.children)}
          </Table.ColumnGroup>
        );
      }

      return (<Table.Column
        key={getColumnKey(columnItem)}
        {...columnItem}
      />);
    });
};

const defaultColumns: Column[] = [
  {
    id: '1',
    title: '名称',
    children: [
      {
        id: '1-1',
        title: '前缀',
        dataIndex: 'name.title',
      },
      {
        id: '1-2',
        title: '名',
        dataIndex: 'name.first',
      },
      {
        id: '1-3',
        title: '姓',
        dataIndex: 'name.last',
      },
    ],
  },
  {
    id: '2',
    title: 'Email',
    dataIndex: 'email',
  },
  {
    id: '3',
    title: '电话号码',
    dataIndex: 'phone',
  },
  {
    id: '4',
    title: '性别',
    dataIndex: 'gender',
  },
];

function AppList() {
  // 切换紧凑模式
  const [sizeStatus, changeSize] = useState<TableProps['size']>('medium');
  const autoChangeSize = () => {
    if (sizeStatus === 'medium') {
      changeSize('small');
    } else {
      changeSize('medium');
    }
  };

  // 切换 zebra
  const [zebraStatus, changeZebra] = useState(false);

  // 切换全屏
  const [, { toggleFull }] = useFullscreen(document.getElementById('table-container'), {
    onFull: () => {
      const ele = document.getElementById('table-container');
      ele.setAttribute('style', 'padding: 20px;background: #ffffff');
    },
  });

  // 获取表格数据
  const { paginationProps, tableProps } = useFusionTable(getTableData, {});

  // 切换当前 columns
  const [columns, onColumnChange] = useState<Column[]>(defaultColumns);

  return (
    <Card
      className={styles.container}
      free
      id="table-container"
    >
      <Card.Content>
        <div className={styles.actionBar}>
          <div className={styles.buttonGroup}>
            <Button
              onClick={() => Message.success('已批量处理xx条数据')}
              type="primary"
            >
              批量提交
            </Button>

            <Button onClick={() => Message.success('已批量处理xx条数据')}>批量删除</Button>

            <Button onClick={() => Message.success('已批量处理xx条数据')}>批量下载</Button>
          </div>

          <div className={styles.rightButtonGroup}>
            <Button
              onClick={autoChangeSize}
              text
            >
              <TableActionIcon
                size="small"
                type="narrow"
              />
            </Button>

            <Button
              onClick={() => changeZebra(!zebraStatus)}
              text
            >
              <TableActionIcon
                size="small"
                type="zebra"
              />
            </Button>

            <Button
              onClick={toggleFull}
              text
            >
              <TableActionIcon
                size="small"
                type="fullscreen"
              />
            </Button>

            <CustomList
              columns={columns}
              onChange={onColumnChange}
            />
          </div>
        </div>

        <Table
          {...tableProps}
          isZebra={zebraStatus}
          primaryKey="id.value"
          size={sizeStatus}
        >
          {filterColumns(columns)}
        </Table>

        <Pagination
          style={{ marginTop: 16, textAlign: 'right' }}
          totalRender={(total) => (
            <>
              共{' '}
              <Button
                text
                type="primary"
              >
                {total}
              </Button>{' '}
              个记录
            </>
          )}
          {...paginationProps}
        />
      </Card.Content>
    </Card>
  );
}

export default AppList;
