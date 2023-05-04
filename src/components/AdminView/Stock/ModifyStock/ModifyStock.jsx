import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { BDContext } from "../../../../context/BDContext";
import "./ModifyStock.css";
//MATERIAL MUI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";

export const ModifyStock = () => {
  const { modificateProduct, refreshPrice, refreshStock } =
    useContext(BDContext);
  const [modifyPrice, setModifyPrice] = useState(modificateProduct.Precio);
  const [modifyStock, setModifyStock] = useState(modificateProduct.Stock);

  const HandleInputChangeStock = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setModifyStock(event.target.value);
  };

  const HandleInputChangePrice = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setModifyPrice(event.target.value);
  };

  const functionmodifyPrice = (modificateProductId, modifyPrice) => {
    if (modifyPrice == 0 || modifyPrice < 0) {
      Swal.fire({
        icon: "error",
        title: "PRECIO NO VÁLIDO",
        timer: 2000,
      });
    } else {
      refreshPrice(modificateProductId, modifyPrice);
    }
  };

  const functionmodifyStock = (modificateProductId, modifyStock) => {
    if (modifyStock < 0) {
      Swal.fire({
        icon: "error",
        title: "STOCK NO VÁLIDO",
        timer: 2000,
      });
    } else {
      refreshStock(modificateProductId, modifyStock);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/vector-premium/patron-isometrico-costuras-cubos-linea-delgada_659980-2.jpg")`,
        height: "100vh",
      }}
    >
      <Link to={"/stock"}>
        <button className="Button-Back">ATRAS</button>
      </Link>
      <label style={{ marginBottom: "40px", backgroundColor: "white" }}>
        MODIFICAR PRODUCTO
      </label>
      <div className="divCard">
        <Card sx={{ maxWidth: 345, height: "580px" }}>
          <img src={modificateProduct.img} />
          <CardContent>
            <Typography
              fontFamily={"Ubuntu Condensed"}
              color="text.primary"
              fontSize={25}
            >
              NOMBRE PRODUCTO: {modificateProduct.Nombre.toUpperCase()}
            </Typography>
            <Typography
              fontFamily={"Ubuntu Condensed"}
              color="text.primary"
              fontSize={25}
            >
              SABOR: {modificateProduct.Sabor.toUpperCase()}
            </Typography>

            <Typography
              fontFamily={"Ubuntu Condensed"}
              color="text.primary"
              fontSize={25}
            >
              PRECIO: ${modificateProduct.Precio}
            </Typography>
            <Typography
              fontFamily={"Ubuntu Condensed"}
              color="text.primary"
              fontSize={25}
            >
              STOCK ACTUAL: {modificateProduct.Stock}
            </Typography>
          </CardContent>
          <div className="gridOptions">
            <TextField
              id="ModifyPrice"
              label="Nuevo Precio"
              type="number"
              onChange={HandleInputChangePrice}
            />
            <Button
              variant="contained"
              color="success"
              onClick={() =>
                functionmodifyPrice(modificateProduct.id, modifyPrice)
              }
            >
              MODIFICAR PRECIO
            </Button>
            <TextField
              id="ModifyStock"
              label="Nuevo Stock"
              type="number"
              onChange={HandleInputChangeStock}
            />
            <Button
              variant="contained"
              color="success"
              onClick={() =>
                functionmodifyStock(modificateProduct.id, modifyStock)
              }
            >
              MODIFICAR STOCK
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
