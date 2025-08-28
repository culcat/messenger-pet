import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import FolderIcon from '@assets/Folders.svg?react'
import { Avatar, Button, List, Typography } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { FolderDetail } from '../FolderDetail';
import styles from './Folders.module.scss'

const {  Text } = Typography;

export const Folders = () => {
 const [selectedName, setSelectedName] = useState<string | null>(null);
 const [isCollapsed, setCollapsed] = useState(true);
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
                  selectedName === item.name ? styles.active : ""
                }`}
                onClick={() => setSelectedName(item.name)}
              >
                <List.Item.Meta
                  avatar={<Avatar><FolderIcon/></Avatar>}
                  title={item.name}
                />
               
                
              </List.Item>
            )}
          />}
          <FolderDetail FolderName={selectedName} />
        </div>
      

  );
};
