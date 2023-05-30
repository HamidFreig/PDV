import { useState, useContext } from "react";
import { BDContext } from "../../../context/BDContext";
import Swal from "sweetalert2";
import "./SeccionVenta.css";
import { TableVenta } from "./TableVenta/TableVenta";

//MATERIAL MUI

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const SeccionVenta = () => {
  const [buscador, setBuscador] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const { productsList, Cart, verifyStock } = useContext(BDContext);

  const handleChangeCantidad = (event) => {
    setCantidad(event.target.value);
  };

  const HandleInputChangeBuscador = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setBuscador(event.target.value);
  };

  const addCart = () => {
    //CHEQUEO SI EL PRODUCTO EXISTE
    const existProduct = productsList.find(
      (dato) => dato.Codigo == parseInt(buscador)
    );

    if (existProduct != null) {
      if (cantidad > 0) {
        //SI EXISTE Y LA CANTIDAD ES MAYOR A 0 VERIFICAMOS SI HAY STOCK
        if (verifyStock(existProduct, cantidad)) {
          Cart(existProduct, cantidad);
          setBuscador("");
          setCantidad(1);
          Swal.fire({
            icon: "success",
            title: "PRODUCTO AGREGADO",
            timer: 1000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "STOCK INSUFICIENTE",
            timer: 2000,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "CANTIDAD NO VÁLIDA",
          timer: 2000,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "PRODUCTO NO EXISTE",
        timer: 2000,
      });
    }
  };

  return (
    <div>
      <p>SECCION PRODUCTOS</p>
      <div className="seleccionProduct">
        <TextField
          id="outlined-search"
          label="CODIGO PRODUCTO"
          className="buscador"
          value={buscador}
          type="search"
          variant="filled"
          onChange={HandleInputChangeBuscador}
        />

        <div style={{ marginLeft: "15px" }}>
          <TextField
            id="filled-number"
            label="CANTIDAD"
            type="number"
            value={cantidad}
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            onChange={handleChangeCantidad}
          />
        </div>

        <div style={{ marginLeft: "15px" }}>
          <Button variant="contained" color="success" onClick={() => addCart()}>
            Agregar
          </Button>
        </div>
      </div>
      <div>
        <TableVenta />
      </div>
    </div>
  );
};
