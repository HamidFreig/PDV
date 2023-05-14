import "./PosView.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ModalStockView } from "../ModalStockView/ModalStockView";
import { ModalIngresoDinero } from "../ModalIngresoDinero/ModalIngresoDinero";

//MATERIAL MUI

import Button from "@mui/material/Button";

export const PosView = () => {
  const navigate = useNavigate();
  const [modalStock, setModalStock] = useState(false);
  const [modalIngreso, setModalIngreso] = useState(false);

  return (
    <div className="DivGeneral">
      <button className="Button-Out" onClick={() => navigate("/")}>
        SALIR
      </button>
      <label style={{ backgroundColor: "white", marginBottom: "40PX" }}>
        PUNTO DE VENTA
      </label>
      <div className="NavBarMenu">
        <div className="ButtonStock">
          <Button
            color="primary"
            variant="contained"
            onClick={() => setModalStock(!modalStock)}
          >
            VER STOCK
          </Button>
          <div>{modalStock ? <ModalStockView /> : null}</div>
        </div>
        <div className="IngresoEgreso">
          <Button
            color="primary"
            variant="contained"
            onClick={() => setModalIngreso(!modalIngreso)}
          >
            INGRESO DE DINERO
          </Button>
          <div>{modalIngreso ? <ModalIngresoDinero /> : null}</div>
        </div>
        <div className="IngresoEgreso">
          <Button color="primary" variant="contained">
            EGRESO DE DINERO
          </Button>
        </div>
      </div>
    </div>
  );
};
