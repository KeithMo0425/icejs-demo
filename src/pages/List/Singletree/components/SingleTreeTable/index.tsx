import * as React from 'react';
import { Card, Table, Button, MenuButton, Message, Dialog } from '@alifd/next';
import styles from './index.module.css';

const { useState } = React;
const data = [
  {
    id: 'first',
    rowNo: '中华人民共和国国内安全管理条例',
    rowContent: '',
    children: [
      {
        id: 1,
        rowNo: '第一条',
        // eslint-disable-next-line
      rowContent: '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 2,
        rowNo: '第二条',
        // eslint-disable-next-line
      rowContent: '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 3,
        rowNo: '第三条',
        // eslint-disable-next-line
      rowContent: '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 4,
        rowNo: '第四条',
        // eslint-disable-next-line
      rowContent: '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
    ],
  },
  {
    id: 'second',
    rowNo: '中华人民共和国海商法',
    rowContent: '',
    children: [
      {
        id: 5,
        rowNo: '第一条',
        // eslint-disable-next-line
      rowContent: '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 6,
        rowNo: '第二条',
        // eslint-disable-next-line
      rowContent: '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 7,
        rowNo: '第三条',
        // eslint-disable-next-line
      rowContent: '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 8,
        rowNo: '第四条',
        // eslint-disable-next-line
      rowContent: '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
    ],
  },
  {
    id: 'third',
    rowNo: '纳税担保试行方法',
    rowContent: '',
    children: [
      {
        id: 9,
        rowNo: '第一条',
        // eslint-disable-next-line
      rowContent: '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 10,
        rowNo: '第二条',
        // eslint-disable-next-line
      rowContent: '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 11,
        rowNo: '第三条',
        // eslint-disable-next-line
      rowContent: '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 12,
        rowNo: '第四条',
        // eslint-disable-next-line
      rowContent: '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
    ],
  },
  {
    id: 'fourth',
    rowNo: '中华人民共和国担保法',
    rowContent: '',
    children: [
      {
        id: 13,
        rowNo: '第一条',
        // eslint-disable-next-line
      rowContent: '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 14,
        rowNo: '第二条',
        // eslint-disable-next-line
      rowContent: '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 15,
        rowNo: '第三条',
        // eslint-disable-next-line
      rowContent: '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 16,
        rowNo: '第四条',
        // eslint-disable-next-line
      rowContent: '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
    ],
  },
  {
    id: 'fifth',
    rowNo: '纳税担保试行方法',
    rowContent: '',
    children: [
      {
        id: 17,
        rowNo: '第一条',
        // eslint-disable-next-line
      rowContent: '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 18,
        rowNo: '第二条',
        // eslint-disable-next-line
      rowContent: '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 19,
        rowNo: '第三条',
        // eslint-disable-next-line
      rowContent: '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 20,
        rowNo: '第四条',
        // eslint-disable-next-line
      rowContent: '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
    ],
  },
];

export default function SingleTreeTable() {
  const [visible, setVisible] = useState(false);

  const fetchRemote = () => {
    Message.success('请求成功');
  };

  const tableOperation = (value: string, index: number, record: any) => {
    return (
      <div className={styles.buttonGroup}>
        <Button
          onClick={fetchRemote}
          text
          type="primary"
        >
          删除
        </Button>

        {record && record.children && (
          <>
            <Button
              onClick={() => setVisible(true)}
              text
              type="primary"
            >
              编辑
            </Button>

            <MenuButton
              label="更多"
              popupProps={{ autoFit: true }}
              text
              type="primary"
            >
              <MenuButton.Item onClick={fetchRemote}>提交审核</MenuButton.Item>

              <MenuButton.Item onClick={fetchRemote}>打回</MenuButton.Item>
            </MenuButton>
          </>
        )}
      </div>
    );
  };

  return (
    <Card
      className={styles.container}
      free
    >
      <Card.Content>
        <Table
          // eslint-disable-next-line consistent-return
          cellProps={(_rowIndex, colIndex, _dataIndex, record) => {
            if (record.children && colIndex === 0) {
              return {
                colSpan: 2,
              };
            }
          }}
          dataSource={data}
          hasBorder={false}
          isTree
          primaryKey="id"
        >
          <Table.Column
            dataIndex="rowNo"
            title="法律条文编号"
            width={140}
          />

          <Table.Column
            dataIndex="rowContent"
            title="法律条文内容"
          />

          <Table.Column
            cell={tableOperation}
            dataIndex="operation"
            title="操作"
            width={180}
          />
        </Table>

        <Dialog
          onCancel={() => setVisible(false)}
          onClose={() => setVisible(false)}
          onOk={() => {
            fetchRemote();
            setVisible(false);
          }}
          title="编辑窗口"
          visible={visible}
        >
          这里是编辑内容
        </Dialog>
      </Card.Content>
    </Card>
  );
}
