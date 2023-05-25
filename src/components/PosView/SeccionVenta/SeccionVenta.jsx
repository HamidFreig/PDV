import { useState } from "react";

import TextField from "@mui/material/TextField";

export const SeccionVenta = () => {
  const [buscador, setBuscador] = useState("");

  const HandleInputChangeBuscador = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setBuscador(event.target.value.toLowerCase());
    console.log(buscador);
  };

  return (
    <div>
      <p>SECCION PRODUDCTOS</p>
      <TextField
        id="filled-basic"
        label="Filled"
        variant="filled"
        onChange={HandleInputChangeBuscador}
      />
    </div>
  );
};
