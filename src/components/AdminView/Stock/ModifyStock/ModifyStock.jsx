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
  const {
    modificateProduct,
    refreshPrice,
    refreshStock,
    refreshName,
    refreshSabor,
    refreshCode,
  } = useContext(BDContext);
  const [modifyPrice, setModifyPrice] = useState(modificateProduct.Precio);
  const [modifyStock, setModifyStock] = useState(modificateProduct.Stock);
  const [modifyName, setModifyName] = useState(modificateProduct.Nombre);
  const [modifySabor, setModifySabor] = useState(modificateProduct.Sabor);
  const [modifyCode, setModifyCode] = useState(modificateProduct.Codigo);

  const HandleInputChangeStock = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setModifyStock(event.target.value);
  };

  const HandleInputChangePrice = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setModifyPrice(event.target.value);
  };

  const HandleInputChangeName = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setModifyName(event.target.value);
  };

  const HandleInputChangeSabor = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setModifySabor(event.target.value);
  };

  const HandleInputChangeCode = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setModifyCode(event.target.value);
  };

  const functionmodifyPrice = (modificateProductId, modifyPrice) => {
    //SI LOS DATOS SON INVALIDOS O IGUALES A LOS QUE HAY
    if (
      modifyPrice == 0 ||
      modifyPrice < 0 ||
      modifyPrice == modificateProduct.Precio
    ) {
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
    //SI LOS DATOS SON INVALIDOS O IGUALES A LOS QUE HAY
    if (modifyStock < 0 || modifyStock == modificateProduct.Stock) {
      Swal.fire({
        icon: "error",
        title: "STOCK NO VÁLIDO",
        timer: 2000,
      });
    } else {
      refreshStock(modificateProductId, modifyStock);
    }
  };

  const functionmodifyName = (modificateProductId, modifyName) => {
    //SI LOS DATOS SON INVALIDOS O IGUALES A LOS QUE HAY
    if (modifyName == null || modifyName == modificateProduct.Nombre) {
      Swal.fire({
        icon: "error",
        title: "NOMBRE NO VÁLIDO",
        timer: 2000,
      });
    } else {
      refreshName(modificateProductId, modifyName);
    }
  };

  const functionmodifySabor = (modificateProductId, modifySabor) => {
    //SI LOS DATOS SON INVALIDOS O IGUALES A LOS QUE HAY
    if (modifySabor == null || modifySabor == modificateProduct.Sabor) {
      Swal.fire({
        icon: "error",
        title: "SABOR NO VÁLIDO",
        timer: 2000,
      });
    } else {
      refreshSabor(modificateProductId, modifySabor);
    }
  };

  const functionmodifyCode = (modificateProductId, modifyCode) => {
    //SI LOS DATOS SON INVALIDOS O IGUALES A LOS QUE HAY
    if (modifyCode == null || modifyCode == modificateProduct.Codigo) {
      Swal.fire({
        icon: "error",
        title: "CODIGO NO VÁLIDO",
        timer: 2000,
      });
    } else {
      refreshCode(modificateProductId, modifyCode);
    }
  };

  return (
    <div className="divGeneral">
      <Link to={"/stock"}>
        <button className="Button-Back">ATRAS</button>
      </Link>
      <label style={{ marginBottom: "40px", backgroundColor: "white" }}>
        MODIFICAR PRODUCTO
      </label>

      <div className="container">
        <div className="left">
          <div className="divCard">
            <Card
              sx={{
                maxWidth: 345,
                height: "auto",
                borderColor: "black",
                borderRadius: "30px",
                borderStyle: "solid",
              }}
            >
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
            </Card>
          </div>
        </div>
        <div className="right">
          <div className="gridOptions">
            <TextField
              className="InputOption"
              id="ModifyNombre"
              label="Nuevo Nombre"
              type="text"
              onChange={HandleInputChangeName}
            />
            <Button
              variant="contained"
              color="success"
              onClick={() =>
                functionmodifyName(modificateProduct.id, modifyName)
              }
            >
              MODIFICAR NOMBRE
            </Button>
            <TextField
              className="InputOption"
              id="ModifySabor"
              label="Nuevo Sabor"
              type="text"
              onChange={HandleInputChangeSabor}
            />
            <Button
              variant="contained"
              color="success"
              onClick={() =>
                functionmodifySabor(modificateProduct.id, modifySabor)
              }
            >
              MODIFICAR SABOR
            </Button>
            <TextField
              className="InputOption"
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
              className="InputOption"
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
            <TextField
              className="InputOption"
              id="ModifyCode"
              label="Nuevo Codigo"
              type="number"
              onChange={HandleInputChangeCode}
            />
            <Button
              variant="contained"
              color="success"
              onClick={() =>
                functionmodifyCode(modificateProduct.id, modifyCode)
              }
            >
              MODIFICAR STOCK
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
