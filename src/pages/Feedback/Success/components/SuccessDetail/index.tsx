import * as React from 'react';
import { Button, Message, Card } from '@alifd/next';
import { useInterval } from './utils';
import styles from './index.module.css';

interface DetailProcessFunc {
  (): any;
}

export interface SuccessDetailProps {
  statusCode: string;
  description: string;
  image: string;
  buttonBackDesc: string;
  buttonContinueDesc: string;
  countDownSeconds: number;
  onButtonBack: DetailProcessFunc;
  onButtonContinue: DetailProcessFunc;
}
const { useState } = React;
export default function SuccessDetail(props: SuccessDetailProps) {
  const {
    statusCode = '提交成功',
    description = 's 后自动跳转至工单页',
    image = 'https://img.alicdn.com/tfs/TB1UOSVoqL7gK0jSZFBXXXZZpXa-73-72.png',
    buttonBackDesc = '返回列表',
    buttonContinueDesc = '继续创建',
    countDownSeconds: countDownSecnods = 5,
    onButtonBack = null,
    onButtonContinue = null,
  } = props;

  const [second, setSecond] = useState(countDownSecnods);

  const gobackHandle = () => {
    if (onButtonBack) {
      onButtonBack();
    } else {
      Message.notice('返回列表函数响应');
    }
  };

  useInterval(
    () => {
      setSecond(second - 1);
      if (second <= 0) {
        gobackHandle();
      }
    },
    second >= 0 ? 1000 : null,
  );

  const goContinueHandle = () => {
    if (onButtonContinue) {
      onButtonContinue();
    } else {
      Message.notice('继续创建函数响应');
    }
  };

  return (
    <Card
      className={styles.successDetail}
      free
    >
      <div>
        <img
          alt="img"
          className={styles.exceptionImage}
          src={image}
        />

        <h1 className={styles.statusCode}>{statusCode}</h1>

        <div className={styles.description}>{`${second > 0 ? second : 0}${description}`}</div>

        <div className={styles.operationWrap}>
          <Button
            className={styles.mainAction}
            onClick={gobackHandle}
            type="primary"
          >
            {buttonBackDesc}
          </Button>

          <Button onClick={goContinueHandle}>{buttonContinueDesc}</Button>
        </div>
      </div>
    </Card>
  );
}
