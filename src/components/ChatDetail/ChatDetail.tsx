import ActionButton from '@assets/_Action button.svg?react';
import { Avatar, Button, Divider, Input, Space, Spin } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { FC, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import { Virtuoso } from 'react-virtuoso';

import { MessengerAbout } from '@/components/MessengerAbout/MessengerAbout';
import { useGetConversationRestQuery, useSendMessageMutation } from '@/store/messagesApi';
import { Message } from '@/types/messages';

import styles from './ChatDetail.module.scss';

const ChatDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id ? Number(id) : null;
  const currentUser = Cookies.get('username');

  const [page, setPage] = useState(1);
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [newMessage, setNewMessage] = useState('');

  const limit = 20;
  const isMobile = useMediaQuery({ maxWidth: 600 });

  const {
    data: conversationData,
    isLoading,
    isFetching,
    isError,
  } = useGetConversationRestQuery(
    { userId: Number(userId), limit, page },
    { skip: !userId, refetchOnMountOrArgChange: true },
  );

  const [sendMessage] = useSendMessageMutation();

  useEffect(() => {
    if (!conversationData) return;

    setAllMessages(conversationData.messages); // просто берем из кеша
    setHasMore(page < conversationData.pagination.totalPages);
  }, [conversationData]);

  useEffect(() => {
    setPage(1);
    setAllMessages([]);
    setNewMessage('');
  }, [id]);

  const handleSend = async () => {
    if (!newMessage.trim() || !userId) return;

    await sendMessage({ text: newMessage, receiverId: userId });
    setNewMessage('');
  };

  const loadMore = () => {
    if (!isFetching && hasMore) setPage((prev) => prev + 1);
  };

  if (!id) return <MessengerAbout />;
  if (userId === null || isNaN(userId)) return <div>Неверный ID чата</div>;
  if (isLoading && page === 1) return <Spin size="large" />;
  if (isError) return <div>Ошибка при загрузке сообщений</div>;

  return (
    <div key={id} className={styles.chatLayout}>
      <div className={styles.chatWrapper}>
        <Divider className={styles.divider} />

        <div className={styles.messagesLayout}>
          {isFetching && page > 1 && (
            <div className={styles.loadingIndicator}>
              <Spin size="small" />
            </div>
          )}
          <Virtuoso
            style={{ height: '100%' }}
            data={allMessages}
            firstItemIndex={0}
            initialTopMostItemIndex={allMessages.length - 1}
            startReached={loadMore}
            itemContent={(index, item) => {
              const isCurrentUser = item.sender.username === currentUser;
              return (
                <div
                  className={clsx(styles.messageRow, { [styles.right]: isCurrentUser, [styles.left]: !isCurrentUser })}
                >
                  {!isCurrentUser && <Avatar>{item.sender.username[0]}</Avatar>}
                  <div
                    className={clsx(styles.messageBubble, {
                      [styles.you]: isCurrentUser,
                      [styles.other]: !isCurrentUser,
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
        </div>
      </div>

      <Space.Compact className={styles.inputBlock}>
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type here..."
          onPressEnter={handleSend}
        />
        <Button type="primary" onClick={handleSend} icon={<ActionButton />} />
      </Space.Compact>
    </div>
  );
};

export default ChatDetail;
