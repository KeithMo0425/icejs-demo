import * as React from 'react';
import { Form, Card, Input, Message, Button, List, Divider } from '@alifd/next';
import store from '@/pages/Solution/store';

interface IDataSource {
  title: string;
  description: string;
}

interface IFromValue {
  dataSource?: IDataSource;
  title: string;
  description: string;
  onSubmit?: () => void;
  onCancel?: () => void;
}
const formItemLayout = {
  colSpan: 6,
};

const FormItem = Form.Item;
function Tasks() {
  const [taskList, taskDispatchers] = store.useModel('tasks');

  console.log(taskList, taskDispatchers);
  const handleSubmit = (values: IFromValue): void => {
    taskDispatchers.addTask(values);
    Message.success('提交成功');
  };

  const handleRemoveTask = (index: number) => {
    taskDispatchers.removeTask(index);
  };

  return (
    <Card free>
      <Card.Header title="状态管理 - 页面状态" />

      <Card.Content>
        <Form
          labelAlign="top"
          responsive
        >
          <FormItem
            {...formItemLayout}
            label="任务名称："
            required
            requiredMessage="必填"
          >
            <Input
              name="title"
              placeholder="请输入任务名称"
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="任务描述："
            required
            requiredMessage="必填"
          >
            <Input
              name="description"
              placeholder="请输入任务名称"
            />
          </FormItem>

          <FormItem colSpan={12}>
            <Form.Submit
              onClick={handleSubmit}
              type="primary"
              validate
            >
              添加任务
            </Form.Submit>
          </FormItem>
        </Form>

        <Divider />

        {taskList.length ? (
          <List>
            {taskList.map(({ title, description }, index) => (
              <List.Item
                key={index}
                extra={
                  <Button
                    onClick={() => handleRemoveTask(index)}
                    text
                    type="primary"
                  >
                    删除任务
                  </Button>
                }
                title={title}
              >
                <p>{description}</p>
              </List.Item>
            ))}
          </List>
        ) : (
          <p>暂无任务</p>
        )}
      </Card.Content>
    </Card>
  );
}

export default Tasks;
