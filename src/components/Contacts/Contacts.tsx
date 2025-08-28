import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Avatar,Divider, Input, List,  } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store";
import ContactDetail from "../ContactDetail/ContactDetail";
import styles from "./Contacts.module.scss";
export const Contacts = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
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
