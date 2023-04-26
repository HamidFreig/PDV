import { useNavigate, Link } from "react-router-dom";
import { BDContext } from "../../context/BDContext";
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
        backgroundImage: `url("https://www.suretiimf.com/wp-content/uploads/2020/06/pattern-background-png-4.png")`,
      }}
    >
      <button className="Button-Out" onClick={ButtonOut}>
        SALIR
      </button>
      <label>PANEL DEL ADMINISTRADOR</label>
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
              ELIMINAR VENDEDOR
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

          <button className="Button">LIBRO DE VENTAS</button>
        </div>
      </div>
    </div>
  );
};
