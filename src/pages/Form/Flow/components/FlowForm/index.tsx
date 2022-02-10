import * as React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Box,
  Card,
  Button,
  Form,
  Input,
  Select,
  Radio,
  Step,
  Field,
  Divider,
  Tag,
  Avatar,
  Typography,
  ResponsiveGrid,
} from '@alifd/next';
import styles from './index.module.css';

export interface Experience {
  company?: string;
  position?: string;
  region?: string;
  description?: string;
  salary?: string;
  time?: number;
  allowance?: string;
  rsu?: boolean;
}

export interface Approval {
  approverId?: number;
  signatureId?: number;
  assessmentType?: number;
  feedback?: string;
}

export interface DataSource {
  approval?: Approval;
  person?: {
    avatar?: string;
    surname?: string;
    name?: string;
    phone?: string;
    email?: string;
    region?: string;
    address?: string;
    workTime?: number;
    education?: string;
    rank?: string;
    position?: string;
    department?: string;
    workAddress?: string;
    salary?: string;
    experiences?: Experience[];
  };
}

export interface FlowFormProps {
  dataSource?: DataSource;
  footerLeft?: number;
  footerRight?: number;
  onAgree?: (data: Approval) => void;
  onRefuse?: () => void;
  onTransfer?: () => void;
  onSignature?: () => void;
}

const { useEffect, useState, useRef } = React;

const DEFAULT_DATA: DataSource = {
  approval: {
    approverId: 1,
    assessmentType: 1,
  },
  person: {
    avatar: 'https://img.alicdn.com/tfs/TB1WpoDouH2gK0jSZJnXXaT1FXa-1072-1608.jpg',
    surname: '谢',
    name: '莉莉',
    phone: '13676349585',
    email: 'Xielili@aliwork-inc.com',
    region: '中国/浙江',
    address: '杭州',
    workTime: 3,
    education: 'Singapore University of Technology and Design',
    rank: 'P10',
    position: 'Senior Director',
    department: 'aliwork&EHR',
    workAddress: '杭州',
    salary: '20,000',
    experiences: [
      {
        company: '浙江杭州天猫有限公司',
        position: '高级研发专家',
        region: '中国/浙江',
        description:
          'Fusion 是一套企业级中后台设计系统解决方案，致力于解决产品体验一致性问题、设计研发协同问题，以及UI开发效率问题。',
        salary: '20,000 USD',
        time: 13,
        allowance: '5,000 USD',
        rsu: false,
      },
    ],
  },
};

