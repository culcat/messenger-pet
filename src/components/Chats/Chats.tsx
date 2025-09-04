import { MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Input, List, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Cookies from 'js-cookie';
import { FC, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { useGetDialogsQuery } from '@/store/messagesApi';
import type { Dialog } from '@/types/messages';

import { Folders } from '../Folders/Folders';
import styles from './Chats.module.scss';

const { Title, Text } = Typography;

const Chats: FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isCollapsed, setCollapsed] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const { data: dialogs, isLoading, isError } = useGetDialogsQuery();
  const dialogsArray = dialogs ? dialogs.ids.map((id) => dialogs.entities[id]!) : [];
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!dialogs) return <div>Not Found</div>;
  const currentUser = Cookies.get('username');

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

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
            <Folders selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} />

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
                renderItem={(item) => (
                  <Link
                    to={`/chat/${item.sender.username !== currentUser ? item.sender.id : item.receiver.id}`}
                    className={styles.chatLink}
                  >
                    <List.Item
                      className={`${styles.chatItem} ${selectedId === item.id ? styles.active : ''}`}
                      onClick={() => setSelectedId(item.sender.id)}
                    >
                      <List.Item.Meta
                        avatar={<Avatar>{item.sender.username[0]}</Avatar>}
                        title={item.sender.username !== currentUser ? item.sender.username : item.receiver.username}
                        description={item.text}
                      />
                      {/* {item.folder && <Paragraph className={styles.folderLabel}>{item.folder}</Paragraph>} */}
                    </List.Item>
                  </Link>
                )}
              />
            )}
          </div>
        </div>
      )}
      {(!isMobile && <Outlet />) || (isMobile && selectedId && <Outlet />)}
    </div>
  );
};

export default Chats;
