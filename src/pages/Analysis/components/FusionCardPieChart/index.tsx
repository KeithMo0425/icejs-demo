import * as React from 'react';
import { Radio, Card, Box } from '@alifd/next';
import { Chart, Geom, Coord, Axis, Legend, Guide } from 'bizcharts';

import styles from './index.module.css';

const { useState } = React;
const { Html } = Guide;

interface ChartItem {
  type?: string;
  value?: number;
  title?: string;
}

interface CardConfig {
  title?: string;
  value?: number;
  chartData?: ChartItem[];
  chartHeight?: number;
}

const DEFAULT_DATA: CardConfig = {
  title: '销售额类别占比',
  value: 183112,
  chartData: [
    {
      type: '类别一事例一',
      value: 40,
      title: '类别一事例一 | 40.00%     ¥4,544',
    },
    {
      type: '类别一事例二',
      value: 21,
      title: '类别一事例二 | 22.12%     ¥2,344',
    },
    {
      type: '类别一事例三',
      value: 17,
      title: '类别一事例三 | 16.59%     ¥3,512',
    },
    {
      type: '类别一事例四',
      value: 13,
      title: '类别一事例四 | 13.11%     ¥2,341',
    },
    {
      type: '类别一事例五',
      value: 9,
      title: '类别一事例五 |  9.29%     ¥1,231',
    },
  ],
  chartHeight: 500,
};

export interface FusionCardLineChartProps {
  cardConfig?: CardConfig;
}

const FusionCardLineChart: React.FunctionComponent<FusionCardLineChartProps> = (
  props: FusionCardLineChartProps,
): JSX.Element => {
  const { cardConfig = DEFAULT_DATA } = props;

  const { title, value, chartData, chartHeight } = cardConfig;

  const [type, setType] = useState('one');
  const changeType = (key: string) => setType(key);

  return (
    <Card free>
      <Card.Header title={title} />

      <Card.Divider />

      <Card.Content>
        <Box align="center">
          <Radio.Group
            className={styles.radioGroup}
            onChange={changeType}
            shape="button"
            value={type}
          >
            <Radio
              className={styles.radioFlex}
              value="one"
            >
              类目一
            </Radio>

            <Radio
              className={styles.radioFlex}
              value="two"
            >
              类目二
            </Radio>

            <Radio
              className={styles.radioFlex}
              value="three"
            >
              类目三
            </Radio>
          </Radio.Group>
        </Box>

        <Chart
          data={chartData}
          forceFit
          height={chartHeight}
          padding={['auto', 'auto']}
          width={10}
        >
          <Coord
            innerRadius={0.6}
            radius={0.75}
            type="theta"
          />

          <Axis name="percent" />

          <Legend
            itemMarginBottom={24}
            layout="vertical"
            offsetY={-30}
            position="bottom"
            textStyle={{
              fill: '#666',
              fontSize: 14,
            }}
          />

          <Guide>
            <Html
              alignX="middle"
              // eslint-disable-next-line max-len
              alignY="middle"
              html={`<div style='color:#333;font-size:16px;text-align: center;width: 113px;'>销售额<br><span style='color:#333;font-family: Roboto-Bold;font-size:24px'>¥ ${value}</span></div>`}
              position={['50%', '50%']}
            />
          </Guide>

          <Geom
            color="title"
            position="value"
            style={{
              lineWidth: 1,
              stroke: '#fff',
            }}
            type="intervalStack"
          />
        </Chart>
      </Card.Content>
    </Card>
  );
};

export default FusionCardLineChart;
