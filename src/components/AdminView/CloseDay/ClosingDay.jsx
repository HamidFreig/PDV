import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useContext, useEffect } from "react";
import { BDContext } from "../../../context/BDContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export const ClosingDay = ({ listVentas, listI, listE, apertura }) => {
  const [MontoCerrarCaja, setMontoCerrarCaja] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const { addCloseDay } = useContext(BDContext);
  const navigate = useNavigate();

  const MontoApertura = apertura.reduce(
    (acc, curr) => acc + curr.MontoApertura,
    0
  );
  const MontoVentaEfectivo = listVentas.reduce(
    (acc, curr) => acc + curr.MontoEfectivo,
    0
  );

  const MontoIngreso = listI.reduce((acc, curr) => acc + curr.MontoIngreso, 0);
  const MontoEgreso = listE.reduce((acc, curr) => acc + curr.MontoEgreso, 0);

  const HandleInputChangeMontoCerrarCaja = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setMontoCerrarCaja(event.target.value);
  };

  const CerrarCaja = () => {
    if (MontoCerrarCaja < 0) {
      Swal.fire({
        icon: "error",
        title: "MONTO INVÁLIDO",
        timer: 1000,
      });
    } else if (
      MontoCerrarCaja <
      MontoApertura + MontoVentaEfectivo + MontoIngreso - MontoEgreso
    ) {
      Swal.fire({
        icon: "error",
        title: "MONTO INSUFICIENTE",
        timer: 1000,
      });
    } else if (
      MontoCerrarCaja ==
      MontoApertura + MontoVentaEfectivo + MontoIngreso - MontoEgreso
    ) {
      // Obtener la fecha y hora actual
      const fechaHoraActual = new Date();

      // Obtener la fecha actual
      const fechaActual = currentDateTime.toLocaleDateString();

      // Obtener la hora actual
      const horaActual = fechaHoraActual.toLocaleTimeString();

      addCloseDay(MontoCerrarCaja, fechaActual, horaActual);
      Swal.fire({
        icon: "success",
        title: "CIERRE REALIZADO CON EXITO",
        timer: 1000,
      });

      navigate("/");
    }
  };
  return (
    <div>
      <p>
        MONTO EN CAJA: $
        {MontoApertura + MontoVentaEfectivo + MontoIngreso - MontoEgreso}
      </p>

      <TextField
        id="outlined-number"
        label="MONTO"
        type="number"
        onChange={HandleInputChangeMontoCerrarCaja}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button
        variant="contained"
        style={{
          backgroundColor: "green",
          marginTop: "10px",
          marginLeft: "10px",
        }}
        onClick={CerrarCaja}
      >
        CERRAR CAJA
      </Button>
    </div>
  );
};
