import { Button, Checkbox, Divider, Layout, Select, Switch } from "antd";
import styles from "./Settings.module.scss";
import React from "react";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import Logout from "@assets/Icon trailing.svg?react";
import { Tabs } from "antd";
import { TabsProps } from "antd";
import * as Tab from "../Tabs";


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
