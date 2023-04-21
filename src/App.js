import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginView } from "./components/LoginView/LoginView";
import { AdminView } from "./components/AdminView/AdminView";
import { CreateUser } from "./components/AdminView/CreateUser/CreateUser";
import { DeleteUser } from "./components/AdminView/DeleteUser/DeleteUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/admin" element={<AdminView />}></Route>
        <Route path="/createUser" element={<CreateUser />}></Route>
        <Route path="/deleteUser" element={<DeleteUser />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
