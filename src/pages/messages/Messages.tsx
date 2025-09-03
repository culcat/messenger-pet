import { Outlet } from 'react-router';

import SideBar from '@/components/SideBar/SideBar';

export default function Messages() {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
}
