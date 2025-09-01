import './styles/index.scss';

import { ConfigProvider, Flex, Spin } from 'antd';
import { lazy, StrictMode, Suspense } from 'react';
import { CookiesProvider } from 'react-cookie';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router';

import ChatDetail from './components/ChatDetail/ChatDetail';
import Chats from './components/Chats/Chats';
import ContactDetail from './components/ContactDetail/ContactDetail';
import { Contacts } from './components/Contacts';
import { MessengerAbout } from './components/MessengerAbout';
import Settings from './components/Settings/Settings';
import SideBar from './components/SideBar/SideBar';
import { store } from './store';

const Messages = lazy(() => import('@/pages/messages/Messages').then((module) => ({ default: module.Messages })));
// const Login = lazy(() => import('@/pages/login/Login').then((module) => ({ default: module.Login })));
const Loader = () => (
  <Flex justify="center" align="center" style={{ height: '90vh' }}>
    <Spin tip="Loading" size="large" />
  </Flex>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Messages />, // Главный layout с SideBar
    children: [
      {
        index: true,
        element: <MessengerAbout />, // Главная страница
      },
      {
        path: 'chat',
        children: [
          {
            index: true,
            element: <Chats />, // Список чатов
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<Loader />}>
                <ChatDetail />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'contacts',
        children: [
          {
            index: true,
            element: <Contacts />, // Список контактов
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<Loader />}>
                <ContactDetail />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'settings',
        element: <Settings />, // Настройки
      },
    ],
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
      <ConfigProvider
        theme={{
          token: { colorPrimary: '#121F24' },
        }}
      >
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ConfigProvider>
    </CookiesProvider>
  </StrictMode>,
);
