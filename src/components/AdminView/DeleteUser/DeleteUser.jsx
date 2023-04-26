import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BDContext } from "../../../context/BDContext";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./DeleteUser.css";
import { Button } from "@mui/material";

export const DeleteUser = () => {
  const navigate = useNavigate();
  const { usersList, deleteUser } = useContext(BDContext);

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

  const showVendedores = () => {
    //FUNCION PARA MOSTRAR SOLO LOS VENDEDORES Y NO EL ADMINISTRADOR
    const show = usersList.map((row) => {
      if (row.TipoUsuario == "Vendedor") {
        return (
          <StyledTableRow key={row.id}>
            <StyledTableCell component="th" scope="row">
              {row.Rut}
            </StyledTableCell>
            <StyledTableCell align="left">{row.Contraseña}</StyledTableCell>
            <StyledTableCell align="left">
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteUser(row.id)}
              >
                ELIMINAR
              </Button>
            </StyledTableCell>
          </StyledTableRow>
        );
      }
    });
    return show;
  };

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
      <label style={{ marginBottom: "70px" }}> ELIMINAR VENDEDOR</label>

      <div className="table" style={{ width: "50%", margin: "0 auto" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>RUT VENDEDOR</StyledTableCell>
                <StyledTableCell align="left">CONTRASEÑA</StyledTableCell>
                <StyledTableCell align="left">OPCIONES</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>{showVendedores()}</TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
