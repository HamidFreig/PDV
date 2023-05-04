import { useContext, useState } from "react";
import { BDContext } from "../../../context/BDContext";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import "./Stock.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";

export const Stock = () => {
  const { productsList, setModificateProduct } = useContext(BDContext);
  const [datoInput, setDatoInput] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const HandleInputChange = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setDatoInput(event.target.value);
  };

  const HandleInputChangeSearch = (event) => {
    //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
    setSearchInput(event.target.value);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const sendId = (event) => {
    event.preventDefault();

    const checkId = productsList.some((product) => {
      //AUTH SI ES QUE EL PRODUCTO EXISTE EN LA BD Y REDIRECCIONOS
      if (product.Codigo == datoInput) {
        setModificateProduct(product);
        navigate("/modifyStock");
        return true;
      }
    });

    if (checkId == false) {
      Swal.fire({
        icon: "error",
        title: "CODIGO NO EXISTE",
        timer: 2000,
      });
    }
  };

  const filtermap = productsList.filter((product) =>
    //FILTRO DE BUSQUEDA
    product.Nombre.toUpperCase().includes(searchInput.toUpperCase())
  );

  return (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/vector-premium/patron-isometrico-costuras-cubos-linea-delgada_659980-2.jpg")`,
        height: "100vh",
      }}
    >
      <Link to={"/admin"}>
        <button className="Button-Back">ATRAS</button>
      </Link>
      <label style={{ marginBottom: "40px", backgroundColor: "white" }}>
        STOCK DISPONIBLE
      </label>
      <div className="divSearch">
        <TextField
          className="inputSearch"
          id="Search"
          label="BUSCAR PRODUCTO"
          variant="filled"
          onChange={HandleInputChangeSearch}
        />
      </div>

      <div className="table" style={{ width: "60%", margin: "0 auto" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>CODIGO</StyledTableCell>
                <StyledTableCell align="center">NOMBRE</StyledTableCell>
                <StyledTableCell align="center">SABOR</StyledTableCell>
                <StyledTableCell align="center">FABRICANTE</StyledTableCell>
                <StyledTableCell align="center">PRECIO</StyledTableCell>
                <StyledTableCell align="center">STOCK</StyledTableCell>
                <StyledTableCell align="center">OPCIONES</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtermap.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.Codigo}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.Nombre.toUpperCase()}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.Sabor.toUpperCase()}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.Fabricante.toUpperCase()}
                  </StyledTableCell>
                  <StyledTableCell align="left">${row.Precio}</StyledTableCell>
                  <StyledTableCell align="left">{row.Stock}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Link to={"/modifyStock"}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setModificateProduct(row)}
                      >
                        MODIFICAR PRODUCTO
                      </Button>
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="divModificateManual">
        <TextField
          className="inputModificate"
          label="INGRESE CODIGO DEL PRODUCTO"
          variant="outlined"
          onChange={HandleInputChange}
        />
        <Button variant="contained" color="success" onClick={sendId}>
          MODIFICAR MANUAL
        </Button>
      </div>
    </div>
  );
};
