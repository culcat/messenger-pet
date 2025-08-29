import { Flex } from 'antd';

import { LoginForm } from '@/components/LoginForm';
import { LoginTittle } from '@/components/LoginTittle';
export const Login = () => {
  return (
    <div>
      <Flex gap="middle" justify="center" align="center" style={{ height: '100%' }} vertical>
        <LoginTittle />
        <LoginForm />
      </Flex>
    </div>
  );
};
