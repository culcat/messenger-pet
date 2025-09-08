import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Divider, Input, List } from 'antd';
import Title from 'antd/es/typography/Title';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, Outlet } from 'react-router-dom';

import { useGetContactsQuery } from '@/store/contactApi';

import styles from './Contacts.module.scss';
export const Contacts = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const currentUser = Cookies.get('username');
  const { data: contacts } = useGetContactsQuery(String(currentUser));

  return (
    <div className={styles.wrapper}>
      <div className={styles.contacts}>
        <Title level={4} className={styles.title}>
          Contacts
        </Title>

        <div className={styles.search}>
          <Input placeholder="Search here..." prefix={<SearchOutlined />} allowClear />
          <PlusOutlined className={styles.addIcon} />
        </div>

        <Divider />

        <div className={styles.section}>
          <List
            itemLayout="horizontal"
            dataSource={contacts}
            renderItem={(item) => (
              <Link to={`/chat/${item.id}`}>
                <List.Item className={`${styles.contactsItem} ${selectedId === item.id ? styles.active : ''}`}>
                  <List.Item.Meta avatar={<Avatar>{item.username[0]}</Avatar>} title={item.username} />
                </List.Item>
              </Link>
            )}
          />
        </div>
      </div>
      {/* {(!isMobile && <Outlet />) || (isMobile && selectedId && <Outlet />)} */}
    </div>
  );
};
