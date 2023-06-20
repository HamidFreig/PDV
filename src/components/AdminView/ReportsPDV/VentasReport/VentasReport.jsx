import "./VentasReport.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { useContext, useEffect, useState } from "react";
import { BDContext } from "../../../../context/BDContext";

export const VentasReport = () => {
  const { listVentas } = useContext(BDContext);
  const [seleccion, setSeleccion] = useState(1);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [diaFiltrado, setDiaFiltrado] = useState(1);
  const [MesFiltrado, setMesFiltrado] = useState(1);
  const [AñoFiltrado, setAñoFiltrado] = useState(1);

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

  const handleChange = (event) => {
    setSeleccion(event.target.value);
  };

  const filterDay = () => {
    const Separador = "/";
    const FechaSplit = currentDateTime.toLocaleDateString().split(Separador);
    const DiaSplit = parseInt(FechaSplit[0]);
    const MesSplit = parseInt(FechaSplit[1]);
    const AñoSplit = parseInt(FechaSplit[2]);

    if (seleccion == 1) {
      //SI LA SECCION ES HOY
      setDiaFiltrado(DiaSplit);
      setMesFiltrado(MesSplit);
      setAñoFiltrado(AñoSplit);
    } else if (seleccion == 7) {
      //SI LA SELECCION ES UNA SEMANA
      if (DiaSplit - 7 < 0) {
        //SI S0N LOS PRIMEROS DIAS DEL MES HAY QUE JUGAR CON EL MES ANTERIOR
        if (
          MesSplit == 1 ||
          MesSplit == 3 ||
          MesSplit == 5 ||
          MesSplit == 7 ||
          MesSplit == 8 ||
          MesSplit == 10 ||
          MesSplit == 12
        ) {
          //LOS MESES QUE TIENEN 31 DIAS
          setDiaFiltrado(DiaSplit + 31 - 7);
          setMesFiltrado(MesSplit - 1);
          setAñoFiltrado(AñoSplit);
        } else if (
          MesSplit == 4 ||
          MesSplit == 6 ||
          MesSplit == 9 ||
          MesSplit == 11
        ) {
          //LOS MESES QUE TIENEN 30 DIAS
          setDiaFiltrado(DiaSplit + 30 - 7);
          setMesFiltrado(MesSplit - 1);
          setAñoFiltrado(AñoSplit);
        } else {
          //ALGORITMO PARA SABER SI UN AÑO ES BISIESTO
          if (AñoSplit % 4 !== 0) {
            //Si el año no es divisible por 4, entonces no es bisiesto.
            setDiaFiltrado(DiaSplit + 28 - 7);
            setMesFiltrado(MesSplit - 1);
            setAñoFiltrado(AñoSplit);
          } else if (AñoSplit % 100 !== 0) {
            //Si el año es divisible por 4 pero no por 100, entonces es bisiesto.
            setDiaFiltrado(DiaSplit + 29 - 7);
            setMesFiltrado(MesSplit - 1);
            setAñoFiltrado(AñoSplit);
          } else if (AñoSplit % 400 !== 0) {
            //Si el año es divisible por 100 pero no por 400, entonces no es bisiesto.
            setDiaFiltrado(DiaSplit + 28 - 7);
            setMesFiltrado(MesSplit - 1);
            setAñoFiltrado(AñoSplit);
          } else {
            //Si el año es divisible por 400, entonces es bisiesto.
            setDiaFiltrado(DiaSplit + 29 - 7);
            setMesFiltrado(MesSplit - 1);
            setAñoFiltrado(AñoSplit);
          }
        }
      } else {
        //SI SON CUALQUIER DIA DENTRO DE UN MES
        setDiaFiltrado(DiaSplit - 7);
        setMesFiltrado(MesSplit);
        setAñoFiltrado(AñoSplit);
      }
    } else if (seleccion == 30) {
      //SI LA SELECCION ES DE UN MES
      setDiaFiltrado(DiaSplit);
      setMesFiltrado(MesSplit - 1);
      setAñoFiltrado(AñoSplit);
    }
  };

  const filterVentas = (filter) => {
    if (seleccion == 1) {
      //SI LA SELECCION ES HOY MOSTRARA SOLO LOS REPORTES DE HOY
      const filter = listVentas.filter((dato) => {
        return (
          dato.Fecha.Dia == diaFiltrado &&
          dato.Fecha.Mes == MesFiltrado &&
          dato.Fecha.Año == AñoFiltrado
        );
      });
      //ORDENAR ASCENDENTEMENTE LOS REPORTES
      filter.sort((x, y) => {
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
      return filter;
    } else if (seleccion == 7) {
      //SI LA SELECCION ES 1 SEMANA MOSTRARA SOLO LOS REPORTES DE LA SEMANA
      const filter = listVentas.filter((dato) => {
        if (currentDateTime.getMonth() + 1 == MesFiltrado) {
          //SI ESTAMOS DENTRO DEL MISMO MES MUESTRA LOS REPORTES DONDE EL DATO SEA MAYOR AL LIMITE DE DONDE SE CUMPLE 1 SEMANA ATRAS
          return (
            dato.Fecha.Dia >= diaFiltrado &&
            dato.Fecha.Mes == MesFiltrado &&
            dato.Fecha.Año == AñoFiltrado
          );
        } else if (currentDateTime.getMonth() + 1 >= MesFiltrado) {
          //SI LA SEMANA PASADA CAYÓ JUSTO EL MES PASADO Y PARTE DE ESTE MES, SE MOSTRARÁN LOS REPORTES DONDE EL DATO
          //--->SEA MAYOR AL LIMITE DE DONDE SE CUMPLE 1 SEMANA ATRAS PERO TAMBIEN DONDE EL EL DATO SEA MENOR AL DIA DE HOY DENTRO
          return (
            (dato.Fecha.Dia >= diaFiltrado ||
              dato.Fecha.Dia <= currentDateTime.getDate()) &&
            dato.Fecha.Mes >= currentDateTime.getMonth() &&
            dato.Fecha.Año == AñoFiltrado
          );
        }
      });
      //ORDENAR ASCENDENTEMENTE LOS REPORTES
      filter.sort((x, y) => {
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
      return filter;
    } else if (seleccion == 30) {
      //SI LA SELECCION ES MENSUAL LOS REPORTES TIENEN QUE SER LOS DIAS MAYORES PERO DEL MES ANTERIOR O LOS DIAS MENORES A ESTE MES
      const filter = listVentas.filter((dato) => {
        return (
          ((dato.Fecha.Dia >= diaFiltrado &&
            dato.Fecha.Mes < currentDateTime.getMonth() + 1) ||
            (dato.Fecha.Dia <= diaFiltrado &&
              dato.Fecha.Mes == currentDateTime.getMonth() + 1)) &&
          dato.Fecha.Año == AñoFiltrado
        );
      });
      //ORDENAR ASCENDENTEMENTE LOS REPORTES
      filter.sort((x, y) => {
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
      return filter;
    } else if (seleccion == 2) {
      //MOSTRAR TODOS LOS REPORTES
      const filter = listVentas.filter((dato) => {
        return dato;
      });

      //ORDENAR ASCENDENTEMENTE LOS REPORTES
      filter.sort((x, y) => {
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
      return filter;
    }
  };
  return (
    <div className="PanelVentasReport">
      {useEffect(() => {
        //CADA VEZ QUE SE MODIFIQUE EL CAMBIO DE REPORTE SE CAMBIA EL FILTERDAY
        filterDay();
        filterVentas();
      }, [handleChange])}
      <div className="Seleccion1" style={{ backgroundColor: "white" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Seleccionar</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={seleccion}
            label="Selecciona"
            onChange={handleChange}
          >
            <MenuItem value={1}>Hoy</MenuItem>
            <MenuItem value={7}>Semana</MenuItem>
            <MenuItem value={30}>Mes</MenuItem>
            <MenuItem value={2}>Todas</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="TableVentas">
        <TableContainer
          className="TableDatos"
          style={{ marginTop: "20px" }}
          component={Paper}
        >
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">FECHA</StyledTableCell>
                <StyledTableCell align="center">HORA</StyledTableCell>
                <StyledTableCell align="center">MONTO TOTAL</StyledTableCell>
                <StyledTableCell align="center">OPCION</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterVentas().map((dato) => (
                <StyledTableRow key={dato.id}>
                  <StyledTableCell component="th" scope="row">
                    {dato.Fecha.Dia +
                      "/" +
                      dato.Fecha.Mes +
                      "/" +
                      dato.Fecha.Año}
                  </StyledTableCell>
                  <StyledTableCell align="right">{dato.Hora}</StyledTableCell>
                  <StyledTableCell align="right">
                    {dato.MontoTotal.toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {" "}
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "yellow", color: "black" }}
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
    </div>
  );
};
