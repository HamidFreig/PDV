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
  const [vendedorActivo, setVendedorActivo] = useState("");
  const [ingresos, setIngresos] = useState([]);
  const [egresos, setEgresos] = useState([]);
  const [modificateProduct, setModificateProduct] = useState([]);
  const [modificateUser, setModificateUser] = useState([]);
  const [aperturas, setAperturas] = useState([]);
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();
  const db = getFirestore();
  const querySnapshotUsuarios = collection(db, "Usuarios");
  const querySnapshotProductos = collection(db, "Productos");
  const querySnapshotIngresos = collection(db, "Ingresos");
  const querySnapshotEgresos = collection(db, "Egresos");
  const querySnapshotAperturas = collection(db, "Aperturas");

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
      getIngresos();
      getEgresos();
      getAperturas();
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

  const AddIncome = (MontoIncome, DateIncome, TimeIncome, Comment) => {
    const SeparadorDia = "/";
    const FechaSplit = DateIncome.split(SeparadorDia);
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
      Hora: TimeIncome,
      Comentario: Comment,
    });
  };

  const AddDischarge = (MontoDischarge, DateIncome, TimeDischarge, Comment) => {
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
      Hora: TimeDischarge,
      Comentario: Comment,
    });
  };

  const getIngresos = () => {
    getDocs(querySnapshotIngresos)
      .then((response) => {
        const ingresos = response.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setIngresos(ingresos);
      })
      .catch((error) => console.log(error));
  };

  const getEgresos = () => {
    getDocs(querySnapshotEgresos)
      .then((response) => {
        const egresos = response.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setEgresos(egresos);
      })
      .catch((error) => console.log(error));
  };

  const getAperturas = () => {
    getDocs(querySnapshotAperturas)
      .then((response) => {
        const aperturas = response.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setAperturas(aperturas);
      })
      .catch((error) => console.log(error));
  };

  const flagApertura = (fechaActual) => {
    //BANDERA PARA SABER SI SE REALIZÓ EL APERTURA DE CAJA EN EL DIA DE HOY
    console.log(aperturas);
    const flag = aperturas.some((dato) => dato.Fecha == fechaActual);
    console.log(flag);
    return flag;
  };

  const addApertura = (MontoApertura, FechaApertura, HoraApertura) => {
    if (flagApertura(FechaApertura)) {
      navigate("/");
      Swal.fire({
        icon: "error",
        title: "APERTURA YA REALIZADA",
        timer: 2000,
      });
    } else {
      const db = getFirestore();
      const querySnapshot = collection(db, "Aperturas");
      addDoc(querySnapshot, {
        MontoApertura: MontoApertura,
        Fecha: FechaApertura,
        Hora: HoraApertura,
      });
      navigate("/");
      Swal.fire({
        icon: "success",
        title: "APERTURA REALIZADA CON EXITO",
        timer: 2000,
      });
    }
  };

  const montoCart = () => {
    const montocarro = cart.reduce(
      (acc, curr) => acc + curr.CantidadProducto * curr.PrecioProducto,
      0
    );

    return montocarro;
  };

  const Cart = (producto, cantidad) => {
    if (ExistProduct(producto.Codigo)) {
      //SI EXISTE SOLO LE MODIFICO LA CANTIDAD
      cart.map((productoExist) => {
        if (producto.Codigo == productoExist.CodigoProducto) {
          productoExist.CantidadProducto =
            productoExist.CantidadProducto + parseInt(cantidad);
        }
      });
    } else {
      //SI NO EXISTE, LO AGREGO

      setCart([
        ...cart,
        {
          idProducto: producto.id,
          CodigoProducto: parseInt(producto.Codigo),
          NombreProducto: producto.Nombre,
          SaborProducto: producto.Sabor,
          CantidadProducto: parseInt(cantidad),
          PrecioProducto: parseInt(producto.Precio),
        },
      ]);
    }
  };

  const verifyStock = (producto, cantidad) => {
    const StockProductoCart = cart.find(
      // ENCUENTRO EL PRODUCTO DEL CARRITO
      (dato) => dato.CodigoProducto == producto.Codigo
    );

    const StockProducto = productsList.find(
      //ENCUENTRO EL PRODUCTO EN LA LISTA DE PRODUCTOS
      (dato) => dato.Codigo == producto.Codigo
    );

    if (StockProductoCart == undefined) {
      //SI NO EXISTE EN EL CARRITO, LE ASIGNO 0 IMPLICITAMENTE PQ SI TIRO NO TIRA UNDEFINED Y LA OPERACION SE HACE NaN
      if (parseInt(cantidad) > StockProducto.Stock) {
        //SI LA CANTIDAD A COMPRAR SUPERA EL STOCK LA OPERACIÓN NO SE RELIZA
        return false;
      } else {
        return true;
      }
    } else {
      if (
        parseInt(cantidad) + StockProductoCart.CantidadProducto >
        StockProducto.Stock
        //SI LA CANTIDAD A COMPRAR SUPERA EL STOCK LA OPERACIÓN NO SE RELIZA
      ) {
        return false;
      } else {
        return true;
      }
    }
  };

  const ExistProduct = (CodigoProducto) => {
    //SI EXISTE EL PRODUCTO EN EL CARRITO
    if (cart.some((product) => CodigoProducto == product.CodigoProducto)) {
      return true;
    } else {
      return false;
    }
  };

  const removeProduct = (productCode) => {
    //ELIMINO EL PRODUCTO FILTRANDO TODOS MENOS ESE
    const newCart = cart.filter(
      (product) => product.CodigoProducto != productCode
    );
    setCart(newCart);
  };

  const cleanCart = () => {
    //LIMPIAR CARRITO
    setCart([]);
  };

  const refreshStockProductos = () => {
    const g = productsList.map((products) => {
      cart.map((dato) => {
        if (dato.idProducto == products.id) {
          //BUSCO COINCIDENCI ENTRE LOS PRODUCTOS DE LA TIENDA CON EL CARRITO
          const id = dato.idProducto;
          updateDoc(doc(db, "Productos", id), {
            //PARA ACTUALIZAR EL STOCK RESTANDOLE LOS PRODUCTOS QUE SE REGISTRARON EN LA VENTA
            Stock: parseInt(products.Stock) - parseInt(dato.CantidadProducto),
          });
        }
      });
    });
  };
  const addSale = (
    hora,
    fecha,
    montoCarrito,
    montoEfecivo,
    montoDebito,
    montoCredito
  ) => {
    //REFRESCO EL STOCK EN LA BD ANTES DE GENERAR LA VENTA
    refreshStockProductos();

    const Separador = "/";
    const FechaSplit = fecha.split(Separador);
    const DiaSplit = parseInt(FechaSplit[0]);
    const MesSplit = parseInt(FechaSplit[1]);
    const AñoSplit = parseInt(FechaSplit[2]);

    //AGREGO TODA LA INFO A LA BASE DE DATOS
    const db = getFirestore();
    const querySnapshot = collection(db, "Ventas");
    addDoc(querySnapshot, {
      Fecha: {
        Dia: DiaSplit,
        Mes: MesSplit,
        Año: AñoSplit,
      },
      Hora: hora,
      MontoTotal: parseInt(montoCarrito),
      MontoEfectivo: parseInt(montoEfecivo),
      MontoDebito: parseInt(montoDebito),
      MontoCredito: parseInt(montoCredito),
      Productos: cart.map((product) => {
        return {
          CantidadProducto: product.CantidadProducto,
          IdProducto: product.idProducto,
          NombreProducto: product.NombreProducto,
          PrecioProducto: product.PrecioProducto,
        };
      }),
      Vendedor: vendedorActivo,
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <BDContext.Provider
      value={{
        vendedorActivo,
        setVendedorActivo,
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
        ingresos,
        getIngresos,
        egresos,
        getEgresos,
        addApertura,
        getAperturas,
        flagApertura,
        Cart,
        cart,
        verifyStock,
        removeProduct,
        addSale,
        cleanCart,
      }}
    >
      {children}
    </BDContext.Provider>
  );
};
