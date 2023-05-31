import "./PosView.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ModalStockView } from "../ModalStockView/ModalStockView";
import { ModalIngresoDinero } from "../ModalIngresoDinero/ModalIngresoDinero";
import { SeccionVenta } from "../SeccionVenta/SeccionVenta";

//MATERIAL MUI

import Button from "@mui/material/Button";
import { ModalEgresoDinero } from "../ModalEgresoDinero/ModalEgresoDinero";
import { SeccionPago } from "../SeccionPago/SeccionPago";

export const PosView = () => {
  const navigate = useNavigate();
  const [modalStock, setModalStock] = useState(false);
  const [modalIngreso, setModalIngreso] = useState(false);
  const [modalEgreso, setModalEgreso] = useState(false);

  const viewModalIngreso = () => {
    setModalIngreso(!modalIngreso);
  };

  const viewModalEgreso = () => {
    setModalEgreso(!modalEgreso);
  };

  return (
    <div
      className="DivGeneral"
      style={{
        backgroundImage: `url("https://img.freepik.com/vector-premium/patron-isometrico-costuras-cubos-linea-delgada_659980-2.jpg")`,
        height: "97vh",
      }}
    >
      <button className="Button-Out" onClick={() => navigate("/")}>
        SALIR
      </button>
      <label style={{ backgroundColor: "white", marginBottom: "40PX" }}>
        PUNTO DE VENTA
      </label>
      <div className="NavBarMenu">
        <div className="ButtonStock">
          <Button
            sx={{ backgroundColor: "black" }}
            variant="contained"
            onClick={() => setModalStock(!modalStock)}
          >
            VER PRODUCTOS
          </Button>
          <div>{modalStock ? <ModalStockView /> : null}</div>
        </div>
        <div className="IngresoEgreso">
          <Button
            sx={{ backgroundColor: "black" }}
            variant="contained"
            onClick={() => viewModalIngreso()}
          >
            INGRESO DE DINERO
          </Button>
          <div>{modalIngreso ? <ModalIngresoDinero /> : null}</div>
        </div>
        <div className="IngresoEgreso">
          <Button
            sx={{ backgroundColor: "black" }}
            variant="contained"
            onClick={() => viewModalEgreso()}
          >
            EGRESO DE DINERO
          </Button>
          <div>{modalEgreso ? <ModalEgresoDinero /> : null} </div>
        </div>
      </div>
      <div className="POS">
        <div className="POS1">
          <SeccionVenta />
        </div>
        <div className="POS2">
          <div>
            <SeccionPago />
          </div>
        </div>
      </div>
    </div>
  );
};
