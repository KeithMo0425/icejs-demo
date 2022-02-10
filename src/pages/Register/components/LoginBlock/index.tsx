/* eslint-disable @iceworks/best-practices/no-secret-info */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Input, Message, Form } from '@alifd/next';

import { useInterval } from './utils';
import styles from './index.module.css';

const { useState } = React;
const { Item } = Form;

export interface RegisterProps {
  email: string;
  password: string;
  rePassword: string;
  phone: string;
  code: string;
}

export default function RegisterBlock() {
  const [postData, setValue] = useState({
    email: '',
    password: '',
    rePassword: '',
    phone: '',
    code: '',
  });

  const [isRunning, checkRunning] = useState(false);
  const [second, setSecond] = useState(59);

  useInterval(
    () => {
      setSecond(second - 1);
      if (second <= 0) {
        checkRunning(false);
        setSecond(59);
      }
    },
    isRunning ? 1000 : null,
  );

  const formChange = (value: RegisterProps) => {
    setValue(value);
  };

  const sendCode = (values: RegisterProps, errors: []) => {
    if (errors) {
      return;
    }
    // get values.phone
    checkRunning(true);
  };

  const checkPass = (rule: any, values: string, callback: (errors?: string) => void) => {
    if (values && values !== postData.password) {
      return callback('密码不一致');
    }
    return callback();
  };

  const handleSubmit = (values: RegisterProps, errors: []) => {
    if (errors) {
      console.log('errors', errors);
      return;
    }
    console.log('values:', values);
    Message.success('注册成功');
  };

  return (
    <div className={styles.registerBlock}>
      <div className={styles.innerBlock}>
        <a href="#">
          <img
            alt="logo"
            className={styles.innerBlockLogo}
            src="https://img.alicdn.com/tfs/TB1KtN6mKH2gK0jSZJnXXaT1FXa-1014-200.png"
          />
        </a>

        <p className={styles.innerBlockDesc}>注册账号</p>

        <Form
          onChange={formChange}
          size="large"
          value={postData}
        >
          <Item
            format="email"
            required
            requiredMessage="必填"
          >
            <Input
              maxLength={20}
              name="email"
              placeholder="邮箱"
              size="large"
            />
          </Item>

          <Item
            required
            requiredMessage="必填"
          >
            <Input.Password
              htmlType="password"
              name="password"
              placeholder="至少六位密码，区分大小写"
              size="large"
            />
          </Item>

          <Item
            required
            requiredMessage="必填"
            requiredTrigger="onFocus"
            validator={checkPass}
          >
            <Input.Password
              htmlType="password"
              name="rePassword"
              placeholder="确认密码"
              size="large"
            />
          </Item>

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
                  <span className={styles.innerBeforeLine} />
                </span>
              }
              maxLength={20}
              name="phone"
              placeholder="手机号"
              size="large"
            />
          </Item>

          <Item
            required
            requiredMessage="必填"
          >
            <Input
              innerAfter={
                <span className={styles.innerAfterInput}>
                  <span className={styles.innerAfterLine} />

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
              size="large"
            />
          </Item>

          <Item>
            <Form.Submit
              className={styles.submitBtn}
              onClick={handleSubmit}
              type="primary"
              validate
            >
              注册账号
            </Form.Submit>
          </Item>

          <Item style={{ textAlign: 'center' }}>
            <a
              className={styles.innerBlockLink}
              href="/"
            >
              使用已有账号登录
            </a>
          </Item>
        </Form>
      </div>
    </div>
  );
}

RegisterBlock.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  value: PropTypes.object,
};

RegisterBlock.defaultProps = {
  value: {},
};
