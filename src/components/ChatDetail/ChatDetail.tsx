import ActionButton from '@assets/_Action button.svg?react';
import { Avatar, Button, Divider, Input, List, Space, Spin } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';

import { ChatHeader } from '@/components/ChatHeader';
import { MessengerAbout } from '@/components/MessengerAbout/MessengerAbout';
import { useGetConversationQuery, useSendMessageMutation } from '@/store/messagesApi';
import { messagesAdapter } from '@/store/messageSlice';
import { Message } from '@/types/messages';

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
  } = useGetConversationQuery(Number(userId), {
    skip: !userId, // ← Важно: пропускаем запрос если userId невалидный
    refetchOnMountOrArgChange: true,
  });

  const [dataMes, setDataMes] = useState<Message[]>([]);
  const [sendMessage] = useSendMessageMutation();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const isMobile = useMediaQuery({ maxWidth: 600 });

  const messagesArray = useMemo(() => {
    return conversation ? messagesAdapter.getSelectors().selectAll(conversation) : [];
  }, [conversation]);

  // Эффект для скролла и очистки сообщения при смене чата
  useEffect(() => {
    setNewMessage('');
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [id]);

  useEffect(() => {
    if (!messagesArray) return;
    setDataMes(messagesArray);
  }, [messagesArray]);

  const handleSend = async () => {
    if (!newMessage.trim() || !userId) return;
    await sendMessage({ text: newMessage, receiverId: userId });
    setNewMessage('');
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!id) return <MessengerAbout />;

  if (userId === null || isNaN(userId)) return <div>Неверный ID чата</div>;

  if (isLoading) return <Spin size="large" />;

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
      </div>{' '}
      <Space.Compact className={styles.inputBlock}>
        <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type here..." />
        <Button type="primary" onClick={handleSend} icon={<ActionButton />} />
      </Space.Compact>
      {/* {isMobile && <Divider className={styles.divider} />} */}
    </div>
  );
};

export default ChatDetail;