const FlowForm: React.FC<FlowFormProps> = (props: FlowFormProps) => {
  const {
    dataSource = DEFAULT_DATA,
    onAgree = () => {},
    onRefuse = () => {},
    onTransfer = () => {},
    onSignature = () => {},
  } = props;

  const field = Field.useField({
    values: dataSource.approval,
  });

  const containerRef = useRef(null);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react/no-find-dom-node
    const dom = findDOMNode(containerRef.current) as HTMLDivElement;
    const rect = dom?.getBoundingClientRect();
    setLeft(rect?.left);
    setRight(document.documentElement.offsetWidth - rect?.left - rect?.width);
  }, []);

  return (
    <Box
      ref={containerRef}
      className={styles.flowForm}
      spacing={20}
    >
      <Card free>
        <Card.Content>
          <Step
            current={1}
            shape="dot"
          >
            <Step.Item
              key={0}
              title="申请"
            />

            <Step.Item
              key={1}
              content="李强"
              title="审批"
            />

            <Step.Item
              key={2}
              title="接受"
            />

            <Step.Item
              key={3}
              title="合同发送"
            />

            <Step.Item
              key={4}
              title="合同接受"
            />

            <Step.Item
              key={5}
              title="入职准备"
            />

            <Step.Item
              key={6}
              title="完成"
            />
          </Step>
        </Card.Content>
      </Card>

      <Card free>
        <Card.Header title="审批信息" />

        <Card.Divider />

        <Card.Content>
          <Form
            field={field}
            fullWidth
            labelAlign="top"
            responsive
          >
            <Form.Item
              colSpan={4}
              label="审批人"
              required
            >
              <Select
                name="approverId"
                placeholder="请选择审批人"
              >
                <Select.Option value={1}>李强</Select.Option>

                <Select.Option value={2}>张三</Select.Option>

                <Select.Option value={3}>李四</Select.Option>

                <Select.Option value={4}>王五</Select.Option>

                <Select.Option value={5}>阮小二</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="加签人"
            >
              <Select
                name="signatureId"
                placeholder="请选择加签人"
              >
                <Select.Option value={1}>李强</Select.Option>

                <Select.Option value={2}>张三</Select.Option>

                <Select.Option value={3}>李四</Select.Option>

                <Select.Option value={4}>王五</Select.Option>

                <Select.Option value={5}>阮小二</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="评估方式"
            >
              <Radio.Group name="assessmentType">
                <Radio value={1}>已电面</Radio>

                <Radio value={2}>未电面</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              colSpan={8}
              label="意见&反馈"
            >
              <Input.TextArea
                maxLength={500}
                placeholder="请输入描述"
                showLimitHint
              />
            </Form.Item>
          </Form>
        </Card.Content>
      </Card>

      <Card free>
        <Card.Header title="候选人信息" />

        <Card.Divider />

        <Card.Content>
          <ResponsiveGrid>
            <ResponsiveGrid.Cell colSpan={6}>
              <Box
                align="flex-start"
                direction="row"
                spacing={16}
              >
                <Box padding={[9, 0, 0, 0]}>
                  <Avatar src={dataSource.person.avatar} />
                </Box>

                <Box spacing={10}>
                  <Form
                    labelAlign="top"
                    responsive
                  >
                    <Form.Item
                      colSpan={12}
                      label={`${dataSource.person.surname}${dataSource.person.name}`}
                    >
                      <span className="next-form-preview">
                        {dataSource.person.phone} | {dataSource.person.email}
                      </span>
                    </Form.Item>

                    <Form.Item
                      colSpan={6}
                      label="现在所在地"
                    >
                      <span className="next-form-preview">{dataSource.person.address}</span>
                    </Form.Item>

                    <Form.Item
                      colSpan={6}
                      label="工作经验"
                    >
                      <span className="next-form-preview">{dataSource.person.workTime}</span>
                    </Form.Item>

                    <Form.Item
                      colSpan={6}
                      label="教育经历"
                    >
                      <span className="next-form-preview">{dataSource.person.education}</span>
                    </Form.Item>
                  </Form>
                </Box>
              </Box>
            </ResponsiveGrid.Cell>

            <ResponsiveGrid.Cell
              colSpan={6}
              style={{ position: 'relative' }}
            >
              <Divider
                className={styles.divider}
                direction="ver"
              />

              <Form
                labelAlign="top"
                responsive
              >
                <Form.Item
                  colSpan={6}
                  label="职级"
                >
                  <span className="next-form-preview">{dataSource.person.rank}</span>
                </Form.Item>

                <Form.Item
                  colSpan={6}
                  label="职位"
                >
                  <span className="next-form-preview">{dataSource.person.position}</span>
                </Form.Item>

                <Form.Item
                  colSpan={6}
                  label="部门"
                >
                  <span className="next-form-preview">{dataSource.person.department}</span>
                </Form.Item>

                <Form.Item
                  colSpan={6}
                  label="工作地"
                >
                  <span className="next-form-preview">{dataSource.person.workAddress}</span>
                </Form.Item>

                <Form.Item
                  colSpan={6}
                  label="薪水"
                >
                  <Box
                    align="center"
                    className="next-form-preview"
                    direction="row"
                    spacing={8}
                  >
                    {dataSource.person.salary} <Tag color="green">+23.2%</Tag>
                  </Box>
                </Form.Item>
              </Form>
            </ResponsiveGrid.Cell>
          </ResponsiveGrid>
        </Card.Content>
      </Card>

      <Card free>
        <Card.Header title="基础信息" />

        <Card.Divider />

        <Card.Content>
          <Form
            labelAlign="top"
            responsive
          >
            <Form.Item
              colSpan={4}
              label="姓氏"
              required
            >
              <span className="next-form-preview">{dataSource.person.surname}</span>
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="名字"
              required
            >
              <span className="next-form-preview">{dataSource.person.name}</span>
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="国家/地区"
            >
              <span className="next-form-preview">{dataSource.person.region}</span>
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="电话号码"
              required
            >
              <span className="next-form-preview">{dataSource.person.phone}</span>
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="邮箱"
              required
            >
              <span className="next-form-preview">{dataSource.person.email}</span>
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="现居地址"
              required
            >
              <span className="next-form-preview">{dataSource.person.address}</span>
            </Form.Item>
          </Form>
        </Card.Content>
      </Card>

      <Card free>
        <Card.Header title="工作经历" />

        <Card.Divider />

        {dataSource.person.experiences.map((experience, idx) => (
          <Card.Content key={idx}>
            <Box>
              <Typography.Text className={styles.subTitle}>公司信息</Typography.Text>

              <Form
                labelAlign="top"
                responsive
              >
                <Form.Item
                  colSpan={4}
                  label="工作单位"
                  required
                >
                  <span className="next-form-preview">{experience.company}</span>
                </Form.Item>

                <Form.Item
                  colSpan={4}
                  label="职位"
                  required
                >
                  <span className="next-form-preview">{experience.position}</span>
                </Form.Item>

                <Form.Item
                  colSpan={4}
                  label="国家/地区"
                >
                  <span className="next-form-preview">{experience.region}</span>
                </Form.Item>

                <Form.Item
                  colSpan={8}
                  label="职责描述"
                  required
                >
                  <span className="next-form-preview">{experience.description}</span>
                </Form.Item>
              </Form>
            </Box>

            <Divider dashed />

            <Box>
              <Typography.Text className={styles.subTitle}>待遇信息</Typography.Text>

              <Form
                labelAlign="top"
                responsive
              >
                <Form.Item
                  colSpan={4}
                  label="月薪"
                >
                  <span className="next-form-preview">{experience.salary}</span>
                </Form.Item>

                <Form.Item
                  colSpan={4}
                  label="月数"
                >
                  <span className="next-form-preview">{experience.time}</span>
                </Form.Item>

                <Form.Item
                  colSpan={4}
                  label="国家/地区"
                >
                  <span className="next-form-preview">{experience.region}</span>
                </Form.Item>

                <Form.Item
                  colSpan={4}
                  label="Options/RSU"
                >
                  <span className="next-form-preview">{experience.rsu ? 'Yes' : 'No'}</span>
                </Form.Item>
              </Form>
            </Box>
          </Card.Content>
        ))}
      </Card>

      <div>
        <Box
          align="center"
          className={styles.flowFormFooter}
          direction="row"
          justify="center"
          spacing={8}
          style={{ left, right }}
        >
          <Button
            onClick={() => onAgree(field.getValues())}
            type="primary"
          >
            同意
          </Button>

          <Button
            onClick={onRefuse}
            type="secondary"
          >
            拒绝
          </Button>

          <Button
            onClick={onTransfer}
            type="secondary"
          >
            转移
          </Button>

          <Button
            onClick={onSignature}
            type="secondary"
          >
            加签
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default FlowForm;
