import "./LoginView.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BDContext } from "../../context/BDContext";
import Swal from "sweetalert2";

export const LoginView = () => {
  const navigate = useNavigate();
  const { usersList } = useContext(BDContext); //ACCEDO A LA BD MEDIANTE CONTEXT

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
      navigate("/admin");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://media.istockphoto.com/id/1204639651/es/vector/patr%C3%B3n-y-fondo-sin-costuras-de-marketplace-en-l%C3%ADnea-con-iconos-de-l%C3%ADnea.jpg?s=170667a&w=0&k=20&c=yH5lylWWBVEkmUvuuMJRsIHN1-FKF0_puwi-Sfp1FBw=")`,
      }}
    >
      <div className="login-container">
        <form>
          <h1>INICIAR SESIÓN</h1>
          <div className="form-group">
            <label className="Tittle">RUT</label>
            <input
              id="rut"
              name="rut"
              type="number"
              placeholder="EJEMPLO: 123456789"
              onChange={HandleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="Tittle">CONTRASEÑA</label>
            <input
              type="password"
              id="passw"
              name="passw"
              onChange={HandleInputChange}
            />
          </div>
          <button type="submit" onClick={authUser}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};
