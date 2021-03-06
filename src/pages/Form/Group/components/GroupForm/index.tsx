import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { Card, Form, Input, Select, Button, Table, Box, Divider, MenuButton, Dialog, Field } from '@alifd/next';
import styles from './index.module.css';

export interface Company {
  id?: string;
  name?: string;
  business?: string;
  address?: string;
  creatorName?: string;
  edited?: boolean; // 内部创建和使用数据
}

export interface DataSource {
  basic: {
    companyName?: string;
    projectNo?: string;
    investmentsCommittee?: string;
    projectType?: string;
    projectId?: number;
  };
  member: {
    contractType?: number;
    icMemberId?: number;
    forensicId?: number;
    financeId?: number;
    projectId?: number;
  };
  company: Company[];
}

export interface GroupFormProps {
  dataSource?: DataSource;
  footerLeft?: number;
  footerRight?: number;
  onSubmit?: (data: DataSource) => void;
  onCancel?: () => void;
}
const { useState, useEffect, useRef } = React;
const DEFAULT_DATA: DataSource = {
  basic: {},
  member: {},
  company: [
    {
      id: '1',
      name: '蚂蚁证券投资有限公司 A',
      business: '金融证券代理',
      address: '1569 Cronin Ways Apt. 082',
      creatorName: '欧鹏',
    },
    {
      id: '2',
      name: '蚂蚁证券投资有限公司 B',
      business: '金融证券代理',
      address: '4016 Kautzer Route Suite 366',
      creatorName: '阮小五',
    },
    {
      id: '3',
      name: '蚂蚁证券投资有限公司 C',
      business: '金融证券代理',
      address: '22 Haag Manor',
      creatorName: '阮小二',
    },
    {
      id: '4',
      name: '蚂蚁证券投资有限公司 D',
      business: '金融证券代理',
      address: '1014 McLaughlin Unions',
      creatorName: '阮小七',
    },
    {
      id: '5',
      name: '蚂蚁证券投资有限公司 E',
      business: '金融证券代理',
      address: '8748 Devante Center',
      creatorName: '公孙胜',
    },
    {
      id: '6',
      name: '蚂蚁证券投资有限公司 F',
      business: '金融证券代理',
      address: '1014 McLaughlin Unions',
      creatorName: '曹正',
    },
    {
      id: '7',
      name: '蚂蚁证券投资有限公司 G',
      business: '金融证券代理',
      address: '8748 Devante Center',
      creatorName: '李立',
    },
    {
      id: '8',
      name: '蚂蚁证券投资有限公司 H',
      business: '金融证券代理',
      address: '1569 Cronin Ways Apt. 082',
      creatorName: '樊瑞',
    },
  ],
};

