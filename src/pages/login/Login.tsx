import { Flex } from 'antd';

import { LoginForm } from '@/components/LoginForm';
import { LoginTittle } from '@/components/LoginTittle';
export default function Login() {
  return (
    <div>
      <Flex gap={16} justify="center" align="center" style={{ height: '100%' }} vertical>
        <LoginTittle />
        <LoginForm />
      </Flex>
    </div>
  );
}
