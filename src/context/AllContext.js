import { BDContext } from "./BDContext";
import {
  getFirestore,
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const AllContext = ({ children }) => {
  const [usersList, setUserList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [modificateProduct, setModificateProduct] = useState([]);
  const [modificateUser, setModificateUser] = useState([]);

  const navigate = useNavigate();
  const db = getFirestore();
  const querySnapshotUsuarios = collection(db, "Usuarios");
  const querySnapshotProductos = collection(db, "Productos");

  const getUsuarios = () => {
    //ACCEDER A LOS USER DE LA DB DE FIRESTORE
    getDocs(querySnapshotUsuarios)
      .then((response) => {
        const listUsers = response.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setUserList(listUsers);
      })
      .catch((error) => console.log(error));
  };

  const getProductos = () => {
    getDocs(querySnapshotProductos)
      .then((response) => {
        const listProducts = response.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        listProducts.sort((x, y) => x.Nombre.localeCompare(y.Nombre));
        setProductsList(listProducts);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setTimeout(() => {
      getUsuarios(); //HAGO UN TIMER PARA ALMACENAR LOS DATOS EN EL ARRAY LOCAL
      getProductos();
    }, "1000");
  }, []);

  const deleteUser = (docDelete) => {
    deleteDoc(doc(db, "Usuarios", docDelete)); //ELIMINO EL USUARIO CON EL DOCUMENTO COMPLETO
    Swal.fire({
      icon: "success",
      title: "VENDEDOR ELIMINADO CON EXITO",
      timer: 2000,
    });
    navigate("/admin");
  };

  const modifyUser = (newRut) => {
    updateDoc(doc(db, "Usuarios", modificateUser.id), {
      Rut: parseInt(newRut),
    });
    Swal.fire({
      icon: "success",
      title: "RUT MODIFICADO CON EXITO",
      timer: 2000,
    });
    navigate("/admin");
  };

  const modifyContraseñaUser = (newContraseña) => {
    updateDoc(doc(db, "Usuarios", modificateUser.id), {
      Contraseña: newContraseña,
    });
    Swal.fire({
      icon: "success",
      title: "CONTRASEÑA MODIFICADA CON EXITO",
      timer: 2000,
    });
    navigate("/admin");
  };
  const refreshPrice = (idProduct, newPrice) => {
    updateDoc(doc(db, "Productos", idProduct), {
      Precio: parseInt(newPrice),
    });
    Swal.fire({
      icon: "success",
      title: "PRECIO MODIFICADO CON EXITO",
      timer: 2000,
    });
    navigate("/admin");
  };

  const refreshStock = (idProduct, newStock) => {
    updateDoc(doc(db, "Productos", idProduct), {
      Stock: parseInt(newStock),
    });
    Swal.fire({
      icon: "success",
      title: "STOCK MODIFICADO CON EXITO",
      timer: 2000,
    });

    navigate("/admin");
  };

  const refreshName = (idProduct, newName) => {
    updateDoc(doc(db, "Productos", idProduct), {
      Nombre: newName,
    });
    Swal.fire({
      icon: "success",
      title: "NOMBRE MODIFICADO CON EXITO",
      timer: 2000,
    });
    navigate("/admin");
  };

  const refreshSabor = (idProduct, newSabor) => {
    updateDoc(doc(db, "Productos", idProduct), {
      Sabor: newSabor,
    });
    Swal.fire({
      icon: "success",
      title: "SABOR MODIFICADO CON EXITO",
      timer: 2000,
    });

    navigate("/admin");
  };

  const refreshCode = (idProduct, newCode) => {
    updateDoc(doc(db, "Productos", idProduct), {
      Codigo: parseInt(newCode),
    });
    Swal.fire({
      icon: "success",
      title: "CODIGO MODIFICADO CON EXITO",
      timer: 2000,
    });
    navigate("/admin");
  };

  const refreshImg = (idProduct, newImg) => {
    updateDoc(doc(db, "Productos", idProduct), {
      img: newImg,
    });
    Swal.fire({
      icon: "success",
      title: "IMÁGEN MODIFICADA CON EXITO",
      timer: 2000,
    });

    navigate("/admin");
  };

  const AddStock = (idProduct, newStock, currentStock) => {
    const newStockModify = parseInt(currentStock) + parseInt(newStock);
    updateDoc(doc(db, "Productos", idProduct), {
      Stock: newStockModify,
    });
    Swal.fire({
      icon: "success",
      title: "STOCK MODIFICADO CON EXITO",
      timer: 2000,
    });
    navigate("/admin");
  };

  const deleteProduct = (idProduct) => {
    deleteDoc(doc(db, "Productos", idProduct)); //ELIMINO EL USUARIO CON EL DOCUMENTO COMPLETO
    Swal.fire({
      icon: "success",
      title: "PRODUCTO ELIMINADO CON EXITO",
      timer: 2000,
    });

    navigate("/admin");
  };

  const AddIncome = (MontoIncome, DateIncome) => {
    const Separador = "/";
    const FechaSplit = DateIncome.split(Separador);
    const DiaSplit = parseInt(FechaSplit[0]);
    const MesSplit = parseInt(FechaSplit[1]);
    const AñoSplit = parseInt(FechaSplit[2]);
    const Monto = parseInt(MontoIncome);

    const db = getFirestore();
    const querySnapshot = collection(db, "Ingresos");
    addDoc(querySnapshot, {
      MontoIngreso: Monto,
      Dia: DiaSplit,
      Mes: MesSplit,
      Año: AñoSplit,
    });
  };

  const AddDischarge = (MontoDischarge, DateIncome) => {
    const Separador = "/";
    const FechaSplit = DateIncome.split(Separador);
    const DiaSplit = parseInt(FechaSplit[0]);
    const MesSplit = parseInt(FechaSplit[1]);
    const AñoSplit = parseInt(FechaSplit[2]);
    const Monto = parseInt(MontoDischarge);

    const db = getFirestore();
    const querySnapshot = collection(db, "Egresos");
    addDoc(querySnapshot, {
      MontoEgreso: Monto,
      Dia: DiaSplit,
      Mes: MesSplit,
      Año: AñoSplit,
    });
  };

  return (
    <BDContext.Provider
      value={{
        usersList,
        getUsuarios,
        deleteUser,
        modifyUser,
        modifyContraseñaUser,
        modificateUser,
        setModificateUser,
        productsList,
        setProductsList,
        getProductos,
        refreshPrice,
        refreshStock,
        refreshName,
        refreshSabor,
        refreshCode,
        refreshImg,
        modificateProduct,
        setModificateProduct,
        AddStock,
        deleteProduct,
        AddIncome,
        AddDischarge,
      }}
    >
      {children}
    </BDContext.Provider>
  );
};
