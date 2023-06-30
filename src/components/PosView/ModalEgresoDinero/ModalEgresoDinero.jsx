import { useState, useContext, useEffect } from "react";
import "./ModalEgresoDinero.css";
import Swal from "sweetalert2";
import { BDContext } from "../../../context/BDContext";

//MATERIAL MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router";

export const ModalEgresoDinero = () => {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [MontoEgreso, setMontoEgreso] = useState(0);
  const [commentarioEgreso, setComentarioEgreso] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [horaActual, setHoraActual] = useState(new Date().toLocaleTimeString());

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileQuery = window.matchMedia("(max-width: 768px)");
      setIsMobile(isMobileQuery.matches);
    };

    handleResize(); // Llamada inicial para establecer el estado inicial

    window.addEventListener("resize", handleResize); // Escucha los cambios de tamaño de la ventana

    return () => {
      window.removeEventListener("resize", handleResize); // Limpia el evento al desmontar el componente
    };
  }, []);

  const {
    AddDischarge,
    getEgresos,
    egresos,
    listVentas,
    getIngresos,
    ingresos,
    aperturas,
    getVentas,
  } = useContext(BDContext); //ACCEDO A LA BD MEDIANTE CONTEXT

  const HandleInputChangeMontoEgreso = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setMontoEgreso(event.target.value);
  };

  const HandleInputChangeComentarioEgreso = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setComentarioEgreso(event.target.value);
  };

  //DISEÑO MODAL
  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const styleModalResponsive = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const Separador = "/";
  const FechaSplit = currentDateTime.toLocaleDateString().split(Separador);
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
        dato.Dia == DiaSplit && dato.Mes == MesSplit && dato.Año == AñoSplit
      );
    });
    return Ingresos;
  };

  //FILTRADO DE EGRESOS
  const filterEgresos = () => {
    const Egresos = egresos.filter((dato) => {
      return (
        dato.Dia == DiaSplit && dato.Mes == MesSplit && dato.Año == AñoSplit
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

  const sendEgreso = () => {
    const MontoAperturaExistente = filterApertura().reduce(
      (acc, curr) => acc + curr.MontoApertura,
      0
    );
    const MontoVentaEfectivoExistente = filterVentas().reduce(
      (acc, curr) => acc + curr.MontoEfectivo,
      0
    );
    const MontoIngresoExistente = filterIngresos().reduce(
      (acc, curr) => acc + curr.MontoIngreso,
      0
    );
    const MontoEgresoExistente = filterEgresos().reduce(
      (acc, curr) => acc + curr.MontoEgreso,
      0
    );

    if (MontoEgreso < 0) {
      setOpen(!open);
      Swal.fire({
        icon: "error",
        title: "EGRESO NO VÁLIDO",
      });
    } else if (commentarioEgreso == "") {
      setOpen(!open);
      Swal.fire({
        icon: "error",
        title: "INGRESE UN COMENTARIO",
      });
    } else if (
      MontoAperturaExistente +
        MontoIngresoExistente +
        MontoVentaEfectivoExistente -
        MontoEgresoExistente <
      MontoEgreso
    ) {
      setOpen(!open);
      Swal.fire({
        icon: "error",
        title: "EFECTIVO NO DISPONIBLE",
        timer: 1000,
      });
    } else {
      AddDischarge(
        MontoEgreso,
        currentDateTime.toLocaleDateString(),
        horaActual,
        commentarioEgreso
      );
      Swal.fire({
        icon: "success",
        title: "EGRESO INGRESADO CON EXITO",
        timer: 1000,
      });
      navigate("/");
    }
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={isMobile ? styleModalResponsive : styleModal}>
          <div className="FormIngreso">
            <label>INGRESE LA CANTIDAD DE DINERO</label>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel
                id="MontoIngreso"
                type="number"
                htmlFor="outlined-adornment-amount"
              >
                EGRESO
              </InputLabel>
              <OutlinedInput
                type="number"
                id="MontoEgreso"
                onChange={HandleInputChangeMontoEgreso}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="EGRESO"
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel
                id="ComentarioEgreso"
                type="text"
                htmlFor="outlined-adornment-amount"
              >
                COMENTARIO
              </InputLabel>
              <OutlinedInput
                type="text"
                id="ComentarioEgreso"
                onChange={HandleInputChangeComentarioEgreso}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
                label="COMENTARIO"
              />
            </FormControl>
            <div className="BotonEnviarEgreso">
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  sendEgreso();
                }}
              >
                ENVIAR EGRESO
              </Button>
            </div>
          </div>
          <div className="ButtonClose">
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleClose()}
            >
              CERRAR
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
