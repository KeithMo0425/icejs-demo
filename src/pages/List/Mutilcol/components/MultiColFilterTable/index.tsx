import * as React from 'react';
import { Button, Select, Input, Form, Field, Table, Card, Pagination, Icon } from '@alifd/next';
import { useFusionTable, useSetState } from 'ahooks';

import EmptyBlock from './EmptyBlock';
import ExceptionBlock from './ExceptionBlock';

import styles from './index.module.css';

const { useCallback } = React;
const FormItem = Form.Item;

const getTableData = (
  { current, pageSize }: { current: number; pageSize: number },
  formData: { status: 'normal' | 'empty' | 'exception' },
): Promise<any> => {
  if (!formData.status || formData.status === 'normal') {
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
  }
  if (formData.status === 'empty') {
    return Promise.resolve([]);
  }
  if (formData.status === 'exception') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('data exception'));
      }, 1000);
    });
  }

  return Promise.resolve([]);
};

interface ColumnWidth {
  name: number;
  email: number;
  phone: number;
  gender: number;
}

interface MultiColState {
  columnWidth: ColumnWidth;
  expandStatus: boolean;
  actionListSpan: number;
}

const defaultColumnWidth: ColumnWidth = {
  name: 140,
  email: 500,
  phone: 500,
  gender: 140,
};

// Filter区域 默认为收起状态
const defaultExpandStatus = false;
// 展开状态下一共有多少个项
const expandFieldLenth = 5;
// 收起状态下一共有多少项目
const collapseFieldLenth = 3;

const getNextActionListSpan = (expandStatus: boolean): number => {
  const totalFieldLength = expandStatus ? expandFieldLenth : collapseFieldLenth;
  if (totalFieldLength < 3) {
    return 3;
  }
  return (4 - (totalFieldLength % 4)) * 3;
};

const MultiColFilterTable: React.FC = () => {
  const [state, setState] = useSetState<MultiColState>({
    columnWidth: defaultColumnWidth,
    expandStatus: defaultExpandStatus,
    actionListSpan: getNextActionListSpan(defaultExpandStatus),
  });
  const field = Field.useField([]);
  const { paginationProps, tableProps, search, error, refresh } = useFusionTable(getTableData, {
    field,
  });
  const { submit, reset } = search;
  const { columnWidth } = state;

  const handleResizeChange = useCallback(
    (dataIndex: keyof typeof defaultColumnWidth, width: number) => {
      const newWidth = {
        ...columnWidth,
      };
      newWidth[dataIndex] += width;
      setState({ columnWidth: newWidth });
    },
    [columnWidth, setState],
  );

  const handleSetExpand = useCallback(() => {
    const nextExpand = !state.expandStatus;
    setState({
      expandStatus: nextExpand,
      actionListSpan: getNextActionListSpan(nextExpand),
    });
  }, [state, setState]);
  console.log('actionListSpan', state.actionListSpan);
  return (
    <div className={styles.container}>
      <Card free>
        <Card.Content>
          <Form
            className="filter-form"
            field={field}
            fullWidth
            labelAlign="top"
            responsive
          >
            <FormItem
              colSpan={3}
              label="ID:"
            >
              <Input name="id" />
            </FormItem>

            <FormItem
              colSpan={3}
              defaultValue="all"
              label="性别:"
              required
              requiredMessage="必填"
            >
              <Select
                dataSource={[
                  {
                    label: '男',
                    value: 'mail',
                  },
                  {
                    label: '女',
                    value: 'femail',
                  },
                  {
                    label: 'All',
                    value: 'all',
                  },
                ]}
                name="gender"
              />
            </FormItem>

            <FormItem
              colSpan={3}
              label="邮箱:"
            >
              <Input name="email" />
            </FormItem>

            {!state.expandStatus ? null : (
              <>
                <FormItem
                  colSpan={3}
                  label="手机号:"
                >
                  <Input name="phone" />
                </FormItem>

                <FormItem
                  colSpan={3}
                  defaultValue={[]}
                  label="国家:"
                >
                  <Select
                    dataSource={[
                      'AU',
                      'BR',
                      'CA',
                      'CH',
                      'DE',
                      'DK',
                      'ES',
                      'FI',
                      'FR',
                      'GB',
                      'IE',
                      'IR',
                      'NL',
                      'NZ',
                      'TR',
                      'US',
                    ]}
                    hasClear
                    mode="multiple"
                    name="nat"
                  />
                </FormItem>
              </>
            )}

            <FormItem
              className={styles['form-actions']}
              colSpan={state.actionListSpan}
            >
              <Form.Submit
                onClick={submit}
                style={{ marginRight: 10 }}
                type="primary"
                validate
              >
                提交
              </Form.Submit>

              <Form.Reset
                onClick={reset}
                style={{ marginRight: 10 }}
              >
                重置
              </Form.Reset>

              <Button onClick={handleSetExpand}>
                {state.expandStatus ? (
                  <>
                    收起
                    <Icon type="arrow-up" />
                  </>
                ) : (
                  <>
                    展开
                    <Icon type="arrow-down" />
                  </>
                )}
              </Button>
            </FormItem>
          </Form>
        </Card.Content>
      </Card>

      <Card free>
        <Card.Content>
          <Table
            {...tableProps}
            emptyContent={error ? <ExceptionBlock onRefresh={refresh} /> : <EmptyBlock />}
            onResizeChange={handleResizeChange}
            primaryKey="email"
          >
            <Table.Column
              dataIndex="name.last"
              resizable
              title="name"
              width={columnWidth.name}
            />

            <Table.Column
              dataIndex="email"
              resizable
              title="email"
              width={columnWidth.email}
            />

            <Table.Column
              dataIndex="phone"
              resizable
              title="phone"
              width={columnWidth.phone}
            />

            <Table.Column
              dataIndex="gender"
              resizable
              title="gender"
              width={columnWidth.gender}
            />
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
    </div>
  );
};

export default MultiColFilterTable;
