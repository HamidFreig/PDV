import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { CloseDay } from "./components/AdminView/CloseDay/CloseDay";
import { ReportDetail } from "./components/AdminView/ReportsPDV/ReportDetail/ReportDetail";

function App() {
  // Componente de ruta personalizado para verificar permisos
  const PermisosRoute = ({ element, rolesPermitidos }) => {
    // Verificar si el usuario activo tiene un rol permitido
    const usuarioActivo = localStorage.getItem("userActive");
    const accesoPermitido = rolesPermitidos.includes(usuarioActivo);

    // Si el acceso es permitido, renderizar el elemento; de lo contrario, redirigir a una página de acceso denegado
    return accesoPermitido ? element : <Navigate to="/403" />;
  };
  return (
    <BrowserRouter>
      <AllContext>
        <Routes>
          <Route path="/" element={<LoginView />} />

          {/* Rutas con permisos específicos */}
          <Route
            path="/admin"
            element={
              <PermisosRoute
                element={<AdminView />}
                rolesPermitidos={["Admin"]}
              />
            }
          />
          <Route
            path="/createUser"
            element={
              <PermisosRoute
                element={<CreateUser />}
                rolesPermitidos={["Admin"]}
              />
            }
          />
          <Route
            path="/deleteUser"
            element={
              <PermisosRoute
                element={<DeleteUser />}
                rolesPermitidos={["Admin"]}
              />
            }
          />
          <Route
            path="/stock"
            element={
              <PermisosRoute element={<Stock />} rolesPermitidos={["Admin"]} />
            }
          />
          <Route
            path="/modifyStock/:id"
            element={
              <PermisosRoute
                element={<ModifyStock />}
                rolesPermitidos={["Admin"]}
              />
            }
          />
          <Route
            path="/modificateUser/:id"
            element={
              <PermisosRoute
                element={<ModificateUser />}
                rolesPermitidos={["Admin"]}
              />
            }
          />
          <Route
            path="/reception"
            element={
              <PermisosRoute
                element={<ReceptionStock />}
                rolesPermitidos={["Admin"]}
              />
            }
          />
          <Route
            path="/addProduct"
            element={
              <PermisosRoute
                element={<AddProduct />}
                rolesPermitidos={["Admin"]}
              />
            }
          />
          <Route
            path="/report"
            element={
              <PermisosRoute
                element={<ReportsPDV />}
                rolesPermitidos={["Admin"]}
              />
            }
          />
          <Route
            path="/ventasDetail/:id"
            element={
              <PermisosRoute
                element={<VentasDetail />}
                rolesPermitidos={["Admin"]}
              />
            }
          />
          <Route
            path="/reportDetail/:seleccion"
            element={
              <PermisosRoute
                element={<ReportDetail />}
                rolesPermitidos={["Admin"]}
              />
            }
          />
          <Route
            path="/pos"
            element={
              <PermisosRoute
                element={<PosView />}
                rolesPermitidos={["Vendedor"]}
              />
            }
          />
          <Route
            path="/closeDay"
            element={
              <PermisosRoute
                element={<CloseDay />}
                rolesPermitidos={["Admin"]}
              />
            }
          />

          {/* Ruta 404 */}
          <Route
            path="/403"
            element={
              <div>
                <h1>ACCESO DENEGADO</h1>
              </div>
            }
          />
        </Routes>
      </AllContext>
    </BrowserRouter>
  );
}

export default App;
