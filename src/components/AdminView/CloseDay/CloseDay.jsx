import "./CloseDay.css";
import { Link } from "react-router-dom";
export const CloseDay = () => {
  return (
    <div>
      <Link to={"/admin"}>
        <button className="Button-Back">ATRAS</button>
      </Link>
    </div>
  );
};
