import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./App.css";
import Dashboard from "./pages/dashboard";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Registro from "./pages/registro";
import { UserProvider } from "./context/AuthContext/AuthContext";
ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
