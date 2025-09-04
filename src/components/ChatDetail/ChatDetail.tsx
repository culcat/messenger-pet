import ActionButton from '@assets/_Action button.svg?react';
import { Avatar, Button, Divider, Input, List, Space } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import Cookies from 'js-cookie';
import { Component, FC, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';

import { ChatHeader } from '@/components/ChatHeader';
import { MessengerAbout } from '@/components/MessengerAbout/MessengerAbout';
import { useGetConversationQuery, useSendMessageMutation } from '@/store/messagesApi';
import { messagesAdapter } from '@/store/messageSlice';

import styles from './ChatDetail.module.scss';

const { TextArea } = Input;

const ChatDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id ? Number(id) : null;

  const currentUser = Cookies.get('username') || '';

  const {
    data: conversation,
    isLoading,
    isError,
  } = useGetConversationQuery(userId, {
    skip: !userId,
  });

  const [sendMessage] = useSendMessageMutation();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const isMobile = useMediaQuery({ maxWidth: 600 });

  // Скролл вниз при изменении сообщений
  const messagesArray = conversation ? messagesAdapter.getSelectors().selectAll(conversation) : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesArray]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    await sendMessage({ text: newMessage, receiverId: userId });
    setNewMessage('');
  };

  if (id == null || undefined) return <MessengerAbout />;
  if (isLoading) return <div>Загрузка сообщений...</div>;
  if (isError) return <div>Ошибка при загрузке сообщений</div>;

  return (
    <div className={styles.chatLayout}>
      <div className={styles.chatWrapper}>
        <ChatHeader />
        <Divider className={styles.divider} />

        <div className={styles.messagesLayout}>
          <List
            itemLayout="vertical"
            dataSource={messagesArray}
            renderItem={(item) => {
              const isCurrentUser = item.sender.username === currentUser;

              return (
                <List.Item className={isCurrentUser ? styles.messageRight : styles.messageLeft}>
                  {isCurrentUser ? (
                    <div className={styles.messageBubbleYou}>
                      <Title level={5}>{item.sender.username}</Title>
                      <Paragraph>{item.text}</Paragraph>
                    </div>
                  ) : (
                    <div className={styles.messageBubbleOther}>
                      <Avatar>{item.sender.username[0]}</Avatar>
                      <Title level={5}>{item.sender.username}</Title>
                      <Paragraph>{item.text}</Paragraph>
                    </div>
                  )}
                </List.Item>
              );
            }}
          />
          <div ref={messagesEndRef} />
        </div>

        <Space.Compact className={styles.inputBlock} style={{ width: '100%' }}>
          <TextArea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            rows={2}
            placeholder="Type here..."
          />
          <Button type="primary" onClick={handleSend} icon={<ActionButton />} />
        </Space.Compact>
      </div>

      {isMobile && <Divider className={styles.divider} />}
    </div>
  );
};

export default ChatDetail;
