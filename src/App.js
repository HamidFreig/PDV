import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AllContext } from "./context/AllContext";
import { LoginView } from "./components/LoginView/LoginView";
import { AdminView } from "./components/AdminView/AdminView/AdminView";
import { CreateUser } from "./components/AdminView/CreateUser/CreateUser";
import { DeleteUser } from "./components/AdminView/DeleteUser/DeleteUser";
import { Stock } from "./components/AdminView/Stock/Stock";
import { ModifyStock } from "./components/AdminView/Stock/ModifyStock/ModifyStock";
import { ReceptionStock } from "./components/AdminView/RecptionStock/ReceptionStock";
import { AddProduct } from "./components/AdminView/Stock/AddProduct/AddProduct";
import { ModificateUser } from "./components/AdminView/ModificateUser/ModificateUser";
import { PosView } from "./components/PosView/PosView/PosView";
import { ReportsPDV } from "./components/AdminView/ReportsPDV/ReportsView/ReportsPDV";
import { VentasDetail } from "./components/AdminView/ReportsPDV/VentasDetail/VentasDetail";

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
          <Route path="/modifyStock/:id" element={<ModifyStock />}></Route>
          <Route
            path="/modificateUser/:id"
            element={<ModificateUser />}
          ></Route>
          <Route path="/reception" element={<ReceptionStock />}></Route>
          <Route path="/addProduct" element={<AddProduct />}></Route>
          <Route path="/report" element={<ReportsPDV />}></Route>
          <Route path="/reportDetail/:id" element={<VentasDetail />}></Route>
          <Route path="/pos" element={<PosView />}></Route>
        </Routes>
      </AllContext>
    </BrowserRouter>
  );
}

export default App;
