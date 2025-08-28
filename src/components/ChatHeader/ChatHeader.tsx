import { Avatar, Button, Flex, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import React from "react";

import { ChatItem } from "@/types/chat";

import { ProfileView } from "../ProfileView";
interface ChatHeaderProps {
  chat: ChatItem;
}
export const ChatHeader = (chat: ChatHeaderProps) => {
  return (
    <div
      style={{
        borderBottom: "1px solid #ccc",
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      {" "}
      <Content
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          background: "#fff",
        }}
      >
        <Flex align="center" gap="middle">
          <Avatar size={48}>{chat.chat.name[0]}</Avatar>
          <div>
            <Title level={4} style={{ margin: 0 }}>
              {chat.chat.name}
            </Title>
          </div>
        </Flex>
        <Flex align="center" gap="middle">
          <Space size="middle">
            <Button
              style={{ border: "none", borderRadius: "20px" }}
              color="default"
              variant="solid"
           
            >
              View profile
            </Button>
          </Space>
        </Flex>
      </Content>
    </div>
  );
};
