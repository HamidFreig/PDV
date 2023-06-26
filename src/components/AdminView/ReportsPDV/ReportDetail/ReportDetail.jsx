import "./ReportDetail.css";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BDContext } from "../../../../context/BDContext";

//MUI
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

export const ReportDetail = () => {
  //SELECCION ==> 1 = DIARIO,7 = SEMANAL, 30=MENSUAL, 2=TODAS LAS VENTAS
  const { seleccion } = useParams();
  const { listVentas, ingresos, egresos } = useContext(BDContext);
  const navigate = useNavigate();

  const Separador = "-";
  const FechaSplit = seleccion.split(Separador);
  const DiaSplit = parseInt(FechaSplit[0]);
  const MesSplit = parseInt(FechaSplit[1]);
  const AñoSplit = parseInt(FechaSplit[2]);

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

  //FILTRADO DE VENTAS
  const filterVentas = () => {
    const Ventas = listVentas.filter((dato) => {
      return (
        dato.Fecha.Dia == DiaSplit &&
        dato.Fecha.Mes == MesSplit &&
        dato.Fecha.Año == AñoSplit
      );
    });

    //ORDENAR ASCENDENTEMENTE LOS REPORTES
    Ventas.sort((x, y) => {
      if (x.Fecha.Mes < y.Fecha.Mes) {
        return -1;
      } else if (x.Fecha.Mes > y.Fecha.Mes) {
        return 1;
      }
      if (x.Fecha.Dia < y.Fecha.Dia) {
        return -1;
      } else if (x.Fecha.Dia > y.Fecha.Dia) {
        return 1;
      }
      if (x.Hora < y.Hora) {
        return -1;
      } else if (x.Hora > y.Fecha.Hora) {
        return 1;
      }
      return 0;
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

    //ORDENAR ASCENDENTEMENTE LOS REPORTES
    Ingresos.sort((x, y) => {
      if (x.Mes < y.Mes) {
        return -1;
      } else if (x.Mes > y.Mes) {
        return 1;
      }
      if (x.Dia < y.Dia) {
        return -1;
      } else if (x.Dia > y.Dia) {
        return 1;
      }
      if (x.Hora < y.Hora) {
        return -1;
      } else if (x.Hora > y.Hora) {
        return 1;
      }
      return 0;
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

    //ORDENAR ASCENDENTEMENTE LOS REPORTES
    Egresos.sort((x, y) => {
      if (x.Mes < y.Mes) {
        return -1;
      } else if (x.Mes > y.Mes) {
        return 1;
      }
      if (x.Dia < y.Dia) {
        return -1;
      } else if (x.Dia > y.Dia) {
        return 1;
      }
      if (x.Hora < y.Hora) {
        return -1;
      } else if (x.Hora > y.Hora) {
        return 1;
      }
      return 0;
    });
    return Egresos;
  };

  const ventasDetail = (dato) => {
    navigate(`/ventasDetail/${dato.id}`);
  };

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
        REPORTES DEL {DiaSplit}/{MesSplit}/{AñoSplit}
      </label>

      <div className="TablaTransacciones">
        <div className="TablaIngresos">
          <p
            style={{
              backgroundColor: "white",
              fontSize: "25px",
              fontWeight: "1000",
            }}
          >
            INGRESOS: $
            {filterIngresos().reduce((acc, curr) => acc + curr.MontoIngreso, 0)}
          </p>

          {filterIngresos().reduce((acc, curr) => acc + curr.MontoIngreso, 0) >
          0 ? (
            <div className="TableVentasIE">
              <TableContainer
                className="TableDatosIE"
                style={{ marginTop: "20px" }}
                component={Paper}
              >
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>FECHA</StyledTableCell>
                      <StyledTableCell align="center">HORA</StyledTableCell>
                      <StyledTableCell align="center">
                        MONTO INGRESO
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        COMENTARIO
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filterIngresos().map((dato) => (
                      <StyledTableRow key={dato.id}>
                        <StyledTableCell component="th" scope="row">
                          {dato.Dia + "/" + dato.Mes + "/" + dato.Año}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {dato.Hora}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {dato.MontoIngreso.toLocaleString("es-CL", {
                            style: "currency",
                            currency: "CLP",
                          })}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {dato.Comentario.toUpperCase()}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            <p style={{ backgroundColor: "black", color: "white" }}>
              NO HAY DATOS
            </p>
          )}
        </div>

        <div className="TablaEgresos">
          <p
            style={{
              backgroundColor: "white",
              fontSize: "25px",
              fontWeight: "1000",
            }}
          >
            INGRESOS: $
            {filterEgresos().reduce((acc, curr) => acc + curr.MontoEgreso, 0)}
          </p>

          {filterEgresos().reduce((acc, curr) => acc + curr.MontoEgreso, 0) >
          0 ? (
            <div className="TableVentasIE">
              <TableContainer
                className="TableDatosIE"
                style={{ marginTop: "20px" }}
                component={Paper}
              >
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>FECHA</StyledTableCell>
                      <StyledTableCell align="center">HORA</StyledTableCell>
                      <StyledTableCell align="center">
                        MONTO EGRESO
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        COMENTARIO
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filterEgresos().map((dato) => (
                      <StyledTableRow key={dato.id}>
                        <StyledTableCell component="th" scope="row">
                          {dato.Dia + "/" + dato.Mes + "/" + dato.Año}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {dato.Hora}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {dato.MontoEgreso.toLocaleString("es-CL", {
                            style: "currency",
                            currency: "CLP",
                          })}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {dato.Comentario.toUpperCase()}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            <p style={{ backgroundColor: "black", color: "white" }}>
              NO HAY DATOS
            </p>
          )}
        </div>
      </div>
      <div className="TablaVentasDetail">
        <p className="TotalVentas">
          TOTAL VENTAS: $
          {filterVentas().reduce((acc, curr) => acc + curr.MontoTotal, 0)}
        </p>

        {filterVentas().reduce((acc, curr) => acc + curr.MontoTotal, 0) > 0 ? (
          <div className="TableVentas">
            <TableContainer
              className="TableDatos"
              style={{ marginTop: "20px" }}
              component={Paper}
            >
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">VENDEDOR</StyledTableCell>
                    <StyledTableCell align="center">FECHA</StyledTableCell>
                    <StyledTableCell align="center">HORA</StyledTableCell>
                    <StyledTableCell align="center">
                      MONTO TOTAL
                    </StyledTableCell>
                    <StyledTableCell align="center">OPCION</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filterVentas().map((dato) => (
                    <StyledTableRow key={dato.id}>
                      <StyledTableCell align="center">
                        {dato.Vendedor}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {dato.Fecha.Dia +
                          "/" +
                          dato.Fecha.Mes +
                          "/" +
                          dato.Fecha.Año}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {dato.Hora}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {dato.MontoTotal.toLocaleString("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        })}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "green", color: "white" }}
                          onClick={() => ventasDetail(dato)}
                        >
                          VER DETALLE
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <p style={{ backgroundColor: "black", color: "white" }}>
            NO HAY DATOS
          </p>
        )}
      </div>
    </div>
  );
};
