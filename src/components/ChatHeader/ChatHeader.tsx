import { Avatar, Button, Flex, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import { FC } from "react";

import { ChatItem } from "@/types/chat";

import styles from "./ChatHeader.module.scss";

interface ChatHeaderProps {
  chat: ChatItem;
}

export const ChatHeader: FC<ChatHeaderProps> = ({ chat }) => {
  return (
    <div className={styles.headerWrapper}>
      <Content className={styles.headerContent}>
        <Flex align="center" gap="middle">
          <Avatar size={48}>{chat.name[0]}</Avatar>
          <div>
            <Title level={4} className={styles.chatTitle}>
              {chat.name}
            </Title>
          </div>
        </Flex>
        <Flex align="center" gap="middle">
          <Space size="middle">
            <Button className={styles.profileButton} color="default" variant="solid">
              View profile
            </Button>
          </Space>
        </Flex>
      </Content>
    </div>
  );
};
