import ChatBot from '@assets/Chat-bot.svg?react';
import Logo from '@assets/Logo.svg?react';
import Setting from '@assets/Settings.svg?react';
import UserMultiple from '@assets/User--multiple.svg?react';
import { MessengerAbout } from '@components/MessengerAbout/MessengerAbout';
import Settings from '@components/Settings/Settings';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, Outlet, useLocation } from 'react-router';

import styles from './SideBar.module.scss';

const { Sider } = Layout;

const SideBar: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('logo');
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const location = useLocation();

  const widthIcon = 26;
  const heightIcon = 30;

  const menuItems = [
    { key: 'logo', icon: <Logo width={widthIcon} height={heightIcon} />, path: '/' },
    { key: 'chats', icon: <ChatBot width={widthIcon} height={heightIcon} />, path: '/chat' },
    { key: 'contacts', icon: <UserMultiple width={widthIcon} height={heightIcon} />, path: '/contacts' },
    { key: 'settings', icon: <Setting width={widthIcon} height={heightIcon} />, path: '/settings' },
  ];

  if (isMobile) {
    return (
      <div className={styles.mobileWrapper}>
        <div className={styles.mobileContent}>
          <Outlet /> {/* Используем Outlet вместо ручного рендеринга */}
        </div>
        <nav className={styles.mobileNav}>
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={`${styles.mobileNavBtn} ${location.pathname === item.path ? styles.active : ''}`}
            >
              <Link to={item.path}>{item.icon}</Link>
            </button>
          ))}
        </nav>
      </div>
    );
  }

  return (
    <Layout style={{ height: '100%' }}>
      <Sider className={styles.sider} collapsed={false}>
        <Menu
          mode="inline"
          selectedKeys={[menuItems.find((item) => location.pathname.startsWith(item.path))?.key || 'logo']}
          className={styles.menu}
          items={menuItems.map((item) => ({
            key: item.key,
            icon: <Link to={item.path}>{item.icon}</Link>,
            label: '',
          }))}
        />
      </Sider>
      <Layout>
        <div className={styles.content}>
          <Outlet /> {/* Используем Outlet вместо ручного рендеринга */}
        </div>
      </Layout>
    </Layout>
  );
};

export default SideBar;
