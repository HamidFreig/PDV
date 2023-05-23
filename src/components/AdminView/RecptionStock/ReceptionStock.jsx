import "./ReceptionStock.css";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { BDContext } from "../../../context/BDContext";
import Swal from "sweetalert2";

export const ReceptionStock = () => {
  const { productsList, AddStock } = useContext(BDContext);
  const [datosInput, setDatosInput] = useState({
    codigoProducto: 0,
    cantidad: 0,
  });

  const [currentStock, setCurrentStock] = useState(0);
  const [productAdd, setProductAdd] = useState({});

  const HandleInputChange = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setDatosInput({
      ...datosInput,
      [event.target.name]: event.target.value,
    });
  };

  const sendReception = (event) => {
    event.preventDefault();

    if (datosInput.codigoProducto == "" || datosInput.cantidad == "") {
      //SI LOS CAMPOS NO ESTAN COMPLETOS TIRA ERROR
      Swal.fire({
        icon: "error",
        title: "COMPLETE TODOS LOS CAMPOS",
        timer: 2000,
      });
    } else if (datosInput.cantidad < 0) {
      Swal.fire({
        icon: "error",
        title: "NO PUEDE HABER UNA CANTIDAD NEGATIVA",
        timer: 2000,
      });
    } else if (
      !productsList.some((dato) => {
        //SI ES QUE EL PRODUCTO NO ESTA EN LA BD
        if (dato.Codigo == datosInput.codigoProducto) {
          return true;
        }
      })
    ) {
      Swal.fire({
        icon: "error",
        title: "CODIGO INEXISTENTE",
        timer: 2000,
      });
    } else {
      productsList.some((dato) => {
        if (dato.Codigo == datosInput.codigoProducto) {
          AddStock(dato.id, datosInput.cantidad, dato.Stock);
        }
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/vector-premium/patron-isometrico-costuras-cubos-linea-delgada_659980-2.jpg")`,
        height: "100vh",
      }}
    >
      <Link to={"/admin"}>
        <button className="Button-Back">ATRAS</button>
      </Link>
      <label style={{ marginBottom: "70px", backgroundColor: "white" }}>
        RECEPCIÓN DE MERCADERIA
      </label>
      <div className="container">
        <form className="Form">
          <div className="form-row">
            <label type="number">CODIGO PRODUCTO</label>
            <input
              type="number"
              id="codigoProducto"
              name="codigoProducto"
              onChange={HandleInputChange}
            />
          </div>
          <div className="form-row">
            <label type="text">CANTIDAD</label>
            <input
              type="number"
              id="cantidad"
              name="cantidad"
              onChange={HandleInputChange}
            />
          </div>
          <button
            className="Button-Submit"
            type="submit"
            onClick={sendReception}
          >
            AÑADIR AL INVENTARIO
          </button>
        </form>
      </div>
    </div>
  );
};
