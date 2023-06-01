import { useState, useContext, useEffect } from "react";
import { BDContext } from "../../../context/BDContext";
import "./ModalStockView.css";

//MATERIAL MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";

//MATERIAL DE TABLE

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const ModalStockView = () => {
  //FUNCIONES MODAL
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const [searchInput, setSearchInput] = useState("");

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

  const { productsList } = useContext(BDContext);

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

  //DISEÑO TABLE

  const filtermap = productsList.filter((product) =>
    //FILTRO DE BUSQUEDA
    product.Nombre.toUpperCase().includes(searchInput.toUpperCase())
  );

  const HandleInputChangeSearch = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setSearchInput(event.target.value);
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={isMobile ? styleModalResponsive : styleModal}>
          <div className="divSearch">
            <TextField
              className="inputSearch"
              id="Search"
              label="BUSCAR PRODUCTO"
              variant="filled"
              onChange={HandleInputChangeSearch}
            />
          </div>
          <div
            className="TableStock"
            style={
              isMobile
                ? { width: "300px" }
                : { width: "700px", height: "250px" }
            }
          >
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 600 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow style={{ backgroundColor: "black" }}>
                    <TableCell style={{ color: "white" }}>CÓDIGO</TableCell>
                    <TableCell style={{ color: "white" }} align="left">
                      NOMBRE
                    </TableCell>
                    <TableCell style={{ color: "white" }} align="left">
                      SABOR
                    </TableCell>
                    <TableCell style={{ color: "white" }} align="left">
                      FABRICANTE
                    </TableCell>
                    <TableCell style={{ color: "white" }} align="left">
                      PRECIO
                    </TableCell>
                    <TableCell style={{ color: "white" }} align="left">
                      STOCK
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtermap.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.Codigo}
                      </TableCell>
                      <TableCell align="left">
                        {row.Nombre.toUpperCase()}
                      </TableCell>
                      <TableCell align="left">
                        {row.Sabor.toUpperCase()}
                      </TableCell>
                      <TableCell align="left">
                        {row.Fabricante.toUpperCase()}
                      </TableCell>
                      <TableCell align="left">${row.Precio}</TableCell>
                      <TableCell align="left">{row.Stock}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
