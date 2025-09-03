import { ArrowLeftOutlined } from '@ant-design/icons';
import { Avatar, Button, Flex, Space } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import { FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router';

import { ChatItem } from '@/types/chat';

import styles from './ChatHeader.module.scss';

export const ChatHeader: FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 600 });
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
          <Avatar size={48}></Avatar>
          <div>
            <Title level={4} className={styles.chatTitle}></Title>
          </div>
        </Flex>
      </Content>
    </div>
  );
};
