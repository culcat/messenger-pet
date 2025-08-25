import { LoginTittle } from "@/components/LoginTittle";
import { LoginForm } from "@/components/LoginForm";
import { Flex } from "antd";
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
