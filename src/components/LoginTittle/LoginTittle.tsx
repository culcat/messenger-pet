import styles from "./LoginTittle.module.scss";
import Logo from "../../assets/Logo.svg?react";
import { Typography } from "antd";

const { Title, Text } = Typography;

export const LoginTittle = () => {
  return (
    <>
      <Logo />
      <Title>Sign in</Title>
      <Text type="secondary"> Welcome back! Please enter your details.</Text>
    </>
  );
};
