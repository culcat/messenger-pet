import React from "react";
import { Input, Typography, Divider, List, Avatar, Flex } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import styles from "./Chats.module.scss";
import ChatDetail from "../ChatDetail/ChatDetail";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { DateSend } from "../DateSend";
import Paragraph from "antd/es/typography/Paragraph";

const { Title, Text } = Typography;

interface ChatItem {
  id: number;
  name: string;
  message: string;
  avatar?: string;
  group?: boolean;
}

const Chats: React.FC = () => {
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const chats = useSelector((state: RootState) => state.chats);

  return (
    <div className={styles.wrapper}>
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

        <Divider />

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Text strong>Chat</Text>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={chats}
            renderItem={(item) => (
              <List.Item
                className={`${styles.chatItem} ${
                  selectedId === item.id ? styles.active : ""
                }`}
                onClick={() => setSelectedId(item.id)}
              >
                <List.Item.Meta
                  avatar={<Avatar>{item.name[0]}</Avatar>}
                  title={item.name}
                  description={item.messages[item.messages.length - 1].message}
                />{" "}
              </List.Item>
            )}
          />
        </div>
      </div>

      <ChatDetail id={selectedId} />
    </div>
  );
};

export default Chats;
