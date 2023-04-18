import "./LoginView.css";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";

export const LoginView = () => {
  const navigate = useNavigate();
  const [usersList, setUserList] = useState([]);
  const [access, setAccess] = useState(false);
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
    const mapLogin = usersList.map((datos) => {
      if (datos.Rut == datosInput.rut) {
        if (datos.Contraseña == datosInput.passw) {
          redirectPage(datos.TipoUsuario);
        }
      } //ACA QUEDE
    });
  };

  const redirectPage = (TipoUser) => {
    if (TipoUser == "Admin") {
      navigate("/admin");
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
          <button onClick={authUser}>Ingresar</button>
        </form>
      </div>
    </div>
  );
};
