import Logout from '@assets/Icon trailing.svg?react';
import { Button, Divider } from 'antd';
import { Tabs } from 'antd';
import { TabsProps } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import { useCookies } from 'react-cookie';

import * as Tab from '../Tabs';
import styles from './Settings.module.scss';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'General',
    children: <Tab.GeneralTab />,
  },
  {
    key: '2',
    label: 'Account',
    children: <Tab.AccountTab />,
  },
  {
    key: '4',
    label: 'Notification',
    children: <Tab.NotificationTab />,
  },
];

const Settings = () => {
  const [Cookies] = useCookies(['username']);

  return (
    <div className={styles.detailLayout}>
      <Content>
        <div className={styles.contactInfo}>
          <div className={styles.header}>
            <div className={styles.avatar}>{Cookies.username[0]}</div>
            <div>
              <Title level={3} style={{ marginBottom: 0 }}>
                {Cookies.username}
              </Title>
            </div>
            <div className={styles.headerActions}>
              <Button
                shape="circle"
                icon={
                  <span>
                    <Logout />
                  </span>
                }
              />
              <Button shape="circle" icon={<span>⋯</span>} />
            </div>
          </div>
          <Divider />
          <Tabs items={items} className={styles.tabs} />
        </div>
      </Content>
    </div>
  );
};

export default Settings;
