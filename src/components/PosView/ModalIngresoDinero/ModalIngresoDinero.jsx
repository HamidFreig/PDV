import { useState, useContext } from "react";
import "./ModalIngresoDinero.css";
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

export const ModalIngresoDinero = () => {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  const [MontoIngreso, setMontoIngreso] = useState(0);
  const [commentarioIngreso, setComentarioIngreso] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [horaActual, setHoraActual] = useState(new Date().toLocaleTimeString());

  const { AddIncome } = useContext(BDContext); //ACCEDO A LA BD MEDIANTE CONTEXT

  const HandleInputChangeMontoIngreso = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setMontoIngreso(event.target.value);
  };

  const HandleInputChangeComentarioIngreso = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setComentarioIngreso(event.target.value);
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

  const sendIngreso = () => {
    if (MontoIngreso < 0) {
      setOpen(!open);
      Swal.fire({
        icon: "error",
        title: "INGRESO NO VÁLIDO",
      });
    } else if (commentarioIngreso == "") {
      setOpen(!open);
      Swal.fire({
        icon: "error",
        title: "INGRESE UN COMENTARIO",
      });
    } else {
      AddIncome(
        MontoIngreso,
        currentDateTime.toLocaleDateString(),
        horaActual,
        commentarioIngreso
      );
      setOpen(!open);
      Swal.fire({
        icon: "success",
        title: "INGRESO INGRESADO CON EXITO",
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
                INGRESO
              </InputLabel>
              <OutlinedInput
                type="number"
                id="MontoIngreso"
                onChange={HandleInputChangeMontoIngreso}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="INGRESO"
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel
                id="ComentarioIngreso"
                type="text"
                htmlFor="outlined-adornment-amount"
              >
                COMENTARIO
              </InputLabel>
              <OutlinedInput
                type="text"
                id="ComentarioIngreso"
                onChange={HandleInputChangeComentarioIngreso}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
                label="COMENTARIO"
              />
            </FormControl>
            <div className="BotonEnviarIngreso">
              <Button
                variant="contained"
                color="success"
                onClick={() => sendIngreso()}
              >
                ENVIAR INGRESO
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
