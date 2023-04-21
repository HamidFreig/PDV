import { useNavigate, Link } from "react-router-dom";

export const AdminView = () => {
  const navigate = useNavigate();

  const ButtonOut = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://www.suretiimf.com/wp-content/uploads/2020/06/pattern-background-png-4.png")`,
      }}
    >
      <button className="Button-Out" onClick={ButtonOut}>
        SALIR
      </button>
      <label>PANEL DEL ADMINISTRADOR</label>
      <div className="Container">
        <div className="Grid-Buttons">
          <Link to={"/createUser"}>
            <button className="Button">CREAR USUARIO</button>
          </Link>
          <button className="Button">ELIMINAR USUARIO</button>
          <button className="Button">MODIFICAR STOCK</button>
          <button className="Button">VENTAS</button>
        </div>
      </div>
    </div>
  );
};
