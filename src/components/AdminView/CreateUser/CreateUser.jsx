import { useState } from "react";
import "./CreateUser.css";
import { Link, useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export const CreateUser = () => {
  const navigate = useNavigate();
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

  const SendUser = (event) => {
    event.preventDefault();

    if (datosInput.rut === "" || datosInput.passw === "") {
      //SI LOS CAMPOS DEL CREAR USUARIO NO ESTAN COMPLETOS NO GUARDA EL USUARIO EN LA BD
      alert("COMPLETE TODOS LOS CAMPOS");
    } else if (datosInput.rut.length < 8 || datosInput.rut.length > 9) {
      //VALIDACION QUE EL RUT TENGA 8 O 9 CARÁCTERES
      alert("RUT INVALIDO");
    } else {
      //INSTANCIO LA DB E INGRESO LOS DATOS DE LOS INPUTS TRAS LA EXITOSA VALIDACIÓN

      const db = getFirestore();
      const querySnapshot = collection(db, "Usuarios");
      addDoc(querySnapshot, {
        Rut: datosInput.rut,
        Contraseña: datosInput.passw,
        TipoUsuario: "Vendedor",
      });
      alert("USUARIO CREADO CON EXITO");
      navigate("/admin");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://www.suretiimf.com/wp-content/uploads/2020/06/pattern-background-png-4.png")`,
        height: "100vh",
      }}
    >
      <Link to={"/admin"}>
        <button className="Button-Back">ATRAS</button>
      </Link>
      <label style={{ marginBottom: "70px" }}> CREAR VENDEDOR</label>
      <div className="container">
        <form>
          <div className="form-row">
            <label type="number">Rut</label>
            <input
              type="number"
              id="rut"
              name="rut"
              onChange={HandleInputChange}
            />
          </div>
          <div className="form-row">
            <label type="text">Contraseña</label>
            <input
              type="text"
              id="passw"
              name="passw"
              onChange={HandleInputChange}
            />
          </div>
          <button className="Button-Submit" type="submit" onClick={SendUser}>
            Crear Usuario
          </button>
        </form>
      </div>
    </div>
  );
};