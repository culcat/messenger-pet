import ActionButton from '@assets/_Action button.svg?react';
import { Avatar, Button, Divider, Flex, Input, List, Space } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import clsx from 'clsx';
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

  const { data: conversation, isLoading, isError } = useGetConversationQuery(Number(userId));

  const [sendMessage] = useSendMessageMutation();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const isMobile = useMediaQuery({ maxWidth: 600 });

  // Скролл вниз при изменении сообщений
  const messagesArray = conversation ? messagesAdapter.getSelectors().selectAll(conversation) : [];
  useEffect(() => {
    setNewMessage('');
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [id]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    await sendMessage({ text: newMessage, receiverId: Number(userId) });
    setNewMessage('');
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (id == null || undefined) return <MessengerAbout />;
  if (isLoading) return <div>Загрузка сообщений...</div>;
  if (isError) return <div>Ошибка при загрузке сообщений</div>;

  return (
    <div key={id} className={styles.chatLayout}>
      <div className={styles.chatWrapper}>
        <ChatHeader userName={messagesArray} />
        <Divider className={styles.divider} />

        <div className={styles.messagesLayout}>
          <List
            dataSource={messagesArray}
            renderItem={(item) => {
              const isCurrentUser = item.sender.username === currentUser;

              return (
                <div
                  className={clsx(styles.messageRow, {
                    [styles.right]: isCurrentUser,
                    [styles.left]: !isCurrentUser,
                  })}
                >
                  {!isCurrentUser && <Avatar>{item.sender.username[0]}</Avatar>}

                  <div
                    className={clsx({
                      [styles.messageBubbleYou]: isCurrentUser,
                      [styles.messageBubbleOther]: !isCurrentUser,
                    })}
                  >
                    {!isCurrentUser && <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.sender.username}</div>}
                    <Paragraph style={{ margin: 0 }}>{item.text}</Paragraph>
                    <div className={styles.messageMeta}>{new Date(item.createdAt).toLocaleString()}</div>
                  </div>
                </div>
              );
            }}
          />
          <div ref={messagesEndRef} />
        </div>

        <Space.Compact className={styles.inputBlock}>
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
