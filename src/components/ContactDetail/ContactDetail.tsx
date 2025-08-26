import { Layout, Tabs, Button, Divider } from "antd";
import { Content } from "antd/es/layout/layout";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import Logo from "@assets/Logo.svg?react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import styles from "./ContactDetail.module.scss";
import { MessengerAbout } from "@/components/MessengerAbout/MessengerAbout";
interface ChatDetailProps {
  id: number | null;
}

const ContactDetail = ({ id }: ChatDetailProps) => {
  const contacts = useSelector((state: RootState) => state.contacts);
  const contact = contacts.find((c) => c.id === id);

  return (
    <Layout className={styles.detailLayout}>
      <Content>
        {id === null || !contact ? (
          <MessengerAbout />
        ) : (
          <div className={styles.contactInfo}>
            <div className={styles.header}>
              <div className={styles.avatar}>{contact.name[0]}</div>
              <div>
                <Title level={3} style={{ marginBottom: 0 }}>
                  {contact.name}
                </Title>
                <Paragraph style={{ marginBottom: 0 }}>
                  {contact.number}
                </Paragraph>
              </div>
              <div className={styles.headerActions}>
                <Button shape="circle" icon={<span>💬</span>} />
                <Button shape="circle" icon={<span>⋯</span>} />
              </div>
            </div>
            <Divider />
            <div className={styles.overview}>
              <Title level={5}>Contact information</Title>
              <Paragraph>
                Mobile
                <br /> {contact.number}
              </Paragraph>
              <Paragraph>
                Email
                <br /> {contact.email || "Not provided"}
              </Paragraph>
            </div>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default ContactDetail;
