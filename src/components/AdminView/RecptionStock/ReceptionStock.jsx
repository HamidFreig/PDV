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

  const HandleInputChange = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setDatosInput({
      ...datosInput,
      [event.target.name]: event.target.value,
    });
  };

  const sendReception = (event) => {
    event.preventDefault();

    const objeto = productsList.find(
      (producto) => producto.Codigo == datosInput.codigoProducto
    );
    setCurrentStock(objeto.Stock);

    if (datosInput.codigoProducto == "" || datosInput.cantidad == "") {
      //SI LOS CAMPOS NO ESTAN COMPLETOS TIRA ERROR
      Swal.fire({
        icon: "error",
        title: "COMPLETE TODOS LOS CAMPOS",
        timer: 2000,
      });
    } else if (
      productsList.some((dato) => {
        //VALIDACION SI EXISTE EL CODIGO EN LA BD
        if (dato.Codigo == datosInput.codigoProducto) {
          setCurrentStock(dato.Stock);
          console.log(currentStock);
          AddStock(dato.id, datosInput.cantidad, currentStock);
          return true;
        } //ACA QUEDE, NO ME ESTA TOMANDO EL STOCK EXISTENTE
      })
    ) {
    } else {
      Swal.fire({
        icon: "error",
        title: "CODIGO INEXISTENTE",
        timer: 2000,
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
      <div className="containerReception">
        <form>
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
