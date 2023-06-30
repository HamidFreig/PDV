import "./CloseDay.css";
import { Link } from "react-router-dom";
import { BDContext } from "../../../context/BDContext";
import { useContext, useState } from "react";
import GraficoCircularMontos from "./GraficoCircularMontos";
import GraficoCircularIE from "./GraficoCircularIE";
import { TablaCuadratura } from "./TablaCuadratura";
import { ClosingDay } from "./ClosingDay";
export const CloseDay = () => {
  const { listVentas, ingresos, egresos, aperturas } = useContext(BDContext);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

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

  //FILTRADO DE APERTURA
  const filterApertura = () => {
    const Apertura = aperturas.filter((dato) => {
      return dato.Fecha == `${DiaSplit}/${MesSplit}/${AñoSplit}`;
    });
    return Apertura;
  };

  return (
    <div>
      <Link to={"/admin"}>
        <button className="Button-Back">ATRAS</button>
      </Link>
      <label style={{ marginTop: "20px" }}>RESUMEN Y CIERRE DE CAJA</label>
      {""}

      <div className="Graficos">
        {filterVentas().reduce((acc, curr) => acc + curr.MontoTotal, 0) > 0 ? (
          <div className="Graficos1">
            <GraficoCircularMontos list={filterVentas()} />
          </div>
        ) : (
          <p style={{ fontWeight: "1000" }}>NO HAY DATOS DE VENTAS</p>
        )}
        {filterIngresos().reduce((acc, curr) => acc + curr.MontoIngreso, 0) +
          filterEgresos().reduce((acc, curr) => acc + curr.MontoEgreso, 0) >
        0 ? (
          <div className="Graficos1">
            <GraficoCircularIE
              listI={filterIngresos()}
              listE={filterEgresos()}
            />
          </div>
        ) : (
          <p style={{ fontWeight: "1000" }}>NO HAY DATOS DE TRANSACCIONES</p>
        )}
      </div>
      <div className="Cuadratura">
        <div className="Table">
          <TablaCuadratura
            listVentas={filterVentas()}
            listI={filterIngresos()}
            listE={filterEgresos()}
            apertura={filterApertura()}
          />
        </div>
        <div className="Close">
          <ClosingDay
            listVentas={filterVentas()}
            listI={filterIngresos()}
            listE={filterEgresos()}
            apertura={filterApertura()}
          />
        </div>
      </div>
    </div>
  );
};
