import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./App.css";
import DashboardHome from "./pages/home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Registro from "./pages/registro";
import { UserProvider } from "./context/AuthContext/AuthContext";
import MeuPainel from "./pages/meu-painel";
import { DataProvider } from "./context/DataContext/DataContext";
import { ToastContainer } from "react-toastify";
ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  return (
    <>
      <UserProvider>
        <DataProvider>
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/meu-painel" element={<MeuPainel />} />
          </Routes>
          <ToastContainer />
        </DataProvider>
      </UserProvider>
    </>
  );
}

export default App;
