import { Flex, Layout } from 'antd';

import { RegisterForm } from '@/components/RegisterForm ';
import { RegisterTittle } from '@/components/RegisterTittle';
export const Register = () => {
  return (
    <Layout>
      <Flex gap={16} justify="center" align="center" style={{ height: '100%' }} vertical>
        <RegisterTittle />
        <RegisterForm />
      </Flex>
    </Layout>
  );
};
