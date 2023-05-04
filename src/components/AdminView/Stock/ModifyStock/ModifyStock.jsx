import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { BDContext } from "../../../../context/BDContext";
import "./ModifyStock.css";
//MATERIAL MUI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const ModifyStock = () => {
  const { modificateProduct } = useContext(BDContext);

  return (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/vector-premium/patron-isometrico-costuras-cubos-linea-delgada_659980-2.jpg")`,
        height: "100vh",
      }}
    >
      <Link to={"/stock"}>
        <button className="Button-Back">ATRAS</button>
      </Link>
      <label style={{ marginBottom: "70px", backgroundColor: "white" }}>
        MODIFICAR PRODUCTO
      </label>
      <div className="divCard">
        <Card sx={{ maxWidth: 345 }}>
          <img src={modificateProduct.img} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              NOMBRE PRODUCTO: {modificateProduct.Nombre.toUpperCase()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              SABOR: {modificateProduct.Sabor.toUpperCase()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              FABRICANTE: {modificateProduct.Fabricante.toUpperCase()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              PRECIO: {modificateProduct.Precio}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              STOCK: {modificateProduct.Stock}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="success">
              MODIFICAR PRECIO
            </Button>
            <Button variant="contained" color="success">
              MODIFICAR STOCK
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};
