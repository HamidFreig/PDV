import "./CloseDay.css";
import { Link } from "react-router-dom";
import { BDContext } from "../../../context/BDContext";
import { useContext, useState } from "react";
import GraficoCircularMontos from "./GraficoCircularMontos";
import GraficoCircularIE from "./GraficoCircularIE";
export const CloseDay = () => {
  const { listVentas, ingresos, egresos } = useContext(BDContext);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [diaFiltrado, setDiaFiltrado] = useState(1);
  const [MesFiltrado, setMesFiltrado] = useState(1);
  const [AñoFiltrado, setAñoFiltrado] = useState(1);

  const Separador = "/";
  const FechaSplit = currentDateTime.toLocaleDateString().split(Separador);
  const DiaSplit = parseInt(FechaSplit[0]);
  const MesSplit = parseInt(FechaSplit[1]);
  const AñoSplit = parseInt(FechaSplit[2]);

  //FILTRADO DE VENTAS
  const filterVentas = () => {
    const Ventas = listVentas.filter((dato) => {
      return (
        dato.Fecha.Dia == DiaSplit &&
        dato.Fecha.Mes == MesSplit &&
        dato.Fecha.Año == AñoSplit
      );
    });
    return Ventas;
  };

  //FILTRADO DE INGRESOS
  const filterIngresos = () => {
    const Ingresos = ingresos.filter((dato) => {
      return (
        dato.Dia == DiaSplit && dato.Mes == MesSplit && dato.Año == AñoSplit
      );
    });
    return Ingresos;
  };

  //FILTRADO DE EGRESOS
  const filterEgresos = () => {
    const Egresos = egresos.filter((dato) => {
      return (
        dato.Dia == DiaSplit && dato.Mes == MesSplit && dato.Año == AñoSplit
      );
    });
    return Egresos;
  };

  return (
    <div>
      <Link to={"/admin"}>
        <button className="Button-Back">ATRAS</button>
      </Link>
      <label>RESUMEN Y CIERRE DE CAJA</label>
      <div className="Graficos">
        <div className="Graficos1">
          <GraficoCircularMontos list={filterVentas()} />
        </div>
        <div className="Graficos2">
          <GraficoCircularIE listI={filterIngresos()} listE={filterEgresos()} />
        </div>
      </div>
    </div>
  );
};
