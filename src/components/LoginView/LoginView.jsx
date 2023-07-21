import "./LoginView.css";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BDContext } from "../../context/BDContext";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";

export const LoginView = () => {
  const navigate = useNavigate();
  const {
    usersList,
    getProductos,
    getAperturas,
    setVendedorActivo,
    flagApertura,
    getVentas,
    getIngresos,
    getEgresos,
    getCierres,
    flagCierres,
  } = useContext(BDContext); //ACCEDO A LA BD MEDIANTE CONTEXT

  const [datosInput, setDatosInput] = useState({
    rut: "",
    passw: "",
  });

  const [fechaActual, setfechaActual] = useState(
    new Date().toLocaleDateString()
  );

  const HandleInputChange = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setDatosInput({
      ...datosInput,
      [event.target.name]: event.target.value,
    });
  };

  const authUser = (event) => {
    //AUTENTIFICACIÓN DE LOS USUARIOS
    event.preventDefault();

    if (datosInput.rut === "" || datosInput.passw === "") {
      //SI LOS CAMPOS DEL LOGIN NO ESTAN COMPLETOS NO ACCEDE A LA AUNTETIFICACIÓN
      Swal.fire({
        icon: "error",
        title: "COMPLETE TODOS LOS DATOS",
      });
    } else {
      const findUser = usersList.find((datos) => {
        // VEO SI EL USUARIO SE ENCUENTRA REGISTRADO EN LA BD
        if (
          datos.Rut == datosInput.rut &&
          datos.Contraseña == datosInput.passw
        ) {
          return true;
        }
      });

      if (findUser == null) {
        Swal.fire({
          icon: "error",
          title: "USUARIOS Y/O CONTRASEÑA INCORRECTA",
          timer: 2000,
        });
      } else {
        getAperturas();
        getCierres();
        redirectPage(findUser);
      }
    }
  };

  const redirectPage = (userLogin) => {
    setTimeout(() => {
      if (userLogin.TipoUsuario === "Admin") {
        navigate("/admin");
      } else if (userLogin.TipoUsuario === "Vendedor") {
        if (flagApertura(fechaActual) && !flagCierres(fechaActual)) {
          getProductos();
          getEgresos();
          getIngresos();
          getVentas();
          setVendedorActivo(datosInput.rut);
          navigate("/pos");
        } else {
          Swal.fire({
            icon: "error",
            title: "DEBE REALIZAR APERTURA ANTES DE REALIZAR VENTAS",
            timer: 2000,
          });
        }
      }
    }, 1000);
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/vector-gratis/fondo-monocromatico-blanco-estilo-papel_52683-66443.jpg?w=2000")`,
      }}
    >
      <div className="login-container">
        <form>
          <h1>INICIAR SESIÓN</h1>

          <div className="form-group">
            <TextField
              className="Input"
              id="rut"
              name="rut"
              type="number"
              label="Ej:123456789"
              onChange={HandleInputChange}
            />
          </div>
          <div className="form-group">
            <TextField
              className="Input"
              label="Contraseña"
              type="password"
              id="passw"
              name="passw"
              onChange={HandleInputChange}
              autoComplete="current-password"
            />
          </div>
          <button className="ButtonLogin" type="submit" onClick={authUser}>
            Ingresar
          </button>
        </form>
      </div>
      <footer>
        <label className="footercontainer">Copyright © 2023 HAMID FREIG</label>
      </footer>
    </div>
  );
};
