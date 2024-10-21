import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./App.css";
import Dashboard from "./pages/dashboard";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Registro from "./pages/registro";
import { UserProvider } from "./context/AuthContext/AuthContext";
import MeuPainel from "./pages/meu-painel";
import { DataProvider } from "./context/DataContext/DataContext";
import { DataRevenueProvider } from "./context/ExpensesContext/ExpenseContext";
ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  return (
    <>
      <UserProvider>
        <DataRevenueProvider>
          <DataProvider>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/meu-painel" element={<MeuPainel />} />
            </Routes>
          </DataProvider>
        </DataRevenueProvider>
      </UserProvider>
    </>
  );
}

export default App;
