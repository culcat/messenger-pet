import { Layout } from 'antd';

import Chats from '@/components/Chats/Chats';
import SideBar from '@/components/SideBar/SideBar';

export default function Messages() {
  return (
    <Layout style={{ display: 'flex', height: '100%' }}>
      <SideBar />
    </Layout>
  );
}
