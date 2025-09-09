import { MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Input, List, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { FC, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, Outlet } from 'react-router-dom';

import { useGetDialogsQuery } from '@/store/messagesApi';
import type { Dialog } from '@/types/messages';

import styles from './Chats.module.scss';

const { Title, Text } = Typography;

const Chats: FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState('');
  const [isCollapsed, setCollapsed] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 600 });

  const limit = 20;
  const page = 1;

  const { data, isLoading, isError } = useGetDialogsQuery({ limit, page }, { refetchOnMountOrArgChange: true });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading dialogs</div>;
  if (!data) return <div>No dialogs found</div>;
  console.log(data);

  const dialogsArray = data ?? [];
  const currentUser = Cookies.get('username') || '';

  const toggleCollapse = () => setCollapsed(!isCollapsed);

  return (
    <div className={styles.wrapper}>
      {(!isMobile || !selectedId) && (
        <div className={styles.chats}>
          <div className={styles.headerRow}>
            <Title level={4} className={styles.title}>
              Chats
            </Title>
          </div>

          <div className={styles.search}>
            <Input
              placeholder="Search here..."
              prefix={<SearchOutlined />}
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <PlusOutlined className={styles.addIcon} />
          </div>

          <Divider />

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <Text strong>Chat</Text>
              <Button
                type="text"
                icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleCollapse}
                className={styles.collapseButton}
              />
            </div>

            {isCollapsed && (
              <List
                itemLayout="horizontal"
                dataSource={dialogsArray}
                renderItem={(item) => {
                  const companionId = item.sender.username !== currentUser ? item.sender.id : item.receiver.id;
                  const companionName =
                    item.sender.username !== currentUser ? item.sender.username : item.receiver.username;

                  return (
                    <Link to={`/chat/${companionId}`} className={styles.chatLink}>
                      <List.Item
                        className={clsx(styles.chatItem, { [styles.active]: selectedId === companionId })}
                        onClick={() => setSelectedId(companionId)}
                      >
                        <List.Item.Meta
                          avatar={<Avatar>{companionName[0]}</Avatar>}
                          title={companionName}
                          description={item.text}
                        />
                      </List.Item>
                    </Link>
                  );
                }}
              />
            )}
          </div>
        </div>
      )}

      {(!isMobile || selectedId) && <Outlet />}
    </div>
  );
};

export default Chats;
