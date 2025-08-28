import React from "react";
import { Input, Typography, Divider, List, Avatar, Button } from "antd";
import { PlusOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import styles from "./Chats.module.scss";
import ChatDetail from "../ChatDetail/ChatDetail";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Paragraph from "antd/es/typography/Paragraph";
import { Folders } from "../Folders/Folders";
 

const { Title, Text } = Typography;

 

const Chats: React.FC = () => {
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const [searchText, setSearchText] = React.useState("");
  const [isCollapsed, setCollapsed] = React.useState(true);

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  }

  const chats = useSelector((state: RootState) => state.chats);

  const filteredChats = chats.filter((chat) => {
    const chatName = chat.name.toLowerCase();
    const searchTextInput = searchText.toLowerCase();
    return chatName.includes(searchTextInput);
  });

  return (
    <div className={styles.wrapper}>
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
              <Folders/>

          <div className={styles.sectionHeader}>
            <Text strong>Chat</Text>
             <Button 
          type="text" 
          icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} 
          onClick={toggleCollapse}
          className={styles.collapseButton}
        />
          </div>
          {isCollapsed &&
          <List
            itemLayout="horizontal"
            dataSource={filteredChats}
            renderItem={(item) => (
              <List.Item
                className={`${styles.chatItem} ${
                  selectedId === item.id ? styles.active : ""
                }`}
                onClick={() => setSelectedId(item.id)}
              >
                <List.Item.Meta
                  avatar={<Avatar>{item.name[0]}</Avatar>}
                  title={item.name}
                  description={item.messages[item.messages.length - 1].message}
                />
                {item.folder && (
                  <Paragraph
                    style={{
                      display: "inline-block",
                      background: "#f0f5ff",
                      color: "#3a7afe",
                      borderRadius: "12px",
                      padding: "2px 12px",
                      fontSize: "12px",
                      marginTop: "4px",
                      marginBottom: "0",
                      fontWeight: 500,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {item.folder}
                  </Paragraph>
                )}
                
              </List.Item>
            )}
          />}
        </div>
      </div>

      <ChatDetail id={selectedId} />
    </div>
  );
};

export default Chats;
