import "./LoginView.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BDContext } from "../../context/BDContext";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";

export const LoginView = () => {
  const navigate = useNavigate();
  const { usersList, getProductos, getAperturas } = useContext(BDContext); //ACCEDO A LA BD MEDIANTE CONTEXT

  const [datosInput, setDatosInput] = useState({
    rut: "",
    passw: "",
  });

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
        redirectPage(findUser);
      }
    }
  };

  const redirectPage = (userLogin) => {
    if (userLogin.TipoUsuario === "Admin") {
      getAperturas();
      navigate("/admin");
    } else if (userLogin.TipoUsuario === "Vendedor") {
      getProductos();
      navigate("/pos");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/vector-premium/patron-isometrico-costuras-cubos-linea-delgada_659980-2.jpg")`,
        height: "auto",
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
    </div>
  );
};
