import "./ReceptionStock.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export const ReceptionStock = () => {
  const [datosInput, setDatosInput] = useState({
    codigoProducto: "",
    cantidad: "",
  });

  const HandleInputChange = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setDatosInput({
      ...datosInput,
      [event.target.name]: event.target.value,
    });
  };

  const sendReception = (event) => {
    event.preventDefault();

    console.log(datosInput);
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
            AÑADIR PRODUCTO
          </button>
        </form>
      </div>
    </div>
  );
};
