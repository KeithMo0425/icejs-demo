import * as React from 'react';
import { Card, Form, Input, Icon, Radio, Field, Step, Button, Box, Typography } from '@alifd/next';
import styles from './index.module.css';

export interface DataSource {
  name?: string;
  category?: string;
  authority?: string;
  desc?: string;
}

export interface StepFormProps {
  dataSource?: DataSource;
  onSubmit?: (data: DataSource) => void;
}

const DEFAULT_DATA: DataSource = {
  name: '',
  category: '',
  authority: 'private',
  desc: '',
};
const { useState } = React;
const StepForm: React.FunctionComponent<StepFormProps> = (props: StepFormProps): JSX.Element => {
  const { dataSource = DEFAULT_DATA, onSubmit = (): void => {} } = props;

  const projectField = Field.useField({ values: dataSource });
  const [currentStep, setStep] = useState<number>(0);

  const steps = ['填写信息', '确认信息', '完成'].map((item, index) => (<Step.Item
    key={index}
    title={item}
  />));

  const submit = (): void => {
    const values = projectField.getValues();
    console.log('values:', values);
    onSubmit(values);

    setStep(currentStep + 1);
  };

  const goNext = async (): Promise<void> => {
    const { errors } = await projectField.validatePromise();

    if (errors) {
      console.log('errors', errors);
      return;
    }
    setStep(currentStep + 1);
  };

  const goPrev = (): void => {
    setStep(currentStep - 1);
  };

  const goInitial = (): void => {
    setStep(0);
  };

  let actions: JSX.Element;
  let mainbody: JSX.Element;
  switch (currentStep) {
    case 0:
      actions = (
        <Button
          onClick={goNext}
          type="primary"
        >
          下一步
        </Button>
      );
      break;
    case 1:
      actions = (
        <>
          <Button
            onClick={goPrev}
            style={{ marginRight: '5px' }}
          >
            上一步
          </Button>

          <Form.Submit
            onClick={submit}
            type="primary"
            validate
          >
            下一步
          </Form.Submit>
        </>
      );
      break;
    case 2:
      mainbody = (
        <Box align="center">
          <Icon
            className={styles.successIcon}
            size={72}
            type="success-filling"
          />

          <Typography.H1>提交成功</Typography.H1>

          <Typography.Text>5s 后自动跳转至工单页</Typography.Text>

          <Box
            direction="row"
            margin={20}
          >
            <Button
              onClick={goInitial}
              style={{ marginRight: '5px' }}
              type="primary"
            >
              返回主页
            </Button>

            <Button onClick={goInitial}>继续创建</Button>
          </Box>
        </Box>
      );
      break;
    default:
      break;
  }

  if (!mainbody) {
    mainbody = (
      <Form
        className={styles.form}
        field={projectField}
        fullWidth
        isPreview={currentStep === 1}
        labelAlign="top"
        responsive
      >
        <Form.Item
          colSpan={12}
          label="项目名称"
          required
          requiredMessage="必填"
        >
          <Input
            name="name"
            placeholder="给项目起个名字"
          />
        </Form.Item>

        <Form.Item
          colSpan={12}
          label="项目所属分类"
          required
        >
          <Input
            name="category"
            placeholder="请输入你的分类"
          />
        </Form.Item>

        <Form.Item
          colSpan={12}
          label="项目权限"
        >
          <Radio.Group
            aria-labelledby="authority of project"
            name="authority"
          >
            <Radio
              id="private"
              value="private"
            >
              私密项目
            </Radio>

            <Radio
              id="internal"
              value="internal"
            >
              内部项目
            </Radio>

            <Radio
              id="publish"
              value="publish"
            >
              开放目
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          colSpan={12}
          label="项目描述"
        >
          <Input.TextArea
            name="desc"
            placeholder="请输入项目详细信息"
          />
        </Form.Item>

        <Form.Item colSpan={12}>{actions}</Form.Item>
      </Form>
    );
  }

  return (
    <div>
      <Card free>
        <Card.Content className={styles.stepForm}>
          <Step
            current={currentStep}
            shape="circle"
          >
            {steps}
          </Step>

          {mainbody}
        </Card.Content>
      </Card>
    </div>
  );
};

export default StepForm;
