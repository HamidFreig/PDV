import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

export const ClosingDay = ({ listVentas, listI, listE, apertura }) => {
  const [cerrarCaja, setCerrarCaja] = useState(0);

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
    setCerrarCaja(event.target.value);
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
      >
        CERRAR CAJA
      </Button>
    </div>
  );
};
