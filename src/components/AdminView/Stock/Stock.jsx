import { useContext } from "react";
import { BDContext } from "../../../context/BDContext";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import "./Stock.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

export const Stock = () => {
  const { productsList, refreshStock } = useContext(BDContext);

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
      <label style={{ marginBottom: "70px", backgroundColor: "white" }}>
        STOCK DISPONIBLE
      </label>
      <div className="table" style={{ width: "50%", margin: "0 auto" }}>
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
              {productsList.map((row) => (
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
                        onClick={() => refreshStock(row.id)} //aca quede
                      >
                        MODIFICAR STOCK
                      </Button>
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
