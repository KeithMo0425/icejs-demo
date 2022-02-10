import * as React from 'react';
import { Box, ResponsiveGrid, Divider, Card, Avatar, Upload, Button, Form, Input, Message } from '@alifd/next';
import { UploadProps } from '@alifd/next/types/upload';
import styles from './index.module.css';

const { useState } = React;
const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;

export interface DataSource {
  name?: string;
  phone?: string;
  vcode?: string;
  pic?: UploadProps[];
}

export interface SettingPersonProps {
  dataSource?: DataSource;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const DEFAULT_DATA: DataSource = {
  name: '阿里-Amy',
};

const DEFAULT_ON_SUBMIT = (values: SettingPersonProps, errors: []): void => {
  if (errors) {
    console.log('errors', errors);
    return;
  }
  console.log('values:', values);
  Message.success('更新成功');
};

const SettingPersonBlock: React.FC<SettingPersonProps> = (props: SettingPersonProps): JSX.Element => {
  const { dataSource = DEFAULT_DATA, onSubmit = DEFAULT_ON_SUBMIT } = props;

  const [postData, setValue] = useState<DataSource>(dataSource);
  const [buttonText, setButtonText] = useState('发送验证码');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const formChange = (values: DataSource): void => {
    setValue(values);
  };

  let countDownTimer: NodeJS.Timeout;
  let countDown = 60;

  // 获取验证码按钮点击示例
  const onValidateCodeButtonClicked = (): void => {
    setButtonDisabled(true);
    countDown = 60;
    setButtonText(`${countDown}s`);

    countDownTimer = setInterval(() => {
      if (--countDown <= 0) {
        if (countDownTimer) clearInterval(countDownTimer);
        setButtonText('获取验证码');
        setButtonDisabled(false);
        return;
      }

      setButtonText(`${countDown}s`);
    }, 1000);
  };

  return (
    <Card free>
      <Card.Content className={styles.settingPersonBlock}>
        <Form
          labelAlign="top"
          onChange={formChange}
          responsive
          value={postData}
        >
          <FormItem
            colSpan={12}
            label=""
          >
            <ResponsiveGrid gap={10}>
              <Cell colSpan={2}>
                <Avatar
                  icon="account"
                  shape="circle"
                  size={64}
                />
              </Cell>

              <Cell
                className={styles.changeLogo}
                colSpan={10}
              >
                <Box spacing={12}>
                  <FormItem>
                    <Upload name="pic">
                      <Button
                        className={styles.uploadButton}
                        type="normal"
                      >
                        更新头像
                      </Button>
                    </Upload>
                  </FormItem>

                  <Box>
                    <p>* 头像尽量上传超过 80px*80px, 但不要太大了。</p>

                    <p>* 请上传两倍图保证清晰度</p>
                  </Box>
                </Box>
              </Cell>
            </ResponsiveGrid>
          </FormItem>

          <FormItem colSpan={12}>
            <Divider />
          </FormItem>

          <FormItem
            colSpan={12}
            label="昵称"
            required
            requiredMessage="必填"
          >
            <Input
              name="name"
              placeholder="请输入昵称"
            />
          </FormItem>

          <FormItem
            colSpan={12}
            label="手机："
          >
            <ResponsiveGrid
              device="desktop"
              gap={10}
            >
              <Cell colSpan={8}>
                <Input
                  className={styles.validateCodeInput}
                  name="phone"
                  placeholder="请输入手机"
                />
              </Cell>

              <Cell colSpan={4}>
                <Button
                  className={styles.validateCodeButton}
                  disabled={buttonDisabled}
                  onClick={onValidateCodeButtonClicked}
                  type="secondary"
                >
                  {buttonText}
                </Button>
              </Cell>
            </ResponsiveGrid>
          </FormItem>

          <FormItem
            colSpan={12}
            label="验证码"
          >
            <Input
              name="vcode"
              placeholder="请输入验证码"
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
                更新信息
              </Form.Submit>
            </Box>
          </FormItem>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default SettingPersonBlock;
