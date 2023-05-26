import { useState, useContext } from "react";
import { BDContext } from "../../../context/BDContext";
import "./SeccionVenta.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const SeccionVenta = () => {
    const [buscador, setBuscador] = useState("");
    const { productsList } = useContext(BDContext);

    const HandleInputChangeBuscador = (event) => {
        //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
        setBuscador(event.target.value);
    };

    const addCart = (buscador) =>{
      console.log(buscador)
      productsList.map((dato)=>{
        if(dato.Codigo == buscador){
          console.log(dato)
        }
      })
    }

    return (
        <div>
            <p>SECCION PRODUDCTOS</p>
            <div className="seleccionProduct">
                
                <TextField
                    id="filled-search"
                    label="CODIGO PRODUCTO"
                    className="buscador"
                    type="search"
                    variant="filled"
                    onChange={HandleInputChangeBuscador}
                />
                <Button variant="contained" color="success" onClick={addCart}>
                    Agregar
                </Button>
            </div>
        </div>
    );
};
