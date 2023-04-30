import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AllContext } from "./context/AllContext";
import { LoginView } from "./components/LoginView/LoginView";
import { AdminView } from "./components/AdminView/AdminView";
import { CreateUser } from "./components/AdminView/CreateUser/CreateUser";
import { DeleteUser } from "./components/AdminView/DeleteUser/DeleteUser";
import { Stock } from "./components/AdminView/Stock/Stock";
import { ModifyStock } from "./components/AdminView/Stock/ModifyStock/ModifyStock";
import { ReceptionStock } from "./components/ReceptionStock/ReceptionStock";

function App() {
  return (
    <BrowserRouter>
      <AllContext>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/admin" element={<AdminView />}></Route>
          <Route path="/createUser" element={<CreateUser />}></Route>
          <Route path="/deleteUser" element={<DeleteUser />}></Route>
          <Route path="/stock" element={<Stock />}></Route>
          <Route path="/modifyStock" element={<ModifyStock />}></Route>
          <Route path="/reception" element={<ReceptionStock />}></Route>
        </Routes>
      </AllContext>
    </BrowserRouter>
  );
}

export default App;
