import "./ReportsPDV.css";

import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IngresoEgreso } from "../IngresoEgresoReport/IngresoEgreso";
import { VentasReport } from "../VentasReport/VentasReport";

//MODAL MUI
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export const ReportsPDV = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const navigate = useNavigate();
  const [value, setValue] = useState(
    dayjs(
      `${currentDateTime.getFullYear()}-${
        currentDateTime.getMonth() + 1
      }-${currentDateTime.getDate()}`
    )
  );

  //MODAL
  const [open, setOpen] = React.useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  //DISEÑO MODAL

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "30px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const styleResponsive = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 250,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "30px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  //DISEÑO MODAL

  return (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/vector-premium/patron-isometrico-costuras-cubos-linea-delgada_659980-2.jpg")`,
        minHeight: "100vh",
        minWidth: "90vw",
      }}
    >
      <button className="Button-Out" onClick={() => navigate("/admin")}>
        ATRAS
      </button>
      <label style={{ backgroundColor: "white", marginBottom: "40PX" }}>
        REPORTES
      </label>

      {/* MODAL PARA VER EL REPORTE DEL DIA ESPECIFICO*/}
      <div className="Modal">
        <Button
          sx={{
            backgroundColor: "black",
            color: "white",
            marginTop: "10px",
            marginRight: "10px",
          }}
          variant="contained"
          onClick={handleOpen}
        >
          VER REPORTE DIA ESPECÍFICO
        </Button>
        <Modal
          className="ModalCalender"
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={isMobile ? styleResponsive : style}>
            <div className="ModalContainer">
              <div className="Calendar">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateCalendar", "DateCalendar"]}>
                    <DemoItem>
                      <DateCalendar
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="ReporteDetallado">
                <Link
                  to={`/reportDetail/${value.$D}-${value.$M + 1}-${value.$y}}`}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      marginTop: "10px",
                    }}
                  >
                    VER REPORTE DETALLADO
                  </Button>
                </Link>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
      <div className="IngresoEgreso">
        <IngresoEgreso />
      </div>

      <div className="ReportesVentas">
        <VentasReport />
      </div>
    </div>
  );
};
