import { MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Input, List, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link, Outlet, useLocation } from 'react-router';

import { RootState } from '../../store';
import { Folders } from '../Folders/Folders';
import styles from './Chats.module.scss';

const { Title, Text } = Typography;

const Chats: FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isCollapsed, setCollapsed] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const location = useLocation();
  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  const chats = useSelector((state: RootState) => state.chats);

  // Проверяем, открыт ли детальный просмотр чата
  const isChatDetailOpen = location.pathname.includes('/chat/');

  const filteredChats = chats.filter((chat) => {
    const chatName = chat.name.toLowerCase();
    const searchTextInput = searchText.toLowerCase();
    const matchesSearch = chatName.includes(searchTextInput);
    const matchesFolder = selectedFolder ? chat.folder === selectedFolder : true;
    return matchesSearch && matchesFolder;
  });

  return (
    <div className={styles.wrapper}>
      {/* Показываем список чатов только если:
          - не мобильное устройство ИЛИ
          - мобильное устройство, но детальный просмотр не открыт */}
      {(!isMobile || !isChatDetailOpen) && (
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
                dataSource={filteredChats}
                renderItem={(item) => (
                  <Link to={`/chat/${item.id}`} className={styles.chatLink}>
                    <List.Item
                      className={`${styles.chatItem} ${location.pathname === `/chat/${item.id}` ? styles.active : ''}`}
                    >
                      <List.Item.Meta
                        avatar={<Avatar>{item.name[0]}</Avatar>}
                        title={item.name}
                        description={item.messages[item.messages.length - 1].message}
                      />
                      {item.folder && <Paragraph className={styles.folderLabel}>{item.folder}</Paragraph>}
                    </List.Item>
                  </Link>
                )}
              />
            )}
          </div>
        </div>
      )}

      {/* Всегда рендерим Outlet для отображения деталей чата */}
      <Outlet />
    </div>
  );
};

export default Chats;
