import { Flex } from "antd";

import { LoginForm } from "@/components/LoginForm";
import { LoginTittle } from "@/components/LoginTittle";
export const Login = () => {
  return (
    <Flex
      style={{ height: "100vh" }}
      gap="middle"
      justify="center"
      align="center"
      vertical
    >
      <LoginTittle />
      <LoginForm />
    </Flex>
  );
};
