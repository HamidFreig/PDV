import { useNavigate, Link } from "react-router-dom";
import { BDContext } from "../../../context/BDContext";
import { useContext } from "react";
import "./AdminView.css";

export const AdminView = () => {
  const navigate = useNavigate();
  const { getUsuarios, getProductos } = useContext(BDContext);

  const ButtonOut = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/vector-premium/patron-isometrico-costuras-cubos-linea-delgada_659980-2.jpg")`,
        height: "auto",
      }}
    >
      <button className="Button-Out" onClick={ButtonOut}>
        SALIR
      </button>
      <label style={{ backgroundColor: "white" }}>
        PANEL DEL ADMINISTRADOR
      </label>
      <div className="Container">
        <div className="Grid-Buttons">
          <Link to={"/createUser"}>
            <button
              className="Button"
              onClick={() => {
                getUsuarios();
              }}
            >
              CREAR VENDEDOR
            </button>
          </Link>
          <Link to={"/deleteUser"}>
            <button
              className="Button"
              onClick={() => {
                getUsuarios();
              }}
            >
              EDITAR VENDEDOR
            </button>
          </Link>
          <Link to={"/stock"}>
            <button
              className="Button"
              onClick={() => {
                getProductos();
              }}
            >
              STOCK
            </button>
          </Link>
          <Link to={"/reception"}>
            <button
              className="Button"
              onClick={() => {
                getProductos();
              }}
            >
              RECEPCIÓN DE MERCADERIA
            </button>
          </Link>

          <button className="Button">LIBRO DE VENTAS</button>
        </div>
      </div>
    </div>
  );
};
