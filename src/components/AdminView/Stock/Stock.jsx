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

export const Stock = () => {
    const { productsList, setProductsList, getProductos } =
        useContext(BDContext);
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
    getProductos();
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
                backgroundImage: `url("https://www.suretiimf.com/wp-content/uploads/2020/06/pattern-background-png-4.png")`,
                height: "100vh",
            }}
        >
            <Link to={"/admin"}>
                <button className="Button-Back">ATRAS</button>
            </Link>
            <label style={{ marginBottom: "70px" }}>STOCK DISPONIBLE</label>
            <div className="table" style={{ width: "50%", margin: "0 auto" }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>CODIGO</StyledTableCell>
                                <StyledTableCell align="right">
                                    NOMBRE
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    SABOR
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    FABRICANTE
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    PRECIO
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    STOCK
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productsList.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.Codigo}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.Nombre.toUpperCase()}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.Sabor.toUpperCase()}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.Fabricante.toUpperCase()}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.Precio}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.Stock}
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
