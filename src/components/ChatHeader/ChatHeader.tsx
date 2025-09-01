import { ArrowLeftOutlined } from '@ant-design/icons';
import { Avatar, Button, Flex, Space } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import { FC } from 'react';
import { Link } from 'react-router';

import { ChatItem } from '@/types/chat';

import styles from './ChatHeader.module.scss';

interface ChatHeaderProps {
  chat: ChatItem;
}

export const ChatHeader: FC<ChatHeaderProps> = ({ chat }) => {
  const isMobile = window.innerWidth <= 600;
  return (
    <div className={styles.headerWrapper}>
      <Content className={styles.headerContent}>
        <Flex align="center" gap="middle">
          {isMobile && (
            <Link to="/chat" reloadDocument>
              <Avatar size={40}>
                <ArrowLeftOutlined />
              </Avatar>
            </Link>
          )}
          <Avatar size={48}>{chat.name[0]}</Avatar>
          <div>
            <Title level={4} className={styles.chatTitle}>
              {chat.name}
            </Title>
          </div>
        </Flex>
      </Content>
    </div>
  );
};
