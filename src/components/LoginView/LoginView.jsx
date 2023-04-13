import "./LoginView.css";
import {getFirestore,getDocs,collection} from 'firebase/firestore';
import {useState, useEffect} from "react";



export const LoginView = () => {

    const [usersList, setUserList] = useState([]);

    const getUsuarios = () =>{
        const db = getFirestore();
        const querySnapshot = collection(db, "Usuarios");
        getDocs(querySnapshot)
        .then((response)=>{
            const listUsers = response.docs.map((doc)=>{return doc.data()})
            console.log(listUsers)
        })
        .catch((error)=>console.log(error))
        
    };

    useEffect(() =>{
        console.log("sdfg");
        getUsuarios();
    })

    return (
        <div
            style={{
                backgroundImage: `url("https://images7.alphacoders.com/374/374296.jpg")`,
            }}
        >
            <div className="login-container">
                <form>
                    <h1>Iniciar sesión</h1>
                    <div className="form-group">
                        <label name="email">Rut</label>
                        <input id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label name="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                        />
                    </div>
                    <button type="submit">Ingresar</button>
                </form>
            </div>
        </div>
    );
};
