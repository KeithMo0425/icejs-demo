import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  Typography,
  Tag,
  ResponsiveGrid,
  Tab,
  Card,
  Table,
  Calendar,
  Timeline,
  List,
} from '@alifd/next';
import mock from './mock';

import styles from './index.module.css';

const { useState } = React;
const { Cell } = ResponsiveGrid;
const TimelineItem = Timeline.Item;

interface OrderItem {
  name?: string;
  state?: string;
  level?: string;
}

interface ProjectItem {
  projectId?: number;
  projectName?: string;
  projectDesc?: string;
  createTime?: string;
  img?: string;
  update?: string;
}

interface TimeLineItem {
  planName?: string;
  planAddress?: string;
  planTime?: string;
  planDuring?: string;
}

interface UpdateItem {
  projectItem?: string;
  project?: string;
  time?: string;
  name?: string;
  action?: string;
  avatar?: string;
}

interface EntranceItem {
  name?: string;
  link?: string;
}

export interface DataSource {
  orderList?: OrderItem[];
  projectList?: ProjectItem[];
  timeLineList?: TimeLineItem[];
  updateList?: UpdateItem[];
  entranceList?: EntranceItem[];
  person?: {
    avatar?: string;
    surname?: string;
    name?: string;
    email?: string;
  };
}

const DEFAULT_DATA: DataSource = {
  person: {
    avatar: 'https://img.alicdn.com/tfs/TB1XdnvvUY1gK0jSZFCXXcwqXXa-500-500.png',
    surname: '谢',
    name: '莉莉',
    email: 'xielili@aliwork-inc.com',
  },
  orderList: mock.orderList,
  projectList: mock.projectList,
  timeLineList: mock.timeLineList,
  updateList: mock.updateList,
  entranceList: mock.entrances,
};
export interface WorkTableProps {
  dataSource?: DataSource;
}