const GroupForm: React.FC<GroupFormProps> = (props: GroupFormProps) => {
  const { dataSource: defaultDataSource = DEFAULT_DATA, onSubmit = () => {}, onCancel = () => {} } = props;

  const [dataSource, setDataSouce] = useState<DataSource>(defaultDataSource);
  const basicField = Field.useField({ values: dataSource.basic });
  const memberField = Field.useField({ values: dataSource.member });

  const containerRef = useRef(null);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react/no-find-dom-node
    const dom = findDOMNode(containerRef.current) as HTMLDivElement;
    const rect = dom?.getBoundingClientRect() as DOMRect;
    setLeft(rect?.left);
    setRight(document.documentElement.offsetWidth - rect?.left - rect?.width);
  }, []);

  const changeRowData = (index: number, key: keyof Company, value: string | number | boolean | []) => {
    const company: Company[] = [...dataSource.company];
    (company[index][key] as string | number | boolean | []) = value;

    setDataSouce({
      ...dataSource,
      company,
    });
  };

  const deleteRow = (index: number) => {
    const company: Company[] = [...dataSource.company];
    if (!company[index].id) {
      company.splice(index, 1);
      setDataSouce({
        ...dataSource,
        company,
      });
      return;
    }
    Dialog.confirm({
      content: `确定要删除公司：${company[index].name} ?`,
      onOk: () => {
        company.splice(index, 1);
        setDataSouce({
          ...dataSource,
          company,
        });
      },
    });
  };

  const addRow = () => {
    setDataSouce({
      ...dataSource,
      company: [...dataSource.company, { edited: true }],
    });
  };

  const submit = () => {
    onSubmit({
      basic: basicField.getValues(),
      member: memberField.getValues(),
      company: dataSource.company,
    });
  };

  const renderEditCell = (v: string, i: number, row: { edited: boolean }, key: keyof Company) => {
    if (row.edited) {
      return (<Input
        onChange={(value) => changeRowData(i, key, value)}
        style={{ width: '100%' }}
        value={v || ''}
      />);
    }
    return v;
  };

  return (
    <div className={styles.GroupForm}>
      <Card
        ref={containerRef}
        className={styles.Card}
        free
      >
        <Card.Header title="项目成员信息" />

        <Card.Divider />

        <Card.Content>
          <Form
            field={basicField}
            fullWidth
            labelAlign="top"
            responsive
          >
            <Form.Item
              colSpan={4}
              label="公司简称"
              required
            >
              <Input
                name="companyName"
                placeholder="请输入公司简称"
              />
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="项目代号"
              required
            >
              <Input
                name="projectNo"
                placeholder="请输入项目代号"
              />
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="投资委员会"
              required
            >
              <Input
                name="investmentsCommittee"
                placeholder="请输入投资委员会"
              />
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="项目类型"
              required
            >
              <Input
                name="projectType"
                placeholder="请输入项目类型"
              />
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="关联项目"
              required
            >
              <Select
                id="relativeId"
                name="projectId"
                placeholder="请选择关联项目"
              >
                <Select.Option value={1}>项目一</Select.Option>

                <Select.Option value={2}>项目二</Select.Option>

                <Select.Option value={3}>项目三</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Card.Content>
      </Card>

      <Card
        className={styles.Card}
        free
      >
        <Card.Header title="基础信息" />

        <Card.Divider />

        <Card.Content>
          <Form
            field={memberField}
            fullWidth
            labelAlign="top"
            responsive
          >
            <Form.Item
              colSpan={4}
              label="合同类型"
              required
            >
              <Select
                name="contractType"
                placeholder="请选择合同类型"
              >
                <Select.Option value={1}>合同一</Select.Option>

                <Select.Option value={2}>合同二</Select.Option>

                <Select.Option value={3}>合同三</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="IC成员"
              required
            >
              <Select
                name="icMemberId"
                placeholder="请选择IC成员"
              >
                <Select.Option value={1}>成员一</Select.Option>

                <Select.Option value={2}>成员二</Select.Option>

                <Select.Option value={3}>成员三</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="法务评审会"
              required
            >
              <Select
                name="forensicId"
                placeholder="请选择法务评审"
              >
                <Select.Option value={1}>法务一</Select.Option>

                <Select.Option value={2}>法务二</Select.Option>

                <Select.Option value={3}>法务三</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="财务评审"
              required
            >
              <Select
                name="financeId"
                placeholder="请选择财务评审"
              >
                <Select.Option value={1}>财务一</Select.Option>

                <Select.Option value={2}>财务二</Select.Option>

                <Select.Option value={3}>财务三</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="项目评审"
              required
            >
              <Select
                name="projectId"
                placeholder="请选择项目评审"
              >
                <Select.Option value={1}>项目一</Select.Option>

                <Select.Option value={2}>项目二</Select.Option>

                <Select.Option value={3}>项目三</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Card.Content>
      </Card>

      <Card
        className={styles.Card}
        free
      >
        <Card.Header title="基础信息" />

        <Card.Divider />

        <Card.Content>
          <Box
            direction="row"
            margin={[0, 0, 16, 0]}
          >
            <Button
              className={styles.Button}
              onClick={addRow}
              type="primary"
            >
              {' '}
              新增
            </Button>
          </Box>

          <Table
            className={styles.mainTable}
            dataSource={dataSource.company}
            hasBorder={false}
          >
            <Table.Column
              cell={(v: string, i: number, row: { edited: boolean }) => renderEditCell(v, i, row, 'name')}
              dataIndex="name"
              title="目标公司"
            />

            <Table.Column
              cell={(v: string, i: number, row: { edited: boolean }) => renderEditCell(v, i, row, 'business')}
              dataIndex="business"
              title="主营业务"
            />

            <Table.Column
              cell={(v: string, i: number, row: { edited: boolean }) => renderEditCell(v, i, row, 'address')}
              dataIndex="address"
              title="注册地"
            />

            <Table.Column
              cell={(v: string, i: number, row: { edited: boolean }) => renderEditCell(v, i, row, 'creatorName')}
              dataIndex="creatorName"
              title="创始人"
            />

            <Table.Column
              cell={(v: string, i: number, row: { edited: boolean }) => {
                if (row.edited) {
                  return (
                    <div>
                      <Button
                        onClick={() => changeRowData(i, 'edited', false)}
                        text
                        type="primary"
                      >
                        保存
                      </Button>

                      <Divider direction="ver" />

                      <Button
                        onClick={() => deleteRow(i)}
                        text
                        type="primary"
                      >
                        删除
                      </Button>
                    </div>
                  );
                }

                return (
                  <div>
                    <Button
                      onClick={() => changeRowData(i, 'edited', true)}
                      text
                      type="primary"
                    >
                      编辑
                    </Button>

                    <Divider direction="ver" />

                    <Button
                      onClick={() => deleteRow(i)}
                      text
                      type="primary"
                    >
                      删除
                    </Button>

                    <Divider direction="ver" />

                    <MenuButton
                      label="更多"
                      popupTriggerType="hover"
                      text
                      type="primary"
                    >
                      <MenuButton.Item>操作一</MenuButton.Item>

                      <MenuButton.Item>操作二</MenuButton.Item>

                      <MenuButton.Item>操作三</MenuButton.Item>
                    </MenuButton>
                  </div>
                );
              }}
              title="操作"
            />
          </Table>
        </Card.Content>
      </Card>

      <Box
        align="center"
        className={styles.fixedButtons}
        direction="row"
        justify="center"
        spacing={16}
        style={{ left, right }}
      >
        <Button
          className={styles.Button}
          onClick={submit}
          type="primary"
        >
          提交
        </Button>

        <Button
          className={styles.Button}
          onClick={onCancel}
        >
          取消
        </Button>
      </Box>
    </div>
  );
};

export default GroupForm;
