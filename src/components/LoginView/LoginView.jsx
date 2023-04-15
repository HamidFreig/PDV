import "./LoginView.css";
import { AdminView } from "../AdminView/AdminView";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";

export const LoginView = () => {
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
    //AUTNETIFICACIÓN DE LOS USUARIOS
    event.preventDefault();

    const map = usersList.map((userBd) => {
      if (userBd.Rut == datosInput.rut) {
        redirect(userBd.TipoUsuario);
      }
    });
  };

  const redirect = (TipoUser) => {
    if (TipoUser == "Admin") {
      console.log("sdaf"); //aca quede
      <AdminView />;
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://images7.alphacoders.com/374/374296.jpg")`,
      }}
    >
      <div className="login-container">
        <form>
          <h1>Iniciar sesión</h1>
          <div className="form-group">
            <label name="rut">Rut</label>
            <input id="rut" name="rut" onChange={HandleInputChange} required />
          </div>
          <div className="form-group">
            <label name="password">Password</label>
            <input
              type="password"
              id="passw"
              name="passw"
              onChange={HandleInputChange}
              required
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
