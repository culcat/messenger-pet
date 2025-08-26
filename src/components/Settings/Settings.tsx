import { Button, Divider, Layout } from "antd";
import styles from "./Settings.module.scss";
import React from "react";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import Logout from "@assets/Icon trailing.svg?react";

const Settings = () => {
  return (
    <Layout className={styles.detailLayout}>
      <Content>
        <div className={styles.contactInfo}>
          <div className={styles.header}>
            <div className={styles.avatar}>u</div>
            <div>
              <Title level={3} style={{ marginBottom: 0 }}>
                You
              </Title>
              <Paragraph style={{ marginBottom: 0 }}>899999999</Paragraph>
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
          <div className={styles.overview}>
            <Title level={5}>General</Title>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Settings;
