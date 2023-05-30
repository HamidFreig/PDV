import "./SeccionPago.css";
import { useContext } from "react";
import { BDContext } from "../../../context/BDContext";

//MATERIAL MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const SeccionPago = () => {
  const { cart } = useContext(BDContext);
  return (
    <div className="SeccionPago">
      <div className="Total">
        <p>
          TOTAL: $
          {cart.reduce(
            (acc, curr) => acc + curr.CantidadProducto * curr.PrecioProducto,
            0
          )}
        </p>
      </div>
      <div className="MetodoPago">
        <b>EFECTIVO</b>
        <div>
          <img
            className="IconoPago"
            src="https://cdn-icons-png.flaticon.com/512/2489/2489756.png"
            alt="Icono"
          />
          <TextField
            className="MontoPago"
            id="standard-number"
            label="MONTO"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
        </div>
        <b>DÉBTIO</b>
        <div>
          <img
            className="IconoPago"
            src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRPwA1fZwjxWY0O0zRC_p4pmZubaeSDIC9rZK5lbl4lG_oWMnFi"
            alt="Icono"
          />
          <TextField
            className="MontoPago"
            id="standard-number"
            label="MONTO"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
        </div>
        <b>CRÉDITO</b>
        <div>
          <img
            className="IconoPago"
            src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRPwA1fZwjxWY0O0zRC_p4pmZubaeSDIC9rZK5lbl4lG_oWMnFi"
            alt="Icono"
          />
          <TextField
            className="MontoPago"
            id="standard-number"
            label="MONTO"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
        </div>
      </div>
      <div className="ButonCheck">
        <Button variant="contained" color="success">
          GENERAR VENTA
        </Button>
      </div>
    </div>
  );
};
