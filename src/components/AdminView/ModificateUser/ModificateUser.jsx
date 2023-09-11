import "./ModificateUser.css";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { BDContext } from "../../../context/BDContext";
import Swal from "sweetalert2";

//MUI
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export const ModificateUser = () => {
  const { modificateUser, modifyUser, modifyContraseñaUser, modifyNombre, usersList } =
    useContext(BDContext);
  const [modifyRut, setModifyRut] = useState(modificateUser.Rut);
  const [modifyContraseña, setModifyContraseña] = useState(
    modificateUser.Contraseña
  );
  const [modifyName, setModifyName] = useState(
    modificateUser.Nombre
  );

  const HandleInputChangeRut = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setModifyRut(event.target.value);
  };

  const HandleInputChangeContraseña = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setModifyContraseña(event.target.value);
  };

  const HandleInputChangeName = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setModifyName(event.target.value);
  };


  const functionModifyRut = (modifyRut) => {
    if (
      modifyRut == modificateUser.Rut ||
      modifyRut.length == 0 ||
      modifyRut.length < 8 ||
      modifyRut.length > 9
    ) {
      Swal.fire({
        icon: "error",
        title: "RUT NO VÁLIDO",
        timer: 2000,
      });
    } else if (
      usersList.some((dato) => {
        //VALIDACION SI EXISTE EL RUT YA REGISTRADO EN LA BD
        if (dato.Rut == modifyRut) {
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
      modifyUser(modifyRut);
    }
  };

  const functionModifyContraseña = (modifyContraseña) => {
    if (
      modifyContraseña == modificateUser.Contraseña ||
      modificateUser.length == 0
    ) {
      Swal.fire({
        icon: "error",
        title: "CONTRASEÑA INVÁLIDA",
        timer: 2000,
      });
    } else {
      modifyContraseñaUser(modifyContraseña);
    }
  };

  const functionModifyName = (modifyName) => {
    if (
      modifyName == modificateUser.Nombre ||
      modificateUser.length == 0
    ) {
      Swal.fire({
        icon: "error",
        title: "NOMBRE INVÁLIDO",
        timer: 2000,
      });
    } else {
      modifyNombre(modifyName);
    }
  };

  

  return (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/vector-premium/patron-isometrico-costuras-cubos-linea-delgada_659980-2.jpg")`,
        height: "100vh",
      }}
    >
      <Link to={"/deleteUser"}>
        <button className="Button-Back">ATRAS</button>
      </Link>
      <label style={{ marginBottom: "70px", backgroundColor: "white" }}>
        MODIFICAR VENDEDOR
      </label>

      <div className="containerUser">
        <div className="izq">
          <div className="CardUser">
            <label>RUT: {modificateUser.Rut} </label>
            <label>RUT: {modificateUser.Nombre} </label>
            <label>CONTRASEÑA: {modificateUser.Contraseña} </label>
          </div>
        </div>
        <div className="der">
          <div className="gridOptions">
            <TextField
              className="InputOption"
              id="ModifyRut"
              label="Nuevo Rut"
              type="number"
              onChange={HandleInputChangeRut}
            />
            <Button
              variant="contained"
              color="success"
              onClick={() => functionModifyRut(modifyRut)}
            >
              MODIFICAR RUT
            </Button>
            <TextField
              className="InputOption"
              id="ModifyName"
              label="Nuevo Nombre"
              type="text"
              onChange={HandleInputChangeName}
            />
            <Button
              variant="contained"
              color="success"
              onClick={() => functionModifyName(modifyName)}
            >
              MODIFICAR NOMBRE
            </Button>

            <TextField
              className="InputOption"
              id="ModifyContraseña"
              label="Nuevo Contraseña"
              type="text"
              onChange={HandleInputChangeContraseña}
            />
            <Button
              variant="contained"
              color="success"
              onClick={() => functionModifyContraseña(modifyContraseña)}
            >
              MODIFICAR CONTRASEÑA
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
