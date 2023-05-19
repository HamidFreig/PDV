import "./ModalOpenDay.css";
import { useState } from "react";
//MATERIAL MUI

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

//MATERIAL MUI

export const ModalOpenDay = () => {
  const [montoCajaInicial, setmontoCajaInicial] = useState(0);

  const styles = {
    position: "absolute",
    top: "35%",
    left: "50%",
    width: "60%",
    height: "200px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    border: "solid",
    borderRadius: "30px",
    padding: "20px",
    zIndex: 9999,
  };

  const HandleInputChangeMontoCajaIncial = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setmontoCajaInicial(event.target.value);
  };

  const sendAbrirDia = () => {};
  return (
    <div style={styles}>
      <div className="FormAbrirDia">
        <p>INGRESE DINERO CAJA INICIAL</p>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel
            id="MontoCajaIncial"
            type="number"
            htmlFor="outlined-adornment-amount"
          >
            MONTO
          </InputLabel>
          <OutlinedInput
            type="number"
            id="MontoCajaIncial"
            onChange={HandleInputChangeMontoCajaIncial}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="MontoCajaIncial"
          />
        </FormControl>
      </div>
      <div className="OpcionesModal">
        <Button
          variant="contained"
          color="success"
          onClick={() => sendAbrirDia()}
        >
          ABRIR DIA
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => window.location.reload()}
        >
          CANCELAR
        </Button>
      </div>
    </div>
  );
};
