import "./ReportsPDV.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//DISEÑO MUI
import Button from "@mui/material/Button";
import { IngresoEgreso } from "../IngresoEgresoReport/IngresoEgreso";

export const ReportsPDV = () => {
  const navigate = useNavigate();
  const [modalIngresoEgreso, setModalIngresoEgreso] = useState(false);

  const ViewIngresoEgreso = () => {
    setModalIngresoEgreso(!modalIngresoEgreso);
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/vector-premium/patron-isometrico-costuras-cubos-linea-delgada_659980-2.jpg")`,
        height: "100vh",
      }}
    >
      <button className="Button-Out" onClick={() => navigate("/admin")}>
        ATRAS
      </button>
      <label style={{ backgroundColor: "white", marginBottom: "40PX" }}>
        REPORTES
      </label>
      <div className="NavBarMenu">
        <div className="ButtonIngresoEgreso">
          <Button
            color="primary"
            variant="contained"
            onClick={() => ViewIngresoEgreso()}
          >
            iNGRESOS Y EGRESOS
          </Button>
          {modalIngresoEgreso ? <IngresoEgreso /> : null}
        </div>
      </div>
    </div>
  );
};
