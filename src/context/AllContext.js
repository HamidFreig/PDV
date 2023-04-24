import { BDContext } from "./BDContext";
import {
    getFirestore,
    getDocs,
    collection,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const AllContext = ({ children }) => {
    const [usersList, setUserList] = useState([]);
    const [productsList, setProductsList] = useState([]);
    const navigate = useNavigate();
    const db = getFirestore();
    const querySnapshotUsuarios = collection(db, "Usuarios");
    const querySnapshotProductos = collection(db, "Productos");

    const getUsuarios = () => {
        //ACCEDER A LOS USER DE LA DB DE FIRESTORE
        getDocs(querySnapshotUsuarios)
            .then((response) => {
                const listUsers = response.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                });
                setUserList(listUsers);
            })
            .catch((error) => console.log(error));
    };

    const getProductos = () => {
        getDocs(querySnapshotProductos)
            .then((response) => {
                const listProducts = response.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                });
                setProductsList(listProducts);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        setTimeout(() => {
            getUsuarios(); //HAGO UN TIMER PARA ALMACENAR LOS DATOS EN EL ARRAY LOCAL
            getProductos();
        }, "2000");
    }, []);

    const deleteUser = (docDelete) => {
        deleteDoc(doc(db, "Usuarios", docDelete)); //ELIMINO EL USUARIO CON EL DOCUMENTO COMPLETO
        Swal.fire({
            icon: "success",
            title: "VENDEDOR ELIMINADO CON EXITO",
            timer: 2000,
        });
        getUsuarios(); //REFRESCO LA BD
        navigate("/admin");
    };

    return (
        <BDContext.Provider
            value={{
                usersList,
                getUsuarios,
                deleteUser,
                productsList,
                setProductsList,
                getProductos,
            }}
        >
            {children}
        </BDContext.Provider>
    );
};
