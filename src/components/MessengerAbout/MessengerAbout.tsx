import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import styles from "./MessengerAbout.module.scss";
import Logo from "@assets/Logo.svg?react";
export const MessengerAbout = () => {
  return (
    <div className={styles.emptyState}>
      <Logo style={{ margin: 20 }} />
      <Title style={{ margin: 20 }} level={2}>
        Messenger
      </Title>
      <Paragraph>Your personal messages are end-to-end encrypted.</Paragraph>
    </div>
  );
};
