
import { Route, Routes } from "react-router";

import { Login } from "@/pages/login/Login";
import { Messages } from "@/pages/messages/Messages";

function App() {
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
