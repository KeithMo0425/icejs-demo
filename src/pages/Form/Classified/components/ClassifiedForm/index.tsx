import * as React from 'react';
import { Box, Button, Card, Form, Input, Select, Radio, Field, Divider, Message } from '@alifd/next';

export interface DataSource {
  job: {
    address?: string;
    position?: string;
    companyName?: string;
    currency?: string;
    annualSalary?: number;
    expectAnnualSalary?: number;
  };
  treatment: {
    monthlySalary?: number;
    monthNumber?: number;
    bonus?: number;
    targetBonus?: number;
    lastYearBonus?: number;
    rsu?: boolean;
    rsuDesc?: string;
  };
}

export interface ClassifiedFormProps {
  dataSource?: DataSource;
  onSubmit?: (data: DataSource) => void;
  onCancel?: () => void;
}

const DEFAULT_DATA: DataSource = {
  job: {
    address: '美国 洛杉矶',
  },
  treatment: {
    rsu: true,
  },
};

const ClassifiedForm: React.FunctionComponent<ClassifiedFormProps> = (props: ClassifiedFormProps): JSX.Element => {
  const { dataSource = DEFAULT_DATA, onSubmit = () => {}, onCancel = () => {} } = props;

  const jobField = Field.useField({ values: dataSource.job });
  const treatmentField = Field.useField({ values: dataSource.treatment });

  const handleSubmit = async () => {
    const { errors: jobErrors } = await jobField.validatePromise();
    const { errors: treatmentErrors } = await treatmentField.validatePromise();

    if (treatmentErrors || jobErrors) {
      console.log('errors', jobErrors, treatmentErrors);
      return;
    }
    const values = {
      job: jobField.getValues(),
      treatment: treatmentField.getValues(),
    };
    console.log('values:', values);
    onSubmit(values);
    Message.success('提交成功');
  };

  return (
    <div>
      <Card free>
        <Card.Header title="工作经历" />

        <Card.Divider />

        <Card.BulletHeader title="分类信息" />

        <Card.Content>
          <Form
            field={jobField}
            fullWidth
            labelAlign="top"
            responsive
          >
            <Form.Item
              colSpan={4}
              label="工作地址"
            >
              <Input
                name="address"
                placeholder="请输入工作地址"
              />
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="职位"
            >
              <Input
                name="position"
                placeholder="请输入职位名称"
              />
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="公司名称"
            >
              <Input
                name="companyName"
                placeholder="请输入公司名称"
              />
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="币种"
              required
            >
              <Select
                name="currency"
                placeholder="请选择币种"
              >
                <Select.Option value="CNY">¥ CNY</Select.Option>

                <Select.Option value="USD">$ USD</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="年薪"
              required
            >
              <Input
                addonTextAfter="CNY"
                name="annualSalary"
                placeholder="请输入薪资信息"
              />
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="期望年薪"
            >
              <Input
                addonTextAfter="CNY"
                name="expectAnnualSalary"
                placeholder="请输入期望薪资"
              />
            </Form.Item>
          </Form>
        </Card.Content>

        <Card.BulletHeader title="分类信息" />

        <Card.Content>
          <Form
            field={treatmentField}
            fullWidth
            labelAlign="top"
            responsive
          >
            <Form.Item
              colSpan={4}
              label="月薪"
              required
            >
              <Input
                name="monthlySalary"
                placeholder="请输入月薪"
              />
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="月数"
            >
              <Input
                name="monthNumber"
                placeholder="请输入在职月数"
              />
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="津贴"
            >
              <Input
                name="bonus"
                placeholder="请输入津贴"
              />
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="年度目标奖金"
            >
              <Input
                name="targetBonus"
                placeholder="请输入年度目标奖金"
              />
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="去年实际奖金"
            >
              <Input
                name="lastYearBonus"
                placeholder="请输入实际奖金"
              />
            </Form.Item>

            <Form.Item
              colSpan={4}
              label="选项/RSU"
            >
              <Radio.Group
                aria-labelledby="rsu"
                name="rsu"
              >
                <Radio
                  id="has-rsu"
                  value
                >
                  是
                </Radio>

                <Radio
                  id="has-not-rsu"
                  value={false}
                >
                  否
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              colSpan={8}
              label="选项/RSU 描述"
            >
              <Input.TextArea
                maxLength={500}
                name="rsuDesc"
                placeholder="请输入"
                showLimitHint
              />
            </Form.Item>
          </Form>

          <Divider />

          <Form.Item colSpan={12}>
            <Box
              direction="row"
              spacing={8}
            >
              <Form.Submit
                onClick={handleSubmit}
                type="primary"
                validate
              >
                提交
              </Form.Submit>

              <Button
                onClick={onCancel}
                type="secondary"
              >
                取消
              </Button>
            </Box>
          </Form.Item>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ClassifiedForm;
