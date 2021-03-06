import React, { useState } from 'react';
import { Button, Select, Form, Field, Table, Card, Pagination } from '@alifd/next';
import { useFusionTable } from 'ahooks';

import EmptyBlock from './EmptyBlock';
import ExceptionBlock from './ExceptionBlock';

import styles from './index.module.css';

const FormItem = Form.Item;

const getTableData = (
  { current, pageSize }: { current: number; pageSize: number },
  formData: { status: 'normal' | 'empty' | 'exception' },
): Promise<any> => {
  console.log(current, pageSize, formData);
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

const defaultColumnWidth = {
  'name.last': 140,
  email: 500,
  phone: 500,
  gender: 140,
};

const FilterTable: React.FunctionComponent = (): JSX.Element => {
  const [columnWidth, onColumnWidthChange] = useState(defaultColumnWidth);
  const field = Field.useField([]);
  const { paginationProps, tableProps, search, error, refresh } = useFusionTable(getTableData, {
    field,
  });
  const { submit, reset } = search;

  const onResizeChange = (dataIndex: keyof typeof defaultColumnWidth, width: number) => {
    const newWidth = {
      ...columnWidth,
    };
    newWidth[dataIndex] += width;
    onColumnWidthChange(newWidth);
  };

  return (
    <div className={styles.FilterTable}>
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
              label="????????????"
              required
              requiredMessage="??????"
            >
              <Select
                dataSource={[
                  {
                    label: '????????????',
                    value: 'normal',
                  },
                  {
                    label: '???????????????',
                    value: 'empty',
                  },
                  {
                    label: '??????????????????',
                    value: 'exception',
                  },
                ]}
                name="status"
              />
            </FormItem>

            <FormItem colSpan={7} />

            <FormItem
              colSpan={2}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Form.Submit
                onClick={submit}
                style={{ marginRight: '20px' }}
                type="primary"
                validate
              >
                ??????
              </Form.Submit>

              <Form.Reset onClick={reset}>??????</Form.Reset>
            </FormItem>
          </Form>
        </Card.Content>
      </Card>

      <Card free>
        <Card.Content>
          <Table
            {...tableProps}
            emptyContent={error ? <ExceptionBlock onRefresh={refresh} /> : <EmptyBlock />}
            onResizeChange={onResizeChange}
            primaryKey="email"
          >
            <Table.Column
              dataIndex="name.last"
              resizable
              title="name"
              width={columnWidth['name.last']}
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
                ???{' '}
                <Button
                  text
                  type="primary"
                >
                  {total}
                </Button>{' '}
                ?????????
              </>
            )}
            {...paginationProps}
          />
        </Card.Content>
      </Card>
    </div>
  );
};

export default FilterTable;
