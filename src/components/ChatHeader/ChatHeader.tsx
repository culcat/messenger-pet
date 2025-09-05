import { ArrowLeftOutlined } from '@ant-design/icons';
import { Avatar, Button, Flex, Space, Spin } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import Cookies from 'js-cookie';
import { FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router';

import { Message } from '@/types/messages';

import styles from './ChatHeader.module.scss';

interface HeaderProps {
  userName: Message[];
}

export const ChatHeader: FC<HeaderProps> = ({ userName }) => {
  const currentUser = Cookies.get('username');
  const isMobile = useMediaQuery({ maxWidth: 600 });

  const dialog = userName?.[0];

  if (!dialog) {
    return (
      <div className={styles.headerWrapper}>
        <Content className={styles.headerContent}>
          <Flex align="center" justify="center" gap={16}>
            {isMobile && (
              <Link to="/chat" reloadDocument>
                <Avatar size={40}>
                  <ArrowLeftOutlined />
                </Avatar>
              </Link>
            )}
            <Spin size="large" />
          </Flex>
        </Content>
      </div>
    );
  }

  const companionName = dialog.sender.username === currentUser ? dialog.receiver.username : dialog.sender.username;

  return (
    <div className={styles.headerWrapper}>
      <Content className={styles.headerContent}>
        <Flex align="center" gap={16}>
          {isMobile && (
            <Link to="/chat" reloadDocument>
              <Avatar size={40}>
                <ArrowLeftOutlined />
              </Avatar>
            </Link>
          )}
          <Avatar size={48}>{companionName[0]}</Avatar>
          <div>
            <Title level={4} className={styles.chatTitle}>
              {companionName}
            </Title>
          </div>
        </Flex>
      </Content>
    </div>
  );
};
