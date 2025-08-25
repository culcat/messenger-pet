import { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

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
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox>Remember me for 30 days</Checkbox>{" "}
        <Link to="/">Forgot password?</Link>
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
