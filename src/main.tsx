import { lazy,StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter,RouterProvider } from "react-router";

import { store } from "./store";

const Messages = lazy(() => import('@/pages/messages/Messages').then(module => ({ default: module.Messages })));
const Login = lazy(() => import('@/pages/login/Login').then(module => ({ default: module.Login })));

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Suspense fallback={<div>Loading...</div>}><Messages /></Suspense>), 
  },
  {
    path:"login",
    element:(<Suspense fallback={<div>Loading...</div>}><Login/></Suspense>)
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}/>  
      </Provider>
  </StrictMode>
);
