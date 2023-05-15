import { useState, useContext } from "react";
import "./ModalEgresoDinero.css";
import Swal from "sweetalert2";
import { BDContext } from "../../../context/BDContext";

//MATERIAL MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

export const ModalEgresoDinero = () => {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  const [MontoEgreso, setMontoEgreso] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const { AddDischarge } = useContext(BDContext); //ACCEDO A LA BD MEDIANTE CONTEXT

  const HandleInputChangeMontoEgreso = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setMontoEgreso(event.target.value);
  };

  //DISEÑO MODAL
  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const sendEgreso = () => {
    if (MontoEgreso < 0) {
      setOpen(!open);
      Swal.fire({
        icon: "error",
        title: "EGRESO NO VÁLIDO",
      });
    } else {
      AddDischarge(MontoEgreso, currentDateTime.toLocaleDateString());
      setOpen(!open);
      Swal.fire({
        icon: "success",
        title: "EGRESO INGRESADO CON EXITO",
        timer: 2000,
      });
    }
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <div className="FormIngreso">
            <label>INGRESE LA CANTIDAD DE DINERO</label>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel
                id="MontoIngreso"
                type="number"
                htmlFor="outlined-adornment-amount"
              >
                EGRESO
              </InputLabel>
              <OutlinedInput
                type="number"
                id="MontoEgreso"
                onChange={HandleInputChangeMontoEgreso}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="EGRESO"
              />
            </FormControl>
            <div className="BotonEnviarEgreso">
              <Button
                variant="contained"
                color="success"
                onClick={() => sendEgreso()}
              >
                ENVIAR EGRESO
              </Button>
            </div>
          </div>
          <div className="ButtonClose">
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleClose()}
            >
              CERRAR
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
