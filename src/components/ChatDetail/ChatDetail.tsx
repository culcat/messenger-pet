import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import Logo from "@assets/Logo.svg?react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import React from "react";
interface ChatDetailProps {
  id: number | null;
}

const ChatDetail = (id: ChatDetailProps) => {
  const chats = useSelector((state: RootState) => state.chats);

  return (
    <>
      {" "}
      <Layout>
        <Layout>
          {id.id === null && (
            <Content
              style={{
                textAlign: "center",
                marginTop: 100,
              }}
            >
              <Logo style={{ margin: 20 }} />
              <Title style={{ margin: 20 }} level={2}>
                Messenger
              </Title>
              <Paragraph>
                Your personal messages are end-to-end encrypted.
              </Paragraph>
            </Content>
          )}
        </Layout>
      </Layout>
    </>
  );
};

export default ChatDetail;
