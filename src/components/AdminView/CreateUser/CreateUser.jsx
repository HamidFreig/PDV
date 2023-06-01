import { useState, useContext } from "react";
import "./CreateUser.css";
import { Link, useNavigate } from "react-router-dom";
import { BDContext } from "../../../context/BDContext";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";

export const CreateUser = () => {
  const navigate = useNavigate();
  const { usersList } = useContext(BDContext);
  const [datosInput, setDatosInput] = useState({
    nombre: "",
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
      Swal.fire({
        icon: "error",
        title: "COMPLETE TODOS LOS CAMPOS",
        timer: 2000,
      });
    } else if (datosInput.rut.length < 8 || datosInput.rut.length > 9) {
      //VALIDACION QUE EL RUT TENGA 8 O 9 CARÁCTERES
      Swal.fire({
        icon: "error",
        title: "RUT INVÁLIDO",
        timer: 2000,
      });
    } else if (
      usersList.some((dato) => {
        //VALIDACION SI EXISTE EL RUT YA REGISTRADO EN LA BD
        if (dato.Rut == datosInput.rut) {
          return true;
        }
      })
    ) {
      Swal.fire({
        icon: "error",
        title: "RUT EXISTENTE",
        timer: 2000,
      });
    } else {
      //INSTANCIO LA DB E INGRESO LOS DATOS DE LOS INPUTS TRAS LA EXITOSA VALIDACIÓN

      const db = getFirestore();
      const querySnapshot = collection(db, "Usuarios");
      addDoc(querySnapshot, {
        Nombre: datosInput.nombre,
        Rut: datosInput.rut,
        Contraseña: datosInput.passw,
        TipoUsuario: "Vendedor",
      });
      Swal.fire({
        icon: "success",
        title: "VENDEDOR CREADO CON EXITO",
        timer: 2000,
      });
      navigate("/admin");
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
        CREAR VENDEDOR
      </label>
      <div className="container">
        <form>
          <div className="form-row">
            <label type="text">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              onChange={HandleInputChange}
            />
          </div>
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
            Crear Vendedor
          </button>
        </form>
      </div>
    </div>
  );
};
