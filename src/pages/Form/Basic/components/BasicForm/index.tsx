import * as React from 'react';
import { Input, Form, Box, Button, Card, DatePicker, Message, Radio, Upload } from '@alifd/next';

import { UploadProps } from '@alifd/next/types/upload';
import { Moment } from 'moment';

import styles from './index.module.css';

const { useState } = React;
const FormItem = Form.Item;

const formItemLayout = {
  colSpan: 12,
};

export interface DataSource {
  name?: string;
  category?: string;
  date?: Moment[];
  type?: string;
  pic?: UploadProps[];
  desc?: string;
}

export interface BasicFormProps {
  dataSource?: DataSource;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const DEFAULT_DATA: DataSource = {
  type: 'private',
};

const DEFAULT_ON_SUBMIT = (values: BasicFormProps, errors: []): void => {
  if (errors) {
    console.log('errors', errors);
    return;
  }
  console.log('values:', values);
  Message.success('提交成功');
};

const BasicForm: React.FC<BasicFormProps> = (props: BasicFormProps): JSX.Element => {
  const { dataSource = DEFAULT_DATA, onSubmit = DEFAULT_ON_SUBMIT, onCancel = (): void => {} } = props;

  const [postData, setValue] = useState<DataSource>(dataSource);

  const formChange = (values: DataSource): void => {
    setValue(values);
  };

  return (
    <Card free>
      <Card.Content>
        <Form
          className={styles.basicForm}
          fullWidth
          labelAlign="top"
          onChange={formChange}
          responsive
          value={postData}
        >
          <FormItem
            {...formItemLayout}
            label="项目名称："
            required
            requiredMessage="必填"
          >
            <Input
              name="name"
              placeholder="请输入项目名称"
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="项目所属分类："
            required
            requiredMessage="必填"
          >
            <Input
              name="category"
              placeholder="请输入你的分类"
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="可访问日期："
            required
            requiredMessage="必填"
          >
            <DatePicker.RangePicker name="date" />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="项目权限："
          >
            <Radio.Group
              aria-labelledby="authority of project"
              name="type"
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
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="上传封面："
          >
            <Upload
              name="pic"
              shape="card"
            >
              上传图片
            </Upload>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="项目描述："
          >
            <Input.TextArea
              name="desc"
              placeholder="请输入项目详细信息"
            />
          </FormItem>

          <FormItem colSpan={12}>
            <Box
              direction="row"
              spacing={8}
            >
              <Form.Submit
                onClick={onSubmit}
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
          </FormItem>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default BasicForm;
