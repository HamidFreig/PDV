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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const IngresoEgreso = () => {
  const { ingresos, egresos } = useContext(BDContext);
  const [seleccion, setSeleccion] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const handleChange = (event) => {
    setSeleccion(event.target.value);
  };

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

  const filterIngresos = () => {
    const filterIngresos = ingresos.map((row) => {
      if (
        `${row.Dia}/${row.Mes}/${row.Año}` ==
        currentDateTime.toLocaleDateString()
      ) {
        return (
          <StyledTableRow key={row.id}>
            <StyledTableCell component="th" scope="row">
              {row.Dia + "/" + row.Mes + "/" + row.Año}
            </StyledTableCell>
            <StyledTableCell align="right">{row.Hora}</StyledTableCell>
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
        );
      }
    });
    return filterIngresos;

    const FechaReporte = () => {};
  };
  return (
    <div className="PanelDiv">
      <div className="Seleccion" style={{ backgroundColor: "white" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Seleccionar</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={seleccion}
            label="Selleciona"
            onChange={handleChange}
          >
            <MenuItem value={10}>Hoy</MenuItem>
            <MenuItem value={20}>Semana</MenuItem>
            <MenuItem value={30}>Mes</MenuItem>
            <MenuItem value={30}>Todas</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="DivIngresos">
        <p
          style={{
            backgroundColor: "white",
            fontSize: "25px",
            fontWeight: "1000",
          }}
        >
          INGRESOS
        </p>

        <div>
          <TableContainer
            className="TableDatos"
            style={{ marginTop: "20px" }}
            component={Paper}
          >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>FECHA</StyledTableCell>
                  <StyledTableCell align="right">HORA</StyledTableCell>
                  <StyledTableCell align="right">MONTO INGRESO</StyledTableCell>
                  <StyledTableCell align="right">COMENTARIO</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>{filterIngresos()}</TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="DivEgresos">
        <p
          style={{
            backgroundColor: "white",
            fontSize: "25px",
            fontWeight: "1000",
          }}
        >
          EGRESOS
        </p>
        <div>
          <TableContainer
            className="TableDatos"
            style={{ marginTop: "20px" }}
            component={Paper}
          >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>FECHA</StyledTableCell>
                  <StyledTableCell align="right">HORA</StyledTableCell>
                  <StyledTableCell align="right">MONTO EGRESO</StyledTableCell>
                  <StyledTableCell align="right">COMENTARIO</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {egresos.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.Dia + "/" + row.Mes + "/" + row.Año}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.Hora}</StyledTableCell>
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
  );
};
