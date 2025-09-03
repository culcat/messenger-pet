import './styles/index.scss';

import { ConfigProvider, Flex, Spin } from 'antd';
import { lazy, StrictMode, Suspense } from 'react';
import { CookiesProvider } from 'react-cookie';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { Error } from '@/pages/error/Error';

import ChatDetail from './components/ChatDetail/ChatDetail';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { Register } from './pages/register/Register';
import { store } from './store';
import { themeCust } from './utils/theme';

const Messages = lazy(() => import('@/pages/messages/Messages'));
const Login = lazy(() => import('@/pages/login/Login'));

const router = createBrowserRouter([
  {
    path: 'chat',
    element: (
      <Suspense
        fallback={
          <Flex justify="center" align="center" style={{ height: '90vh' }}>
            <Spin tip="Loading" size="large"></Spin>
          </Flex>
        }
      >
        <ProtectedRoute>
          <Messages />
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        path: ':id',
        element: (
          <Suspense
            fallback={
              <Flex justify="center" align="center" style={{ height: '90vh' }}>
                <Spin tip="Loading" size="large"></Spin>
              </Flex>
            }
          >
            <ChatDetail />
          </Suspense>
        ),
      },
    ],
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
  {
    path: 'register',
    element: (
      <Suspense
        fallback={
          <Flex justify="center" align="center" style={{ height: '90vh' }}>
            <Spin tip="Loading" size="large"></Spin>
          </Flex>
        }
      >
        <Register />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense
        fallback={
          <Flex justify="center" align="center" style={{ height: '90vh' }}>
            <Spin tip="Loading" size="large"></Spin>
          </Flex>
        }
      >
        <Error />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
      <ConfigProvider theme={themeCust}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ConfigProvider>
    </CookiesProvider>
  </StrictMode>,
);
