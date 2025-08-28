import ActionButton from "@assets/_Action button.svg?react";
import {
  Avatar,
  Button,
  Flex,
  Input,
  Layout,
  List,
  Space,
} from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { FC, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { DateSend } from "@/components/DateSend/DateSend";
import { MessengerAbout } from "@/components/MessengerAbout/MessengerAbout";

import { RootState } from "../../store";
import { ChatHeader } from "../ChatHeader";

interface ChatDetailProps {
  id: number | null;
}

const ChatDetail: FC<ChatDetailProps> = (id) => {
  const chats = useSelector((state: RootState) => state.chats);

  const chat = chats.find((c) => c.id === id.id);

  const scrollToRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView({  });
    }
  }, [chat?.messages]);
  return (
    <>
      <Layout style={{ borderLeft: "1px solid #ccc", overflowY: "auto" }}>
        {id.id === null && <MessengerAbout />}
        {id.id !== null && chat && (
          <div>
            <ChatHeader chat={chat} />
            <Layout
              style={{
                padding: "16px 24px",
                backgroundColor: "#fff",
                overflow: "auto",
                minHeight: "85vh",
              }}
            >
              <List
                itemLayout="vertical"
                dataSource={chat.messages}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      borderBottom: "none",
                    }}
                  >
                    {item.sender === "You" ? (
                      <Flex
                        gap="middle"
                        justify="flex-end"
                        align="flex-start"
                        style={{ width: "100%", height: "100%" }}
                      >
                        <Flex vertical={true}>
                          <Flex gap="middle">
                            <Title level={5}>{item.sender}</Title>
                            <Paragraph>
                              <DateSend dateSend={item.time} />
                            </Paragraph>
                          </Flex>
                          <Paragraph
                            style={{
                              margin: "0px 0px 0px 0px",
                              backgroundColor: "#e6f0fa",
                              padding: "10px 10px 10px 10px",
                              borderRadius: 10,
                            }}
                          >
                            {item.message}
                          </Paragraph>
                        </Flex>
                      </Flex>
                    ) : (
                      <Flex
                        gap="middle"
                        style={{ width: "100%", height: "100%" }}
                      >
                        <Avatar
                          style={{
                            backgroundColor: "#e6f0fa",
                            color: "#3a7afe",
                          }}
                        >
                          {item.sender[0]}
                        </Avatar>{" "}
                        <Flex vertical={true}>
                          <Flex gap="middle">
                            <Title level={5}>{item.sender}</Title>
                            <Paragraph>
                              <DateSend dateSend={item.time} />
                            </Paragraph>
                          </Flex>
                          <Paragraph
                            style={{
                              margin: "0px 0px 0px 0px",
                              backgroundColor: "#d8e2e7ff",
                              padding: "10px 10px 10px 10px",
                              borderRadius: 10,
                            }}
                          >
                            {item.message}
                          </Paragraph>
                        </Flex>
                      </Flex>
                    )}
                  </List.Item>
                )}
              />
              <div ref={scrollToRef}></div>
            </Layout>

            <Space.Compact
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "sticky",
                bottom: 0,
                padding: "16px 24px",
                background: "#fff",
              }}
            >
              <Input placeholder="Type here..." />
              <Button variant="text" icon={<ActionButton />} />
            </Space.Compact>
          </div>
        )}
      </Layout>
    </>
  );
};

export default ChatDetail;
