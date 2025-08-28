import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter,RouterProvider } from "react-router";

import { Login } from "@/pages/login/Login";
import { Messages } from "@/pages/messages/Messages";

import { store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Messages />, 
  },
  {
    path:"login",
    element:<Login/>
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
 
      <Provider store={store}>
    <RouterProvider router={router}/>     </Provider>
  
  </StrictMode>
);
