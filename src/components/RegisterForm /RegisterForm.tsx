import { Button, Checkbox, Form, FormProps, Input } from 'antd';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';

import { useRegisterMutation } from '@/store/authApi';
import { Login } from '@/types/login';
export const RegisterForm = () => {
  const [login, { isLoading, error }] = useRegisterMutation();
  const [cookies, setCookie] = useCookies(['access_token', 'username']);
  const navigate = useNavigate();
  const onFinish: FormProps<Login>['onFinish'] = async (values) => {
    try {
      const res = await login({ username: values.username, password: values.password }).unwrap();
      console.log('Logged in:', res);
      setCookie('access_token', res.access_token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'lax',
      });

      navigate('/chat');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const onFinishFailed: FormProps<Login>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Checkbox>Remember me for 30 days</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit" loading={isLoading}>
          Login
        </Button>
      </Form.Item>

      <Form.Item style={{ textAlign: 'center' }}>
        Don't have an account? <Link to="/register">Sign up</Link>
      </Form.Item>

      {error && <div style={{ color: 'red' }}>Login failed. Check credentials.</div>}
    </Form>
  );
};
