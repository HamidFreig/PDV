import { Link } from "react-router-dom";
import "./ReceptionStock.css";

export const ReceptionStock = () => {
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
        RECEPCION DE MERCADERIA
      </label>

      <div></div>
    </div>
  );
};
