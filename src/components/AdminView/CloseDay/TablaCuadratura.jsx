//TABLE MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const TablaCuadratura = ({ listVentas, listI, listE, apertura }) => {
  const MontoApertura = apertura.reduce(
    (acc, curr) => acc + curr.MontoApertura,
    0
  );
  const MontoVentaEfectivo = listVentas.reduce(
    (acc, curr) => acc + curr.MontoEfectivo,
    0
  );
  const MontoVentaDebito = listVentas.reduce(
    (acc, curr) => acc + curr.MontoDebito,
    0
  );
  const MontoVentaCredito = listVentas.reduce(
    (acc, curr) => acc + curr.MontoCredito,
    0
  );
  const MontoIngreso = listI.reduce((acc, curr) => acc + curr.MontoIngreso, 0);
  const MontoEgreso = listE.reduce((acc, curr) => acc + curr.MontoEgreso, 0);
  return (
    <div style={{ width: "350px" }}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ backgroundColor: "black", color: "white" }}
              >
                RESUMEN
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="MontoApertura">
              <TableCell component="th" scope="row" align="center">
                APERTURA : ${MontoApertura}
              </TableCell>
            </TableRow>
            <TableRow key="MontoTotal">
              <TableCell component="th" scope="row" align="center">
                VENTA TOTAL : $
                {MontoVentaEfectivo + MontoVentaDebito + MontoVentaCredito}
              </TableCell>
            </TableRow>
            <TableRow key="MontoEfectivo">
              <TableCell component="th" scope="row" align="center">
                VENTA EFECTIVO : ${MontoVentaEfectivo}
              </TableCell>
            </TableRow>
            <TableRow key="MontoDebido">
              <TableCell component="th" scope="row" align="center">
                VENTA DEBITO : ${MontoVentaDebito}
              </TableCell>
            </TableRow>
            <TableRow key="MontoCredito">
              <TableCell component="th" scope="row" align="center">
                VENTA CREDITO : ${MontoVentaCredito}
              </TableCell>
            </TableRow>
            <TableRow key="MontoIngreso">
              <TableCell component="th" scope="row" align="center">
                INGRESO : ${MontoIngreso}
              </TableCell>
            </TableRow>
            <TableRow key="MontoEgreso">
              <TableCell component="th" scope="row" align="center">
                EGRESO : ${MontoEgreso}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
