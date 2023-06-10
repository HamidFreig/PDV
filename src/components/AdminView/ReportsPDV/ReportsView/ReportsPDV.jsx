import "./ReportsPDV.css";
import { useContext } from "react";
import { BDContext } from "../../../../context/BDContext";
import { useNavigate } from "react-router-dom";

import { IngresoEgreso } from "../IngresoEgresoReport/IngresoEgreso";

export const ReportsPDV = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/vector-premium/patron-isometrico-costuras-cubos-linea-delgada_659980-2.jpg")`,
        minHeight: "100vh",
        minWidth: "90vw",
      }}
    >
      <button className="Button-Out" onClick={() => navigate("/admin")}>
        ATRAS
      </button>
      <label style={{ backgroundColor: "white", marginBottom: "40PX" }}>
        REPORTES
      </label>
      <div className="DivReportes">
        <div className="IngresoEgreso">
          <IngresoEgreso />
        </div>
        <div className="ReportesVentas">div2</div>
      </div>
    </div>
  );
};
