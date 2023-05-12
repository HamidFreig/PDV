import "./PosView.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

//MATERIAL MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ModalStockView } from "../ModalStockView/ModalStockView";

export const PosView = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  return (
    <div className="DivGeneral">
      <button className="Button-Out" onClick={() => navigate("/")}>
        SALIR
      </button>
      <label style={{ backgroundColor: "white" }}>PUNTO DE VENTA</label>
      <div className="NavBarMenu">
        <div className="ButtonStock">
          <Button
            color="primary"
            variant="contained"
            onClick={() => setModal(!modal)}
          >
            VER STOCK
          </Button>
          <div>{modal ? <ModalStockView /> : null}</div>
        </div>
        <div className="IngresoEgreso">
          <Button color="primary" variant="contained">
            INGRESO-EGRESO DE DINERO
          </Button>
        </div>
        <p>{currentDateTime.toLocaleTimeString()}</p>
        <p>{currentDateTime.toLocaleDateString()}</p>
      </div>
    </div>
  );
};
