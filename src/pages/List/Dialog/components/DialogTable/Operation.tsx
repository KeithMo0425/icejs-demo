import React, { useEffect, useImperativeHandle } from 'react';
import { Select, Form, Field, Input } from '@alifd/next';

const FormItem = Form.Item;

export type ActionType = 'add' | 'edit' | 'preview';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export interface OperaitionProps {
  /**
   * 操作类型, 以此来标识是添加、编辑、还是查看
   */
  actionType: ActionType;

  /**
   * 数据源
   */
  dataSource: any;
}

export interface OperationRef {
  getValues: (callback: (vals: Record<string, unknown>) => void) => void;
}

const Operation: React.ForwardRefRenderFunction<OperationRef, OperaitionProps> = (props, ref) => {
  const { actionType } = props;
  const dataSource = props.dataSource || {};
  const field = Field.useField([]);
  useEffect(() => {
    field.reset();
    if (dataSource) {
      const newValues = {
        name: dataSource.name.last,
        email: dataSource.email,
        phone: dataSource.phone,
        gender: dataSource.gender,
      };
      field.setValues(newValues);
    }
  }, [field, dataSource]);
  useImperativeHandle<OperationRef, OperationRef>(ref, () => {
    return {
      getValues(callback: (vals: Record<string, unknown>) => void) {
        field.validate((errors, values): void => {
          if (errors) {
            return;
          }
          callback(values);
        });
      },
    };
  });

  const isPreview = actionType === 'preview';

  return (
    <Form
      field={field}
      fullWidth
      isPreview={isPreview}
      labelAlign={isPreview ? 'left' : 'top'}
      {...formItemLayout}
    >
      <FormItem
        label="姓名:"
        required={!isPreview}
        requiredMessage="必填"
      >
        <Input {...field.init('name')} />
      </FormItem>

      <FormItem
        format="email"
        label="邮箱:"
        required={!isPreview}
        requiredMessage="必填"
      >
        <Input name="email" />
      </FormItem>

      <FormItem
        format="tel"
        label="手机号:"
        required={!isPreview}
        requiredMessage="必填"
      >
        <Input name="phone" />
      </FormItem>

      <FormItem
        label="性别:"
        required={!isPreview}
        requiredMessage="必填"
      >
        <Select
          dataSource={[
            { value: 'male', label: '男' },
            { value: 'female', label: '女' },
          ]}
          name="gender"
        />
      </FormItem>
    </Form>
  );
};

export default React.forwardRef(Operation);
