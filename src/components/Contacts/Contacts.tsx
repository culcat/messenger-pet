import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Input, Typography, Divider, List, Avatar } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import styles from "./Contacts.module.scss";
import React from "react";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import ContactDetail from "../ContactDetail/ContactDetail";
export const Contacts = () => {
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const contacts = useSelector((state: RootState) => state.contacts);
  return (
    <div className={styles.wrapper}>
      <div className={styles.contacts}>
        <Title level={4} className={styles.title}>
          Contacts
        </Title>

        <div className={styles.search}>
          <Input
            placeholder="Search here..."
            prefix={<SearchOutlined />}
            allowClear
          />
          <PlusOutlined className={styles.addIcon} />
        </div>

        <Divider />

        <div className={styles.section}>
          <List
            itemLayout="horizontal"
            dataSource={contacts}
            renderItem={(item) => (
              <List.Item
                className={`${styles.contactsItem} ${
                  selectedId === item.id ? styles.active : ""
                }`}
                onClick={() => setSelectedId(item.id)}
              >
                <List.Item.Meta
                  avatar={<Avatar>{item.name[0]}</Avatar>}
                  title={item.name}
                  description={item.number}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
      <ContactDetail id={selectedId} />
    </div>
  );
};
