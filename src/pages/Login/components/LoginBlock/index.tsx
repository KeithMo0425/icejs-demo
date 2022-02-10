import * as React from 'react';
import { Input, Message, Form, Divider, Checkbox, Icon } from '@alifd/next';
import { useHistory } from 'ice';

import { useInterval } from './utils';
import styles from './index.module.css';

const { Item } = Form;

export interface IDataSource {
  name: string;
  password: string;
  autoLogin: boolean;
  phone: string;
  code: string;
}

const DEFAULT_DATA: IDataSource = {
  name: '',
  // eslint-disable-next-line @iceworks/best-practices/no-secret-info
  password: '',
  autoLogin: true,
  phone: '',
  code: '',
};

interface LoginProps {
  dataSource?: IDataSource;
}
const { useState } = React;
const LoginBlock: React.FunctionComponent<LoginProps> = (props = { dataSource: DEFAULT_DATA }): JSX.Element => {
  const { dataSource = DEFAULT_DATA } = props;

  const history = useHistory();

  const [postData, setValue] = useState(dataSource);

  const [isRunning, checkRunning] = useState(false);
  const [isPhone, checkPhone] = useState(false);
  const [second, setSecond] = useState(59);

  useInterval(
    () => {
      setSecond(second - 1);
      if (second <= 0) {
        checkRunning(false);
        setSecond(59);
      }
    },
    // @ts-ignore
    isRunning ? 1000 : null,
  );

  const formChange = (values: IDataSource) => {
    setValue(values);
  };

  const sendCode = (values: IDataSource, errors: []) => {
    if (errors) {
      return;
    }
    // get values.phone
    checkRunning(true);
  };

  const handleSubmit = (values: IDataSource, errors: []) => {
    if (errors) {
      console.log('errors', errors);
      return;
    }
    console.log('values:', values);
    Message.success('登录成功');
    history.replace('/');
  };

  const phoneForm = (
    <>
      <Item
        asterisk={false}
        format="tel"
        required
        requiredMessage="必填"
      >
        <Input
          innerBefore={
            <span className={styles.innerBeforeInput}>
              +86
              <span className={styles.line} />
            </span>
          }
          maxLength={20}
          name="phone"
          placeholder="手机号"
        />
      </Item>

      <Item
        required
        requiredMessage="必填"
        style={{ marginBottom: 0 }}
      >
        <Input
          innerAfter={
            <span className={styles.innerAfterInput}>
              <span className={styles.line} />

              <Form.Submit
                className={styles.sendCode}
                disabled={!!isRunning}
                onClick={sendCode}
                style={{ width: 64 }}
                text
                type="primary"
                validate={['phone']}
              >
                {isRunning ? `${second}秒后再试` : '获取验证码'}
              </Form.Submit>
            </span>
          }
          maxLength={20}
          name="code"
          placeholder="验证码"
        />
      </Item>
    </>
  );

  const accountForm = (
    <>
      <Item
        required
        requiredMessage="必填"
      >
        <Input
          maxLength={20}
          name="name"
          placeholder="用户名"
        />
      </Item>

      <Item
        required
        requiredMessage="必填"
        style={{ marginBottom: 0 }}
      >
        <Input.Password
          htmlType="password"
          name="password"
          placeholder="密码"
        />
      </Item>
    </>
  );

  const byAccount = () => {
    checkPhone(false);
  };

  const byForm = () => {
    checkPhone(true);
  };

  return (
    <div className={styles.loginBlock}>
      <div className={styles.innerBlock}>
        <a href="#">
          <img
            alt="logo"
            className={styles.logo}
            src="https://img.alicdn.com/tfs/TB1KtN6mKH2gK0jSZJnXXaT1FXa-1014-200.png"
          />
        </a>

        <div className={styles.desc}>
          <span
            className={isPhone ? undefined : styles.active}
            onClick={byAccount}
          >
            账户密码登录
          </span>

          <Divider direction="ver" />

          <span
            className={isPhone ? styles.active : undefined}
            onClick={byForm}
          >
            手机号登录
          </span>
        </div>

        <Form
          onChange={formChange}
          size="large"
          value={postData}
        >
          {isPhone ? phoneForm : accountForm}

          <div className={styles.infoLine}>
            <Item style={{ marginBottom: 0 }}>
              <Checkbox
                className={styles.infoLeft}
                name="autoLogin"
              >
                自动登录
              </Checkbox>
            </Item>

            <div>
              <a
                className={styles.link}
                href="/"
              >
                忘记密码
              </a>
            </div>
          </div>

          <Item style={{ marginBottom: 10 }}>
            <Form.Submit
              className={styles.submitBtn}
              onClick={handleSubmit}
              type="primary"
              validate
            >
              登录
            </Form.Submit>
          </Item>

          <div className={styles.infoLine}>
            <div className={styles.infoLeft}>
              其他登录方式 <Icon
                size="small"
                type="atm"
              /> <Icon
                size="small"
                type="atm"
              />{' '}
              <Icon
                size="small"
                type="atm"
              />
            </div>

            <a
              className={styles.link}
              href="/"
            >
              注册账号
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginBlock;
