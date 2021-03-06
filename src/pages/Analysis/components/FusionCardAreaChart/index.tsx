import * as React from 'react';
import { Card } from '@alifd/next';
import { Chart, Geom } from 'bizcharts';
import mock from './mock.js';

import styles from './index.module.css';

interface ChartItem {
  date?: string | number;
  value?: number;
}

interface FusionCardAreaChartProps {
  title?: string | React.ReactDOM;
  subTitle?: string | React.ReactDOM;
  value?: string;
  chartData?: ChartItem[];
  des?: string;
  rate?: string;
  chartHeight?: number;
}

const DEFAULT_DATA: FusionCardAreaChartProps = {
  title: '',
  subTitle: '访问量',
  value: mock.value,
  chartData: mock.saleList,
  des: '周同比:',
  rate: '12.0',
  chartHeight: 100,
};

const FusionCardAreaChart: React.FunctionComponent<FusionCardAreaChartProps> = (props = DEFAULT_DATA): JSX.Element => {
  const { title, subTitle, value, chartData, des, rate, chartHeight } = { ...DEFAULT_DATA, ...props };

  return (
    <Card
      className={styles.areaChart}
      free
    >
      {title ? (
        <>
          <Card.Header title={title} />

          <Card.Divider />
        </>
      ) : null}

      <Card.Content>
        <div className={styles.cardSubTitle}>{subTitle}</div>

        <div className={styles.cardValue}>{value}</div>

        <div className={styles.cardDes}>
          {des}

          <span>{rate}↑</span>
        </div>

        <Chart
          data={chartData}
          forceFit
          height={chartHeight}
          padding={['auto', '0']}
          scale={{
            date: {
              range: [0, 1],
            },
          }}
          width={10}
        >
          <Geom
            color="#00D6CB"
            opacity={1}
            position="date*value"
            shape="smooth"
            type="line"
          />

          <Geom
            color="#00D6CB"
            opacity={0.1}
            position="date*value"
            shape="smooth"
            type="area"
          />
        </Chart>
      </Card.Content>
    </Card>
  );
};

export default FusionCardAreaChart;
