import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { BDContext } from "../../../../context/BDContext";
import "./VentasDetail.css";

//MUI
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

//ESTILOS DE LA TABLE MUI

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

//ESTILOS DE LA TABLE MUI

export const VentasDetail = () => {
  const navigate = useNavigate();
  //RESCATO EL ID DE LA BOLETA PARA VER EL DETALLE
  const { id } = useParams();
  const { listVentas } = useContext(BDContext);
  const [detailVenta, setDetailVenta] = useState([]);
  const [fecha, setFecha] = useState({ dia: 0, mes: 0, año: 0 });
  const [detailProductos, setDetailProductos] = useState([]);

  useEffect(() => {
    const detailOrden = listVentas.filter((dato) => {
      //SETEO LA ORDEN Y LA FECHAPARA DESPUES MOSTRARLA
      if (dato.id == id) {
        setDetailVenta(dato);
        setFecha({
          dia: dato.Fecha.Dia,
          mes: dato.Fecha.Mes,
          año: dato.Fecha.Año,
        });
        setDetailProductos(dato.Productos);
      }
    });
  }, []);

  console.log(detailProductos);
  return (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/vector-premium/patron-isometrico-costuras-cubos-linea-delgada_659980-2.jpg")`,
        minHeight: "100vh",
        minWidth: "90vw",
      }}
    >
      <button className="Button-Out" onClick={() => navigate("/report")}>
        ATRAS
      </button>
      <label style={{ backgroundColor: "white", marginBottom: "40PX" }}>
        DETALLE DE VENTA
      </label>
      <div className="Detalle">
        <label className="detalle">
          FECHA:{fecha.dia}/{fecha.mes}/{fecha.año}
        </label>
        <label className="detalle">TOTAL:${detailVenta.MontoTotal} </label>
        <label className="detalle">HORA:{detailVenta.Hora}</label>
      </div>
      <div className="TablaDetalle">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">
                  NOMBRE PRODUCTO
                </StyledTableCell>
                <StyledTableCell align="center">
                  CANTIDAD PRODUCTO
                </StyledTableCell>
                <StyledTableCell align="center">
                  PRECIO UNITARIO
                </StyledTableCell>
                <StyledTableCell align="center">PRECIO TOTAL</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detailProductos.map((row) => (
                <StyledTableRow key={row.IdProducto}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {row.NombreProducto.toUpperCase()}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.CantidadProducto}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.PrecioProducto}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.PrecioProducto * row.CantidadProducto}
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
