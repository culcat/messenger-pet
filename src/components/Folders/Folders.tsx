import React from 'react'
import styles from './Folders.module.scss'
import { Input, Typography, Divider, List, Avatar, Button } from 'antd';
import { PlusOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Paragraph from 'antd/es/typography/Paragraph';
import FolderIcon from '@assets/Folders.svg?react'

const { Title, Text } = Typography;

export const Folders = () => {
 const [selectedId, setSelectedId] = React.useState<number | null>(null);
 const [isCollapsed, setCollapsed] = React.useState(true);
  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  }
  const folders = useSelector((state: RootState) => state.folders);
  return (
  
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Text strong>Folders</Text>
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
            dataSource={folders}
            renderItem={(item) => (
              <List.Item
                className={`${styles.chatItem} ${
                  selectedId === item.id ? styles.active : ""
                }`}
                onClick={() => setSelectedId(item.id)}
              >
                <List.Item.Meta
                  avatar={<Avatar><FolderIcon/></Avatar>}
                  title={item.name}
                />
               
                
              </List.Item>
            )}
          />}
        </div>
      

  );
};
