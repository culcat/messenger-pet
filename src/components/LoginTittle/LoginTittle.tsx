import { Typography } from "antd";

import Logo from "../../assets/Logo.svg?react";
import styles from "./LoginTittle.module.scss";

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
