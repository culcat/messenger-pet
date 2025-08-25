import React, { useState } from "react";
import { Layout, Menu } from "antd";
import Logo from "@assets/Logo.svg?react";
import Archive from "@assets/Archive.svg?react";
import ChatBot from "@assets/Chat-bot.svg?react";
import Folders from "@assets/Folders.svg?react";
import Phone from "@assets/Phone.svg?react";
import Search from "@assets/Search.svg?react";
import Settings from "@assets/Settings.svg?react";
import Star from "@assets/Star.svg?react";
import UserMultiple from "@assets/User--multiple.svg?react";
import styles from "./SideBar.module.scss";
import Chats from "../Chats/Chats";

const { Sider } = Layout;

const SideBar: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState("chats");
  const widhtIcon = 26;
  const heightIcon = 30;
  const topMenu = [
    {
      key: "logo",
      icon: <Logo width={widhtIcon} height={heightIcon} />,
      disabled: true,
    },
    { key: "chats", icon: <ChatBot width={widhtIcon} height={heightIcon} /> },
    {
      key: "contacts",
      icon: <UserMultiple width={widhtIcon} height={heightIcon} />,
    },
  ];

  const bottomMenu = [
    {
      key: "settings",
      icon: <Settings width={widhtIcon} height={heightIcon} />,
    },
    { key: "stars", icon: <Star width={widhtIcon} height={heightIcon} /> },
    { key: "folders", icon: <Folders width={widhtIcon} height={heightIcon} /> },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case "chats":
        return <Chats />;
      case "contacts":
        return <div>Contacts Component</div>;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider className={styles.sider} theme="light" collapsed={false}>
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
              label: "",
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
              label: "",
            }))}
          />
        </div>

        <div className={styles.avatar}>S</div>
      </Sider>
      <Layout>
        <div className={styles.content}>{renderContent()}</div>
      </Layout>
    </Layout>
  );
};

export default SideBar;
