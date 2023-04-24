import { BDContext } from "./BDContext";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

export const AllContext = ({ children }) => {
    const [usersList, setUserList] = useState([]);

    const getUsuarios = () => {
        //ACCEDER A LOS USER DE LA DB DE FIRESTORE
        const db = getFirestore();
        const querySnapshot = collection(db, "Usuarios");
        getDocs(querySnapshot)
            .then((response) => {
                const listUsers = response.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                });
                setUserList(listUsers);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        setTimeout(() => {
            getUsuarios(); //HAGO UN TIMER PARA ALMACENAR LOS DATOS EN EL ARRAY LOCAL
        }, "2000");
    }, []);

    const deleteUser = (docDelete) => {
        console.log(docDelete);
        console.log("ASDF");
    };

    return (
        <BDContext.Provider value={{ usersList, getUsuarios, deleteUser }}>
            {children}
        </BDContext.Provider>
    );
};
