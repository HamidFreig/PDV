import { Link } from "react-router-dom";
import "./DeleteUser.css";
export const DeleteUser = () => {
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
      <label style={{ marginBottom: "70px" }}> ELIMINAR VENDEDOR</label>
    </div>
  );
};
