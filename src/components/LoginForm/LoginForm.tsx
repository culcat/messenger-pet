import { Button, Checkbox, Form, FormProps, Input } from "antd";
import { Link } from "react-router";

import { Login } from "@/types/login";
const onFinish: FormProps<Login>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<Login>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
export const LoginForm = () => {



  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      variant="filled"
    >
      <Form.Item
        label="Email address"
        name="Email"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input  />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
        
        />
      </Form.Item>
      <Form.Item>
        <Checkbox>Remember me for 30 days</Checkbox>{" "}
      </Form.Item>
      <Form.Item>
        <Button
          block
          variant="solid"
          color="default"
          shape="round"
          htmlType="submit"
        >
          Login
        </Button>
      </Form.Item>
      <Form.Item style={{ textAlign: "center" }}>
        Don't have an account? <Link to="/register">Sign up</Link>
      </Form.Item>
    </Form>
  );
};
