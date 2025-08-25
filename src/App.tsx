import { useState } from "react";
import { Messages } from "@/pages/messages/Messages";
import "@/styles/global.scss";
import { Route, Routes } from "react-router";
import { Login } from "@/pages/login/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Messages />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