const WorkTable: React.FC<WorkTableProps> = (props: WorkTableProps): JSX.Element => {
  const { dataSource = DEFAULT_DATA } = props;

  const { person, orderList, projectList, timeLineList, updateList, entranceList } = dataSource;

  const [tab, setTab] = useState('1');

  const changeTab = (val: string) => setTab(val);

  const renderLevel = (text: string, index: number) => {
    let color;
    if (text === 'high') {
      color = 'red';
    } else if (text === 'middle') {
      color = 'yellow';
    } else {
      color = 'green';
    }
    return (
      <span key={text + index.toString()}>
        <Tag
          color={color}
          size="small"
        >
          {text}
        </Tag>
      </span>
    );
  };

  return (
    <div className={styles.workTable}>
      <div className={styles.workerContainer}>
        <Box flex={1}>
          <Box
            direction="row"
            spacing={28}
          >
            <Avatar
              className={styles.avatar}
              size={80}
              src={person.avatar}
            />

            <Box>
              <Typography.Text className={styles.titleName}>
                {person.surname}

                {person.name}
              </Typography.Text>

              <Typography.Text className={styles.titleInfo}>{person.email}</Typography.Text>
            </Box>
          </Box>

          <Tab
            activeKey={tab}
            className={styles.tab}
            onChange={changeTab}
          >
            <Tab.Item
              key="1"
              title="选项卡一"
            />

            <Tab.Item
              key="2"
              title="选项卡二"
            />

            <Tab.Item
              key="3"
              title="选项卡三"
            />
          </Tab>
        </Box>
      </div>

      <div className={styles.workTableContent}>
        <ResponsiveGrid gap={20}>
          <Cell colSpan={8}>
            <Card
              free
              style={{ height: '100%' }}
            >
              <Card.Header title="我的任务" />

              <Card.Divider />

              <Card.Content>
                <Table
                  dataSource={orderList}
                  hasBorder={false}
                  rowSelection={{
                    getProps: (record: OrderItem, index: number): any => ({
                      children: (
                        <span
                          key={index}
                          className="next-table-cell-wrapper"
                        >
                          {record.name}
                        </span>
                      ),
                    }),
                    columnProps: () => ({ width: 330 }),
                    titleAddons: () => (
                      <span
                        key="title"
                        className="next-table-cell-wrapper"
                      >
                        任务名称
                      </span>
                    ),
                  }}
                >
                  <Table.Column
                    dataIndex="state"
                    title="所属阶段"
                    width={230}
                  />

                  <Table.Column
                    cell={renderLevel}
                    dataIndex="level"
                    title="优先级"
                    width={150}
                  />
                </Table>
              </Card.Content>
            </Card>
          </Cell>

          <Cell colSpan={4}>
            <Card free>
              <Card.Header title="我的日程" />

              <Card.Divider />

              <Card.Content>
                <Box spacing={10}>
                  <Calendar shape="panel" />

                  <Typography.Text className={styles.planNumber}>
                    共 <span className={styles.strong}>{timeLineList.length}</span>
                    个日程
                  </Typography.Text>

                  <Timeline>
                    {timeLineList.map(
                      (item): JSX.Element => (
                        <TimelineItem
                          key={item.planTime}
                          content={item.planAddress}
                          timeLeft={
                            <>
                              <span className={styles.planTime}>{item.planTime}</span>

                              <br />

                              <span className={styles.planDuring}>{item.planDuring}</span>
                            </>
                          }
                          title={item.planName}
                        />
                      ),
                    )}
                  </Timeline>
                </Box>
              </Card.Content>
            </Card>
          </Cell>

          <Cell colSpan={8}>
            <Card free>
              <Card.Header title="近期项目" />

              <Card.Divider />

              <Card.Content>
                <List>
                  {projectList.map((project) => {
                    return (
                      <List.Item
                        key={project.projectName}
                        media={<Avatar src={project.img} />}
                        title={project.projectName}
                      >
                        {project.projectDesc}
                      </List.Item>
                    );
                  })}

                  <List.Item>查看全部任务</List.Item>
                </List>
              </Card.Content>
            </Card>
          </Cell>

          <Cell colSpan={4}>
            <Card
              free
              style={{ height: '100%' }}
            >
              <Card.Header title="我的项目" />

              <Card.Divider />

              <Card.Content>
                <List>
                  <List.Item
                    media={<Avatar src="https://img.alicdn.com/tfs/TB1SFZAvQL0gK0jSZFAXXcA9pXa-200-200.png" />}
                    title="Fusion Design"
                  />

                  <List.Item
                    media={<Avatar src="https://img.alicdn.com/tfs/TB1QwMzvHr1gK0jSZR0XXbP8XXa-200-200.png" />}
                    title="Alibaba ICS"
                  />

                  <List.Item
                    media={<Avatar src="https://img.alicdn.com/tfs/TB1qxgDvG61gK0jSZFlXXXDKFXa-200-200.png" />}
                    title="Retcode 前端监控"
                  />

                  <List.Item
                    media={<Avatar src="https://img.alicdn.com/tfs/TB1TfwDvQT2gK0jSZFkXXcIQFXa-200-200.png" />}
                    title="新零售事业部"
                  />

                  <List.Item
                    media={<Avatar src="https://img.alicdn.com/tfs/TB1GgMzvHr1gK0jSZR0XXbP8XXa-200-200.png" />}
                    title="前端物料中心"
                  />

                  <List.Item
                    media={<Avatar src="https://img.alicdn.com/tfs/TB1tHozvQP2gK0jSZPxXXacQpXa-200-200.png" />}
                    title="大财鲸"
                  />
                </List>
              </Card.Content>
            </Card>
          </Cell>

          <Cell colSpan={8}>
            <Card free>
              <Card.Header title="动态" />

              <Card.Divider />

              <Card.Content>
                <List>
                  {updateList.map((one, idx) => {
                    let title;
                    switch (one.action) {
                      case 'create':
                        title = (
                          <div key={idx}>
                            {one.name} 在<a href="/">{one.project}</a> 新建项目 <a href="/">{one.projectItem}</a>{' '}
                          </div>
                        );
                        break;
                      case 'release':
                        title = (
                          <div key={idx}>
                            {one.name} 将<a href="/">{one.project}</a> 更新至发布状态{' '}
                          </div>
                        );
                        break;
                      case 'note':
                        title = (
                          <div key={idx}>
                            {one.name} 在<a href="/">{one.project}</a> 发布了 <a href="/">{one.projectItem}</a>{' '}
                          </div>
                        );
                        break;
                      default:
                        break;
                    }

                    return (
                      <List.Item
                        key={idx}
                        media={<Avatar src={one.avatar} />}
                        title={title}
                      >
                        {one.time}
                      </List.Item>
                    );
                  })}
                </List>
              </Card.Content>
            </Card>
          </Cell>

          <Cell colSpan={4}>
            <Card free>
              <Card.Header
                extra={
                  <Button
                    component="a"
                    href="#/"
                    size="large"
                    text
                    type="primary"
                  >
                    设置
                  </Button>
                }
                title="快捷入口"
              />

              <Card.Divider />

              <Card.Content>
                <Box
                  direction="row"
                  spacing={[20, 50]}
                  wrap
                >
                  {entranceList.map((item, idx) => {
                    return (
                      <Button
                        key={idx}
                        component="a"
                        href={item.link}
                        size="large"
                        text
                      >
                        {item.name}
                      </Button>
                    );
                  })}
                </Box>
              </Card.Content>
            </Card>
          </Cell>
        </ResponsiveGrid>
      </div>
    </div>
  );
};

export default WorkTable;
