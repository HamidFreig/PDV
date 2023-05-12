import "./PosView.css";
import { useNavigate } from "react-router-dom";

//MATERIAL MUI

import Button from "@mui/material/Button";

export const PosView = () => {
  const navigate = useNavigate();
  return (
    <div className="DivGeneral">
      <button className="Button-Out" onClick={() => navigate("/")}>
        SALIR
      </button>
      <label style={{ backgroundColor: "white" }}>PUNTO DE VENTA</label>
      <div className="NavBarMenu">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/stock")}
        >
          VER STOCK
        </Button>
      </div>
    </div>
  );
};
