import * as React from 'react';
import {
  Card,
  Table,
  Pagination,
  Divider,
  ResponsiveGrid,
  Button,
  Box,
  Form,
  Input,
  Select,
  Icon,
  Loading,
} from '@alifd/next';

import styles from './index.module.css';

const { useState, useEffect } = React;
const { Cell } = ResponsiveGrid;
const { Option } = Select;
const FormItem = Form.Item;

export interface IDataSource {
  tableData: Array<Record<string, unknown>>;
  tableColumn: any;
}
const mockTableData: Array<Record<string, unknown>> = [];
for (let i = 0; i <= 10; i += 1) {
  mockTableData.push({
    name: `品牌营销服务设计 ${String.fromCharCode(97 + i).toUpperCase()}`,
    type: Math.random() > 0.5 ? '24小时页面' : 'Banner 广告A',
    demand: ['曾庆超', '阮小五', '公孙胜'][i % 3],
    interface: ['阮小二', '谢莉莉', '樊瑞'][i % 3],
    supplier: '博彦-李强',
    designer: ['李立', '曹正', '姚越洋'][i % 3],
  });
}

const DEFAULT_DATA: IDataSource = {
  tableData: mockTableData,
  tableColumn: {
    name: '需求名称',
    type: '类型数量',
    demand: '需求方',
    interface: '接口人',
    supplier: '供应商接口人',
    designer: '设计师',
  },
};

interface ITableListProps {
  dataSource: IDataSource;
}

const TableList: React.FunctionComponent<ITableListProps> = (props: ITableListProps): JSX.Element => {
  const { dataSource = DEFAULT_DATA } = props;

  const [loading, setLoading] = useState(true);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  const onOperation = () => {
    setLoading(true);
  };

  const onPaginationChange = () => {
    setLoading(true);
  };

  const toggleSeachList = () => {
    setExpand(!expand);
  };

  return (
    <Card free>
      <Card.Content>
        <Box padding={10}>
          <Form
            fullWidth
            labelAlign="top"
            responsive
          >
            <FormItem
              colSpan={3}
              label="需求名称/编号"
            >
              <Input
                innerAfter={<Icon
                  className={styles.searchIcon}
                  size="xs"
                  type="search"
                />}
                placeholder="输入需求名称/编号进行搜索"
              />
            </FormItem>

            <FormItem
              colSpan={3}
              label="需求方"
            >
              <Input placeholder="输入需求方进行搜索" />
            </FormItem>

            <FormItem
              colSpan={3}
              label="标签"
            >
              <Select placeholder="选择标签">
                <Option value="small">标签A</Option>

                <Option value="medium">标签B</Option>
              </Select>
            </FormItem>

            {expand && (
              <>
                <FormItem
                  colSpan={3}
                  label="需求名称/编号"
                >
                  <Input
                    innerAfter={<Icon
                      className={styles.searchIcon}
                      size="xs"
                      type="search"
                    />}
                    placeholder="输入需求名称/编号进行搜索"
                  />
                </FormItem>

                <FormItem
                  colSpan={3}
                  label="需求方"
                >
                  <Input placeholder="输入需求方进行搜索" />
                </FormItem>

                <FormItem
                  colSpan={3}
                  label="标签"
                >
                  <Select placeholder="选择标签">
                    <Option value="small">标签A</Option>

                    <Option value="medium">标签B</Option>
                  </Select>
                </FormItem>

                <FormItem
                  colSpan={3}
                  label="标签"
                >
                  <Select placeholder="选择标签">
                    <Option value="small">标签A</Option>

                    <Option value="medium">标签B</Option>
                  </Select>
                </FormItem>
              </>
            )}

            <Cell
              className={styles.btns}
              colSpan={3}
            >
              <Box
                align="flex-end"
                direction="row"
                justify="center"
                spacing={8}
                style={{ height: '100%' }}
              >
                <Button
                  onClick={onOperation}
                  type="primary"
                >
                  查询
                </Button>

                <Form.Reset>重置</Form.Reset>

                <Button onClick={toggleSeachList}>
                  {expand ? (
                    <>
                      收起 <Icon
                        className={styles.btnsIcon}
                        size="xs"
                        type="arrow-up"
                      />
                    </>
                  ) : (
                    <>
                      展开 <Icon
                        className={styles.btnsIcon}
                        size="xs"
                        type="arrow-down"
                      />
                    </>
                  )}
                </Button>
              </Box>
            </Cell>
          </Form>
        </Box>

        <Divider dashed />

        <div className={styles.main}>
          <Loading
            style={{ display: 'block' }}
            visible={loading}
          >
            <div className={styles.mainAdd}>
              <Button type="primary">新增</Button>

              <Button type="normal">下载</Button>

              <Button type="normal">
                更多操作
                <Icon
                  className={styles.mainIcon}
                  type="arrow-down"
                />
              </Button>
            </div>

            <Table
              className={styles.table}
              dataSource={dataSource.tableData}
              hasBorder={false}
              rowSelection={{ columnProps: () => ({ lock: 'left' }) }}
            >
              {Object.keys(dataSource.tableColumn).map((col) => (
                <Table.Column
                  key={col}
                  dataIndex={col}
                  title={dataSource.tableColumn[col]}
                />
              ))}

              <Table.Column
                cell={() => (
                  <div className={styles.opt}>
                    <Button
                      text
                      type="primary"
                    >
                      编辑
                    </Button>

                    <Divider direction="ver" />

                    <Button
                      text
                      type="primary"
                    >
                      订阅
                    </Button>

                    <Divider direction="ver" />

                    <Button
                      text
                      type="primary"
                    >
                      删除
                    </Button>
                  </div>
                )}
                title="操作"
              />
            </Table>

            <Box
              align="center"
              direction="row"
              justify="space-between"
              margin={[15, 0, 0, 0]}
            >
              <div className={styles.total}>
                共<span>200</span>
                条需求
              </div>

              <Pagination onChange={onPaginationChange} />
            </Box>
          </Loading>
        </div>
      </Card.Content>
    </Card>
  );
};

export default TableList;
