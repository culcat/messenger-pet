import ActionButton from '@assets/_Action button.svg?react';
import { Avatar, Button, Flex, Input, List, Space } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { DateSend } from '@/components/DateSend/DateSend';
import { MessengerAbout } from '@/components/MessengerAbout/MessengerAbout';

import { RootState } from '../../store';
import { ChatHeader } from '../ChatHeader';
import styles from './ChatDetail.module.scss';

interface ChatDetailProps {
  id: number | null;
}

const ChatDetail: FC<ChatDetailProps> = ({ id }) => {
  const chats = useSelector((state: RootState) => state.chats);
  const chat = chats.find((c) => c.id === id);

  const scrollToRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView({});
    }
  }, [chat?.messages]);

  return (
    <div className={styles.chatLayout}>
      {id === null && <MessengerAbout />}
      {id !== null && chat && (
        <div className={styles.chatWrapper}>
          <ChatHeader chat={chat} />
          <div className={styles.messagesLayout}>
            <List
              itemLayout="vertical"
              dataSource={chat.messages}
              renderItem={(item) => (
                <List.Item className={styles.listItem}>
                  {item.sender === 'You' ? (
                    <Flex gap="middle" justify="flex-end" align="flex-start" className={styles.messageRight}>
                      <Flex vertical>
                        <Flex align="baseline" gap="middle">
                          <Title level={5}>{item.sender}</Title>
                          <Paragraph>
                            <DateSend dateSend={item.time} />
                          </Paragraph>
                        </Flex>
                        <Paragraph className={styles.messageBubbleYou}>{item.message}</Paragraph>
                      </Flex>
                    </Flex>
                  ) : (
                    <Flex align="baseline" gap="middle" className={styles.messageLeft}>
                      <Avatar className={styles.avatar}>{item.sender[0]}</Avatar>
                      <Flex vertical>
                        <Flex align="baseline" gap="middle">
                          <Title level={5}>{item.sender}</Title>
                          <Paragraph>
                            <DateSend dateSend={item.time} />
                          </Paragraph>
                        </Flex>
                        <Paragraph className={styles.messageBubbleOther}>{item.message}</Paragraph>
                      </Flex>
                    </Flex>
                  )}
                </List.Item>
              )}
            />
            <div ref={scrollToRef}></div>
          </div>

          <Space.Compact className={styles.inputBlock}>
            <Input placeholder="Type here..." />
            <Button variant="text" icon={<ActionButton />} />
          </Space.Compact>
        </div>
      )}
    </div>
  );
};

export default ChatDetail;
