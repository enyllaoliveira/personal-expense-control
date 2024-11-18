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
    <div className="flex flex-col py-2 sm:py-8 items-start sm:gap-8 gap-16 w-full max-w-[1440px] mx-auto px-4 md:px-5 tablet:px-2 sm:px-2">
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
    </div>
  );
}

export default App;
