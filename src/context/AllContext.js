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
  const [fechaActual, setfechaActual] = useState(
    new Date().toLocaleDateString()
  );
  const [usersList, setUserList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [vendedorActivo, setVendedorActivo] = useState("");
  const [ingresos, setIngresos] = useState([]);
  const [egresos, setEgresos] = useState([]);
  const [modificateProduct, setModificateProduct] = useState([]);
  const [modificateUser, setModificateUser] = useState([]);
  const [aperturas, setAperturas] = useState([]);
  const [cart, setCart] = useState([]);
  const [listVentas, setListVentas] = useState([]);
  const [cierres, setCierres] = useState([]);

  const navigate = useNavigate();
  const db = getFirestore();
  const querySnapshotUsuarios = collection(db, "Usuarios");
  const querySnapshotProductos = collection(db, "Productos");
  const querySnapshotIngresos = collection(db, "Ingresos");
  const querySnapshotEgresos = collection(db, "Egresos");
  const querySnapshotAperturas = collection(db, "Aperturas");
  const querySnapshotCierres = collection(db, "Cierres");
  const querySnapshotVentas = collection(db, "Ventas");

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

  const getVentas = () => {
    getDocs(querySnapshotVentas)
      .then((response) => {
        const listVentas = response.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setListVentas(listVentas);
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
      getVentas();
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

  const modifyNombre = (newNombre) => {
    updateDoc(doc(db, "Usuarios", modificateUser.id), {
      Nombre: newNombre,
    });
    Swal.fire({
      icon: "success",
      title: "NOMBRE MODIFICADO CON EXITO",
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

    const flag = aperturas.some((dato) => dato.Fecha == fechaActual);
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
        timer: 3000,
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
    montoCredito,
    necesitaVuelto
  ) => {
    //REFRESCO EL STOCK EN LA BD ANTES DE GENERAR LA VENTA
    refreshStockProductos();
    if (montoEfecivo > montoCarrito) {
      montoEfecivo = montoCarrito;
    }

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
      Vendedor: localStorage.getItem("userRut"),
    }).then((docRef) => {
      if (necesitaVuelto) {
        Swal.fire({
          icon: "success",
          title: `VENTA REALIZADA - ID: ${docRef.id} `,
          text: `EL VUELTO ES DE $${
            parseInt(montoEfecivo) - parseInt(montoCarrito)
          }`,
          confirmButtonText: "Aceptar",
        });
      } else {
        //SI ES QUE NO NECESITA VUELTO
        Swal.fire({
          icon: "success",
          title: `VENTA REALIZADA - ID: ${docRef.id} `,
          confirmButtonText: "Aceptar",
        });
      }
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const addCloseDay = (montoCierre, fechaCierre, horaCierre) => {
    const db = getFirestore();
    const querySnapshot = collection(db, "Cierres");
    addDoc(querySnapshot, {
      MontoCierre: parseInt(montoCierre),
      Fecha: fechaCierre,
      Hora: horaCierre,
    });
  };

  //FUNCION PARA EL CIERRE AUTOMATICO

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      const fechaHoraActual = new Date();
      const partes = fechaHoraActual.toLocaleTimeString().split(":");
      const horas = parseInt(partes[0], 10);
      const minutos = parseInt(partes[1], 10);
      const segundos = parseInt(partes[2], 10);

      if (horas == 23 && minutos == 59 && segundos >= 50) {
        const Separador = "/";
        const FechaSplit = currentDateTime
          .toLocaleDateString()
          .split(Separador);
        const DiaSplit = parseInt(FechaSplit[0]);
        const MesSplit = parseInt(FechaSplit[1]);
        const AñoSplit = parseInt(FechaSplit[2]);

        //FILTRADO DE VENTAS
        const filterVentas = () => {
          const Ventas = listVentas.filter((dato) => {
            return (
              dato.Fecha.Dia == DiaSplit &&
              dato.Fecha.Mes == MesSplit &&
              dato.Fecha.Año == AñoSplit
            );
          });
          return Ventas;
        };

        //FILTRADO DE INGRESOS
        const filterIngresos = () => {
          const Ingresos = ingresos.filter((dato) => {
            return (
              dato.Dia == DiaSplit &&
              dato.Mes == MesSplit &&
              dato.Año == AñoSplit
            );
          });
          return Ingresos;
        };

        //FILTRADO DE EGRESOS
        const filterEgresos = () => {
          const Egresos = egresos.filter((dato) => {
            return (
              dato.Dia == DiaSplit &&
              dato.Mes == MesSplit &&
              dato.Año == AñoSplit
            );
          });
          return Egresos;
        };

        //FILTRADO DE APERTURA
        const filterApertura = () => {
          const Apertura = aperturas.filter((dato) => {
            return dato.Fecha == `${DiaSplit}/${MesSplit}/${AñoSplit}`;
          });
          return Apertura;
        };

        const MontoApertura = filterApertura().reduce(
          (acc, curr) => acc + curr.MontoApertura,
          0
        );
        const MontoVentaEfectivo = filterVentas().reduce(
          (acc, curr) => acc + curr.MontoEfectivo,
          0
        );
        const MontoIngreso = filterIngresos().reduce(
          (acc, curr) => acc + curr.MontoIngreso,
          0
        );
        const MontoEgreso = filterEgresos().reduce(
          (acc, curr) => acc + curr.MontoEgreso,
          0
        );

        if (flagApertura(fechaActual) && !flagCierres(fechaActual)) {
          const MontoCierreAutomatico =
            MontoApertura + MontoVentaEfectivo + MontoIngreso - MontoEgreso;
          addCloseDayAutomatic(
            MontoCierreAutomatico,
            currentDateTime.toLocaleDateString(),
            fechaHoraActual.toLocaleTimeString()
          );
        }
      }
    }, 10000);

    return () => clearInterval(intervalo);
  }, []);

  //FUNCION PARA EL CIERRE AUTOMATICO

  const addCloseDayAutomatic = (MontoCierre, Fecha, Hora) => {
    const db = getFirestore();
    const querySnapshot = collection(db, "Cierres");
    addDoc(querySnapshot, {
      MontoCierre: parseInt(MontoCierre),
      Fecha: Fecha,
      Hora: Hora,
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const getCierres = () => {
    getDocs(querySnapshotCierres)
      .then((response) => {
        const cierres = response.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setCierres(cierres);
      })
      .catch((error) => console.log(error));
  };

  const flagCierres = (fechaActual) => {
    //BANDERA PARA SABER SI SE REALIZÓ EL APERTURA DE CAJA EN EL DIA DE HOY
    const flag = cierres.some((dato) => dato.Fecha == fechaActual);
    return flag;
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
        modifyNombre,
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
        aperturas,
        flagApertura,
        Cart,
        cart,
        verifyStock,
        removeProduct,
        addSale,
        cleanCart,
        getVentas,
        listVentas,
        addCloseDay,
        getCierres,
        cierres,
        flagCierres,
        addCloseDayAutomatic,
      }}
    >
      {children}
    </BDContext.Provider>
  );
};
