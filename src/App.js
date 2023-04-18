import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginView } from "./components/LoginView/LoginView";
import { AdminView } from "./components/AdminView/AdminView";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginView />} />
                <Route path="/admin" element={<AdminView />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
