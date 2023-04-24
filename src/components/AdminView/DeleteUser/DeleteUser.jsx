import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
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

export const DeleteUser = () => {
    const navigate = useNavigate();
    const { usersList, deleteUser } = useContext(BDContext);
    const [datosInput, setDatosInput] = useState(0);

    const HandleInputChange = (event) => {
        //GUARDAR LOS DATOS TECLEADOS DE LOS INPUTS EN EL STATE
        setDatosInput({
            ...datosInput,
            [event.target.name]: event.target.value,
        });
    };

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
                        <StyledTableCell align="right">
                            {row.Contraseña}
                        </StyledTableCell>
                    </StyledTableRow>
                );
            }
        });
        return show;
    };

    const authDeleteUser = (rut) => {
        const doc = usersList.map((dato) => {
            if (dato.Rut == rut.RutDelete && dato.TipoUsuario == "Vendedor") {
                deleteUser(dato.id);
            }
        });
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

            <div className="table">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>RUT VENDEDOR</StyledTableCell>
                                <StyledTableCell align="right">
                                    CONTRASEÑA
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{showVendedores()}</TableBody>
                    </Table>
                </TableContainer>
            </div>
            <label style={{ fontSize: "30px", marginTop: "40px" }}>
                RUT DEL USUARIO A ELIMINAR
            </label>
            <input
                style={{
                    width: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "20px auto",
                }}
                name="RutDelete"
                id="RutDelete"
                type="number"
                placeholder="EJEMPLO: 123456789"
                onChange={HandleInputChange}
            ></input>
            <button
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "20px",
                    height: "30px",
                    width: "100px",
                    margin: "0 auto",
                }}
                onClick={() => authDeleteUser(datosInput)} //LE ENVIÓ EL RUT DEL VENDEDOR AL AUTH
            >
                ELIMINAR
            </button>
        </div>
    );
};
