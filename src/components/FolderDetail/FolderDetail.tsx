import { Avatar, Layout, List } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/store'

import styles from './FolderDetail.module.scss'

interface Props {
  FolderName: string | null
}

export const FolderDetail: FC<Props> = (FolderName) => {
  const chats = useSelector((state: RootState) => state.chats);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const filtredChats = chats.filter((chat) => chat.folder === FolderName.FolderName)
  
  
  return (
    <>
    <Layout>
           <List
            itemLayout="horizontal"
            dataSource={filtredChats}
            renderItem={(item) => (
              <List.Item
                className={`${styles.chatItem} ${
                  selectedId === item.id ? styles.active : ""
                }`}
                onClick={() => setSelectedId(item.id)}
              >
                <List.Item.Meta
                  avatar={<Avatar>{item.name.charAt(0)}</Avatar>}
                  title={item.name}
                />
                {item.folder && (
                  <Paragraph className={styles.folderLabel}>
                    {item.folder}
                  </Paragraph>
                )}
                
              </List.Item>
            )}
          />
    </Layout>

    </>
  )
}
