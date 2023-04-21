import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginView } from "./components/LoginView/LoginView";
import { AdminView } from "./components/AdminView/AdminView";
import { CreateUser } from "./components/AdminView/CreateUser/CreateUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/admin" element={<AdminView />}></Route>
        <Route path="/createUser" element={<CreateUser />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
