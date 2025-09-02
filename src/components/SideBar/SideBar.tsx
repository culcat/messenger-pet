import ChatBot from '@assets/Chat-bot.svg?react';
import Logo from '@assets/Logo.svg?react';
import Setting from '@assets/Settings.svg?react';
import Star from '@assets/Star.svg?react';
import UserMultiple from '@assets/User--multiple.svg?react';
import Settings from '@components/Settings/Settings';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import Chats from '../Chats/Chats';
import { Contacts } from '../Contacts';
import styles from './SideBar.module.scss';

const { Sider } = Layout;

const SideBar: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('chats');

  const isMobile = useMediaQuery({ maxWidth: 600 });

  const widhtIcon = 26;
  const heightIcon = 30;
  const topMenu = [
    {
      key: 'logo',
      icon: <Logo style={{ marginLeft: '10px' }} width={widhtIcon} height={heightIcon} />,
      disabled: true,
    },
    {
      key: 'chats',
      icon: <ChatBot style={{ marginLeft: '10px' }} width={widhtIcon} height={heightIcon} />,
    },
    {
      key: 'contacts',
      icon: <UserMultiple style={{ marginLeft: '10px' }} width={widhtIcon} height={heightIcon} />,
    },
  ];

  const bottomMenu = [
    {
      key: 'settings',
      icon: <Setting style={{ marginLeft: '10px' }} width={widhtIcon} height={heightIcon} />,
    },
    {
      key: 'stars',
      icon: <Star style={{ marginLeft: '10px' }} width={widhtIcon} height={heightIcon} />,
    },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case 'chats':
        return <Chats />;
      case 'contacts':
        return <Contacts />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };
  if (isMobile) {
    return (
      <div className={styles.mobileWrapper}>
        <div className={styles.mobileContent}>{renderContent()}</div>
        <nav className={styles.mobileNav}>
          {topMenu.concat(bottomMenu).map((item) => (
            <button
              key={item.key}
              className={`${styles.mobileNavBtn} ${selectedKey === item.key ? styles.active : ''}`}
              onClick={() => !item.disabled && setSelectedKey(item.key)}
              disabled={item.disabled}
            >
              {item.icon}
            </button>
          ))}
        </nav>
      </div>
    );
  }

  return (
    <Layout style={{ height: '100%' }}>
      <Sider className={styles.sider} collapsed={false}>
        <div className={styles.menuBlock}>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={(e) => setSelectedKey(e.key)}
            className={styles.menu}
            items={topMenu.map((item) => ({
              key: item.key,
              icon: item.icon,
              disabled: item.disabled,
            }))}
          />

          <div className={styles.divider} />

          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={(e) => setSelectedKey(e.key)}
            className={styles.menu}
            items={bottomMenu.map((item) => ({
              key: item.key,
              icon: item.icon,
            }))}
          />
        </div>
      </Sider>
      <Layout>
        <div className={styles.content}>{renderContent()}</div>
      </Layout>
    </Layout>
  );
};

export default SideBar;
