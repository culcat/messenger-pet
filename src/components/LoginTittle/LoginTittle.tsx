import { Flex, Typography } from 'antd';

import Logo from '../../assets/Logo.svg?react';

const { Title, Text } = Typography;

export const LoginTittle = () => {
  return (
    <>
      <Flex gap="middle" justify="center" align="center" vertical>
        <Logo />
        <Title>Sign in</Title>
        <Text type="secondary"> Welcome back! Please enter your details.</Text>
      </Flex>
    </>
  );
};
