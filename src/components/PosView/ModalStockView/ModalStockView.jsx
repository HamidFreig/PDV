import { useState } from "react";
import "./ModalStockView.css";

//MATERIAL MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export const ModalStockView = () => {
  //FUNCIONES MODAL
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  //DISEÑO MODAL

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="StockSearch">
            <TextField
              id="outlined-number"
              label="INGRESE PRODUCTO"
              type="number"
            />
          </div>
          <div className="ButtonClose">
            <Button
              color="primary"
              variant="contained"
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
