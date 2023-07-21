import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { BDContext } from "../../../../context/BDContext";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "./AddProduct.css";

export const AddProduct = () => {
  const { productsList, getProductos } = useContext(BDContext);

  const [datosInputs, setDatosInputs] = useState({
    codigo: 0,
    nombre: "",
    fabricante: "",
    precio: 0,
    sabor: "",
    stock: 0,
    img: "",
  });

  const navigate = useNavigate();
  const HandleInputChange = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setDatosInputs({
      ...datosInputs,
      [event.target.name]: event.target.value,
    });
  };
  const addProduct = () => {
    if (
      datosInputs.codigo == 0 ||
      datosInputs.nombre == null ||
      datosInputs.fabricante == null ||
      datosInputs.precio == 0 ||
      datosInputs.sabor == null ||
      datosInputs.stock == 0 ||
      datosInputs.img == null
    ) {
      Swal.fire({
        icon: "error",
        title: "COMPLETE TODOS LOS DATOS",
        timer: 2000,
      });
    } else if (
      productsList.some((dato) => {
        //VALIDACION SI EXISTE EL RUT YA REGISTRADO EN LA BD
        if (dato.Codigo == datosInputs.codigo) {
          return true;
        }
      })
    ) {
      Swal.fire({
        icon: "error",
        title: "CODIGO DEL PRODUCTO EXISTENTE",
        timer: 2000,
      });
    } else {
      const db = getFirestore();
      const querySnapshot = collection(db, "Productos");
      addDoc(querySnapshot, {
        Codigo: parseInt(datosInputs.codigo),
        Nombre: datosInputs.nombre.toLowerCase(),
        Fabricante: datosInputs.fabricante.toLowerCase(),
        Precio: parseInt(datosInputs.precio),
        Sabor: datosInputs.sabor.toLowerCase(),
        Stock: parseInt(datosInputs.stock),
        img: datosInputs.img,
      });

      Swal.fire({
        icon: "success",
        title: "PRODUCTO AÑADIDO CON EXITO",
        timer: 2000,
      });
      getProductos();
      navigate("/stock");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/vector-premium/patron-isometrico-costuras-cubos-linea-delgada_659980-2.jpg")`,
        minHeight: "100vh",
      }}
    >
      <Link to={"/stock"}>
        <button className="Button-Back">ATRAS</button>
      </Link>
      <label style={{ marginBottom: "40px", backgroundColor: "white" }}>
        AGREGAR PRODUCTO
      </label>
      <div className="containerAddProduct">
        <div className="ContainerForm">
          <div className="group">
            <label className="Tittle">CODIGO DEL PRODUCTO</label>
            <input
              id="codigo"
              name="codigo"
              type="number"
              onChange={HandleInputChange}
            />
          </div>
          <div className="group">
            <label className="Tittle">NOMBRE DEL PRODUCTO</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              onChange={HandleInputChange}
            />
          </div>
          <div className="group">
            <label className="Tittle">SABOR DEL PRODUCTO</label>
            <input
              id="sabor"
              name="sabor"
              type="text"
              onChange={HandleInputChange}
            />
          </div>

          <div className="group">
            <label className="Tittle">FABRICANTE DEL PRODUCTO</label>
            <input
              id="fabricante"
              name="fabricante"
              type="text"
              onChange={HandleInputChange}
            />
          </div>
          <div className="group">
            <label className="Tittle">PRECIO DEL PRODUCTO</label>
            <input
              id="precio"
              name="precio"
              type="number"
              onChange={HandleInputChange}
            />
          </div>
          <div className="group">
            <label className="Tittle">STOCK DEL PRODUCTO</label>
            <input
              id="stock"
              name="stock"
              type="number"
              onChange={HandleInputChange}
            />
          </div>
          <div className="group">
            <label className="Tittle">IMAGEN DEL PRODUCTO</label>
            <input
              id="img"
              name="img"
              type="text"
              placeholder="COPIAR DIRECCIÓN DE IMAGEN"
              onChange={HandleInputChange}
            />
          </div>

          <Button variant="contained" color="success" onClick={addProduct}>
            AÑADIR PRODUDCTO
          </Button>
        </div>
      </div>
    </div>
  );
};
