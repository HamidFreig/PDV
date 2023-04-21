import "./LoginView.css";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LoginView = () => {
  const navigate = useNavigate();
  const [usersList, setUserList] = useState([]);
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

  const getUsuarios = () => {
    //ACCEDER A LOS USER DE LA DB DE FIRESTORE
    const db = getFirestore();
    const querySnapshot = collection(db, "Usuarios");
    getDocs(querySnapshot)
      .then((response) => {
        const listUsers = response.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setUserList(listUsers);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setTimeout(() => {
      getUsuarios(); //HAGO UN TIMER PARA ALMACENAR LOS DATOS EN EL ARRAY LOCAL
    }, "2000");
  }, []);

  const authUser = (event) => {
    //AUTENTIFICACIÓN DE LOS USUARIOS
    event.preventDefault();

    if (datosInput.rut === "" || datosInput.passw === "") {
      //SI LOS CAMPOS DEL LOGIN NO ESTAN COMPLETOS NO ACCEDE A LA AUNTETIFICACIÓN
      alert("COMPLETE TODOS LOS CAMPOS");
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
        alert("DATOS NO REGISTRADOS EN LA BASE DE DATOS");
        window.location.reload();
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
              placeholder="CONTRASEÑA"
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
