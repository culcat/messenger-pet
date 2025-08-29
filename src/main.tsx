// import './styles/index.scss';

import { ConfigProvider, Flex, Spin } from 'antd';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { store } from './store';

const Messages = lazy(() => import('@/pages/messages/Messages').then((module) => ({ default: module.Messages })));
const Login = lazy(() => import('@/pages/login/Login').then((module) => ({ default: module.Login })));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense
        fallback={
          <Flex justify="center" align="center" style={{ height: '90vh' }}>
            <Spin tip="Loading" size="large"></Spin>
          </Flex>
        }
      >
        <Messages />
      </Suspense>
    ),
  },
  {
    path: 'login',
    element: (
      <Suspense
        fallback={
          <Flex justify="center" align="center" style={{ height: '90vh' }}>
            <Spin tip="Loading" size="large"></Spin>
          </Flex>
        }
      >
        <Login />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: { colorPrimary: '#121F24' },
      }}
    >
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  </StrictMode>,
);
