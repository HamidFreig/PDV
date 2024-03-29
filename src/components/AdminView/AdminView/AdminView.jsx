import { useNavigate, Link } from "react-router-dom";
import { BDContext } from "../../../context/BDContext";
import { useContext, useState } from "react";
import { ModalOpenDay } from "../ModalOpenDay/ModalOpenDay";
import Swal from "sweetalert2";
import "./AdminView.css";

export const AdminView = () => {
  const navigate = useNavigate();
  const {
    getUsuarios,
    getProductos,
    getIngresos,
    getEgresos,
    getAperturas,
    getVentas,
    flagApertura,
    flagCierres,
  } = useContext(BDContext);

  const [modalOpenDay, setmodalOpenDay] = useState(false);
  const [fechaActual, setfechaActual] = useState(
    new Date().toLocaleDateString()
  );
  const [disableOpenDay, setdisableOpenDay] = useState(false);

  const ButtonOut = () => {
    navigate("/");
  };

  const viewModalOpen = () => {
    getAperturas();
    setmodalOpenDay(!modalOpenDay);
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/vector-premium/patron-isometrico-costuras-cubos-linea-delgada_659980-2.jpg")`,
        height: "auto",
      }}
    >
      <button
        className="Button-Out"
        onClick={() => {
          navigate("/");
          localStorage.clear();
        }}
      >
        SALIR
      </button>
      <label style={{ backgroundColor: "white" }}>
        PANEL DEL ADMINISTRADOR
      </label>

      {!flagApertura(fechaActual) ? (
        <label style={{ backgroundColor: "yellow" }}>NO ABIERTO</label>
      ) : flagApertura(fechaActual) && !flagCierres(fechaActual) ? (
        <label style={{ backgroundColor: "green" }}>ABIERTO</label>
      ) : (
        <label style={{ backgroundColor: "red" }}>DIA CERRADO</label>
      )}
      <div className="Container">
        <div className="Grid-OpenClose">
          <button
            disabled={disableOpenDay}
            className="Button-Open"
            onClick={() => viewModalOpen()}
          >
            ABRIR DÍA
          </button>
          {modalOpenDay ? <ModalOpenDay /> : null}
          <button
            onClick={() => {
              if (flagApertura(fechaActual) && !flagCierres(fechaActual)) {
                getEgresos();
                getIngresos();
                getVentas();
                navigate(`/closeDay`);
              } else {
                Swal.fire({
                  icon: "error",
                  title: "DEBE REALIZAR APERTURA ANTES DE CERRAR CAJA",
                  timer: 2000,
                });
              }
            }}
            className="Button-Close"
          >
            CERRAR DIA
          </button>
        </div>

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

          <Link to={"/report"}>
            <button
              className="Button"
              onClick={() => {
                getIngresos();
                getEgresos();
                getVentas();
              }}
            >
              REPORTES
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
