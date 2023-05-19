import "./IngresoEgreso.css";
import { useContext, useEffect, useState } from "react";
import { BDContext } from "../../../../context/BDContext";

//MUI DISEÑO

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const IngresoEgreso = () => {
  const { ingresos, egresos } = useContext(BDContext);

  //CONFIGURACIONES PARA HACER EL RESPONSIVE EN EL JSX

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Limpieza de efecto al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //CONFIGURACIONES PARA HACER EL RESPONSIVE EN EL JSX

  //TABLA MUI

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

  // TABLA MUI

  const styles = {
    position: "absolute",
    top: "60%",
    left: "50%",
    width: "90%",
    height: "400px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    border: "solid",
    borderRadius: "30px",
    padding: "20px",
    zIndex: 9999,
  };

  const responsiveStyle = {
    ...styles, // Copiamos los estilos base del styles
    marginTop: "200px",
    height: "550px",
    width: "85%",
  };

  return (
    <div style={windowSize.height >= 700 ? styles : responsiveStyle}>
      <div className="PanelDiv">
        <div className="izq-panel">
          INGRESOS
          <div>
            <TableContainer
              className="TableDatos"
              style={{ marginTop: "20px" }}
              component={Paper}
            >
              <Table sx={{ minWidth: 300 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>FECHA</StyledTableCell>
                    <StyledTableCell align="right">HORA</StyledTableCell>
                    <StyledTableCell align="right">
                      MONTO INGRESO
                    </StyledTableCell>
                    <StyledTableCell align="right">COMENTARIO</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ingresos.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row.Dia + "/" + row.Mes + "/" + row.Año}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.Hora}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.MontoIngreso.toLocaleString("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        })}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.Comentario.toUpperCase()}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className="der-panel">
          EGRESOS{" "}
          <div>
            <TableContainer
              className="TableDatos"
              style={{ marginTop: "20px" }}
              component={Paper}
            >
              <Table sx={{ minWidth: 300 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>FECHA</StyledTableCell>
                    <StyledTableCell align="right">HORA</StyledTableCell>
                    <StyledTableCell align="right">
                      MONTO EGRESO
                    </StyledTableCell>
                    <StyledTableCell align="right">COMENTARIO</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {egresos.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row.Dia + "/" + row.Mes + "/" + row.Año}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.Hora}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.MontoEgreso.toLocaleString("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        })}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.Comentario.toUpperCase()}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
