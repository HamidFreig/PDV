import { useContext } from "react";
import { BDContext } from "../../../../context/BDContext";
import "./TableVenta.css";

//MATERIAL MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export const TableVenta = () => {
  const { cart, removeProduct } = useContext(BDContext);

  return (
    <div className="TableVenta">
      <TableContainer sx={{ width: "90%" }} component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "black" }}>
              <TableCell style={{ color: "white" }}>CODIGO PRODUCTO</TableCell>
              <TableCell style={{ color: "white" }} align="left">
                NOMBRE PRODUCTO
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                SABOR PRODUCTO
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                CANTIDAD
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                PRECIO
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                OPCIONES
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((row) => (
              <TableRow
                key={row.CodigoProducto}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.CodigoProducto}
                </TableCell>
                <TableCell align="left">
                  {row.NombreProducto.toUpperCase()}
                </TableCell>
                <TableCell align="left">
                  {row.SaborProducto.toUpperCase()}
                </TableCell>
                <TableCell align="left">{row.CantidadProducto}</TableCell>
                <TableCell align="left">${row.PrecioProducto}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeProduct(row.CodigoProducto)}
                  >
                    ELIMINAR
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
