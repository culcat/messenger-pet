import Logout from "@assets/Icon trailing.svg?react";
import { Button, Checkbox, Divider, Layout, Select, Switch } from "antd";
import { Tabs } from "antd";
import { TabsProps } from "antd";
import { Content } from "antd/es/layout/layout";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import React from "react";

import * as Tab from "../Tabs";
import styles from "./Settings.module.scss";


const items: TabsProps["items"] = [
  {
    key: "1",
    label: "General",
    children: <Tab.GeneralTab />,
  },
  {
    key: "2",
    label: "Account",
    children: <Tab.AccountTab />,
  },
  {
    key: "4",
    label: "Notification",
    children: <Tab.NotificationTab />,
  },
  
];

const Settings = () => {

  return (
    <Layout className={styles.detailLayout}>
      <Content>
        <div className={styles.contactInfo}>
          <div className={styles.header}>
            <div className={styles.avatar}>S</div>
            <div>
              <Title level={3} style={{ marginBottom: 0 }}>
                Sylvia Reyes
              </Title>
              <Paragraph style={{ marginBottom: 0 }}>+44656548600</Paragraph>
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
    </Layout>
  );
};

export default Settings;
