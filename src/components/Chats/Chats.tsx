import React from "react";
import { Input, Typography, Divider, List, Avatar } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import styles from "./Chats.module.scss";
import SideBar from "../SideBar/SideBar";

const { Title, Text } = Typography;

interface ChatItem {
  id: number;
  name: string;
  message: string;
  avatar?: string;
  group?: boolean;
}

const groups: ChatItem[] = [
  {
    id: 1,
    name: "After school",
    message: "Paul - Come around...",
    group: true,
  },
  {
    id: 2,
    name: "Vegan friends",
    message: "Oscar - Come around...",
    group: true,
  },
  {
    id: 3,
    name: "School Calendar",
    message: "To Mollie, Lana - Come around...",
    group: true,
  },
  {
    id: 4,
    name: "Spring party",
    message: "To Suzie, Sam, David - Come around...",
    group: true,
  },
  {
    id: 5,
    name: "Volleyball tournament",
    message: "Justine - Come around...",
    group: true,
  },
];

const chats: ChatItem[] = [
  { id: 6, name: "Ethan Smith", message: "Paul - Come around..." },
  { id: 7, name: "Ava Williams", message: "I found this amazing book..." },
  {
    id: 8,
    name: "Isabella Rais",
    message: "Did you find out about the cup...",
  },
  {
    id: 9,
    name: "Lana Steiner",
    message: "What do you think about this report?",
  },
  { id: 10, name: "Laura Coppen", message: "Hello! Check out this post..." },
  { id: 11, name: "Oscar Roe", message: "Sam Ottman - Come around..." },
  {
    id: 12,
    name: "Support",
    message: "Pedro Rivera (Tech support) - Hello!...",
  },
];

const Chats: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <SideBar />

      <div className={styles.chats}>
        <Title level={4} className={styles.title}>
          Chats
        </Title>

        <div className={styles.search}>
          <Input
            placeholder="Search here..."
            prefix={<SearchOutlined />}
            allowClear
          />
          <PlusOutlined className={styles.addIcon} />
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Text strong>Groups</Text>
            <PlusOutlined />
          </div>
          <List
            itemLayout="horizontal"
            dataSource={groups}
            renderItem={(item) => (
              <List.Item className={styles.chatItem}>
                <List.Item.Meta
                  avatar={<Avatar>{item.name[0]}</Avatar>}
                  title={item.name}
                  description={item.message}
                />
              </List.Item>
            )}
          />
        </div>

        <Divider />

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Text strong>Chat</Text>
            <PlusOutlined />
          </div>
          <List
            itemLayout="horizontal"
            dataSource={chats}
            renderItem={(item) => (
              <List.Item className={styles.chatItem}>
                <List.Item.Meta
                  avatar={<Avatar>{item.name[0]}</Avatar>}
                  title={item.name}
                  description={item.message}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Chats;
