import "./SeccionPago.css";
import { useContext, useState } from "react";
import { BDContext } from "../../../context/BDContext";
import Swal from "sweetalert2";

//MATERIAL MUI
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

export const SeccionPago = () => {
  const { cart, addSale, cleanCart } = useContext(BDContext);
  const [montoEfectivo, setMontoEfectivo] = useState(0);
  const [montoDebito, setMontoDebito] = useState(0);
  const [montoCredito, setMontoCredito] = useState(0);
  const [montoCarrito, setMontoCarrito] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [horaActual, setHoraActual] = useState(new Date().toLocaleTimeString());

  setTimeout(() => {
    //ACTUALIZO EL VALOR DEL CARRITO CONSTANTEMENTE
    setMontoCarrito(0);
    setMontoCarrito(
      cart.reduce(
        (acc, curr) => acc + curr.CantidadProducto * curr.PrecioProducto,
        0
      )
    );
  }, 1000);

  const HandleInputChangeMontoEfectivo = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATEs

    setMontoEfectivo(event.target.value);
  };
  const HandleInputChangeMontoDebito = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setMontoDebito(event.target.value);
  };
  const HandleInputChangeMontoCredito = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setMontoCredito(event.target.value);
  };

  const generarVenta = () => {
    if (
      //SI EL CARRITO TA VACIO
      cart.reduce(
        (acc, curr) => acc + curr.CantidadProducto * curr.PrecioProducto,
        0
      ) == 0
    ) {
      Swal.fire({
        icon: "error",
        title: "CARRITO VACIO",
        timer: 2000,
      });
    } else if (
      //SI EN EL CARRO HAY PRODUCTOS
      cart.reduce(
        (acc, curr) => acc + curr.CantidadProducto * curr.PrecioProducto,
        0
      ) > 0
    ) {
      if (
        parseInt(montoEfectivo) == 0 &&
        parseInt(montoDebito) == 0 &&
        parseInt(montoCredito) == 0
      ) {
        //SI LAS 3 CASILLAS SON 0
        Swal.fire({
          icon: "error",
          title: "METODO DE PAGO INVÁLIDO",
          timer: 2000,
        });
      } else if (
        parseInt(montoEfectivo) +
          parseInt(montoDebito) +
          parseInt(montoCredito) <
        parseInt(montoCarrito)
      ) {
        //SI EL MONTO ES MENOR
        Swal.fire({
          icon: "error",
          title: "FALTA DINERO",
          timer: 2000,
        });
      } else if (
        parseInt(montoEfectivo) +
          parseInt(montoDebito) +
          parseInt(montoCredito) >
          parseInt(montoCarrito) &&
        parseInt(montoEfectivo) <= parseInt(montoCarrito)
      ) {
        //SI EL MONTO ES MAYOR Y  SUPONIENDO QUE EFECTIVO NO ES MAYOR AL MONTO
        Swal.fire({
          icon: "error",
          title: "TRANSACCIÓN INVÁLIDA",
          timer: 2000,
        });
      } else if (
        parseInt(montoEfectivo) +
          parseInt(montoDebito) +
          parseInt(montoCredito) ==
        parseInt(montoCarrito)
      ) {
        //SI EL MONTO ES IGUAL
        Swal.fire({
          icon: "success",
          title: "VENTA REALIZADA",
          confirmButtonText: "Aceptar",
        });

        //AGREGO LA VENTA A LA BD
        addSale(
          horaActual,
          currentDateTime.toLocaleDateString(),
          montoCarrito,
          montoEfectivo,
          montoDebito,
          montoCredito
        );
        //LIMPIO EL CARRITO
        cleanCart();
      } else if (
        parseInt(montoEfectivo) > parseInt(montoCarrito) &&
        parseInt(montoDebito) == 0 &&
        parseInt(montoCredito) == 0
      ) {
        //SI SOLO SE PAGA EN EFECTIVO Y EL MONTO ES MAYOR, REQUIERE VUELTO
        Swal.fire({
          icon: "success",
          title: "VENTA REALIZADA",
          text: `EL VUELTO ES DE $${
            parseInt(montoEfectivo) - parseInt(montoCarrito)
          }`,
          confirmButtonText: "Aceptar",
        });

        //AGREGO LA VENTA A LA BD
        addSale(
          horaActual,
          currentDateTime.toLocaleDateString(),
          montoCarrito,
          montoEfectivo,
          montoDebito,
          montoCredito
        );

        //LIMPIO EL CARRITO
        cleanCart();
      } else {
        Swal.fire({
          icon: "error",
          title: "TRANSACCIÓN INVÁLIDA",
          timer: 2000,
        });
      }
    }
  };
  return (
    <div className="SeccionPago">
      <div className="Total">
        <p>TOTAL: ${montoCarrito}</p>
      </div>
      <div className="MetodoPago">
        <b>EFECTIVO</b>
        <div>
          <img
            className="IconoPago"
            src="https://cdn-icons-png.flaticon.com/512/2489/2489756.png"
            alt="Icono"
          />
          <FormControl
            fullWidth
            sx={{
              width: "60%",
              marginLeft: "20px",
              marginTop: "10px",
            }}
          >
            <InputLabel htmlFor="outlined-adornment-amount">MONTO</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              type="number"
              value={montoEfectivo}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              onChange={HandleInputChangeMontoEfectivo}
              label="MONTO"
            />
          </FormControl>
        </div>
        <b>DÉBTIO</b>
        <div>
          <img
            className="IconoPago"
            src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRPwA1fZwjxWY0O0zRC_p4pmZubaeSDIC9rZK5lbl4lG_oWMnFi"
            alt="Icono"
          />
          <FormControl
            fullWidth
            sx={{
              width: "60%",
              marginLeft: "20px",
              marginTop: "10px",
            }}
          >
            <InputLabel htmlFor="outlined-adornment-amount">MONTO</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              type="number"
              value={montoDebito}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              onChange={HandleInputChangeMontoDebito}
              label="MONTO"
            />
          </FormControl>
        </div>
        <b>CRÉDITO</b>
        <div>
          <img
            className="IconoPago"
            src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRPwA1fZwjxWY0O0zRC_p4pmZubaeSDIC9rZK5lbl4lG_oWMnFi"
            alt="Icono"
          />
          <FormControl
            fullWidth
            sx={{
              width: "60%",
              marginLeft: "20px",
              marginTop: "10px",
            }}
          >
            <InputLabel htmlFor="outlined-adornment-amount">MONTO</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              type="number"
              value={montoCredito}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              onChange={HandleInputChangeMontoCredito}
              label="MONTO"
            />
          </FormControl>
        </div>
      </div>
      <div className="ButonCheck">
        <Button
          variant="contained"
          color="success"
          onClick={() => generarVenta()}
        >
          GENERAR VENTA
        </Button>
      </div>
    </div>
  );
};
