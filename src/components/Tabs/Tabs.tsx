import { Button, Checkbox, Input, Select, Switch } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";

import styles from './Tabs.module.scss'

export const GeneralTab: React.FC = () => {
    const [pushEnabled,setPushEnabled] = useState(Boolean)
    return (
      <div className={styles.infoBlock}>
        <Title level={5} style={{ margin: 0 }}>General</Title>
        <div>
          <b>Login</b>
          <div>
          <Switch
              style={{ backgroundColor: pushEnabled ? '#121F24':'lightgrey' }}
              checked={pushEnabled}
            
              onChange={setPushEnabled}
            />
            <span style={{ marginLeft: 8 }}>On</span>
          </div>
        </div>
        <div>
          <b>Language</b>
          <Select defaultValue="default" style={{ width: 240 }}
            options={[
              { value: "default", label: "Default" },
              { value: "en", label: "English" },
              { value: "ru", label: "Русский" },
            ]}
          />
        </div>
        <div>
          <b>Password</b>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <Checkbox  defaultChecked>Photo</Checkbox>
            <Checkbox defaultChecked>Audio</Checkbox>
            <Checkbox defaultChecked>Video</Checkbox>
            <Checkbox>Document</Checkbox>
          </div>
        </div>
        <div>
          <b>Messages</b>
          <Button size="small">Archive all</Button>
        </div>
      </div>
    );
  };

  export const AccountTab: React.FC = () => {
    return (
<div className={styles.infoBlock}>
      <Title level={5} className={styles.title}>
        Account
      </Title>

      <div className={styles.field}>
        <label className={styles.label}>Username</label>
        <Input className={styles.input} placeholder="Sylvia Reyes"  />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Birthday</label>
        <Input className={styles.input} placeholder="19/10/1994"  />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Email</label>
        <Input className={styles.input} placeholder="sylvia@mercure.studio"  />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Password</label>
        <Input.Password className={styles.input} placeholder="********"  />
      </div>
    </div>
    );
  };


    export const NotificationTab: React.FC = () => {
    const [pushEnabled, setPushEnabled] = useState<boolean>(true);
    return (
      <div className={styles.infoBlock}>
        <Title level={5} style={{ margin: 0 }}>General</Title>
        <Paragraph>Receive notifications for comments, tags, change request and any new activity.</Paragraph>
        <div>
          <b>Communication</b>
          <div>
            <Switch
              style={{ backgroundColor: pushEnabled ? '#121F24':'lightgrey' }}
              checked={pushEnabled}
            
              onChange={setPushEnabled}
            />
            <span style={{ marginLeft: 8 }}>Push</span>
          </div>
        </div>
      </div>
    );
}


