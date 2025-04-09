import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UsersTable from "./pages/Users/UsersTable.jsx";
import UsersEdit from "./pages/Users/UsersEdit.jsx";
import MaterialsTable from "./pages/materials/MaterialsTable.jsx";
import MaterialsEdit from "./pages/materials/MaterialsEdit.jsx";
import MaterialsCreate from "./pages/materials/MaterialsCreate.jsx";
import PrestamosCreate from "./pages/Prestamos/PrestamosCreate.jsx";
import PrestamosEdit from "./pages/Prestamos/PrestamosEdit.jsx";
import PrestamosTable from "./pages/Prestamos/PrestamosTable.jsx";

const App = () => {
  const [token, setToken] = useState(null);

  // Función que se pasa a LoginPage para actualizar el estado cuando el login es exitoso
  const handleLoginSuccess = (token) => {
    setToken(token);
  };

  const handleLogoutSuccess = () => {
    setToken(null); // Limpiar el token en el estado
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log(storedToken);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas: Login y Register */}
          {!token ? (
            <>
              <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess}  />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              {/* Rutas protegidas: Dashboard y Users */}
              <Route path="/dashboard" element={<Dashboard onLogoutSuccess={handleLogoutSuccess} />} />
              <Route path="/users" element={<UsersTable />} />
              <Route path="/usersEdit/:id" element={<UsersEdit />} />
              <Route path="/materials" element={<MaterialsTable />} />
              <Route path="/materialsEdit/:id" element={<MaterialsEdit />} />
              <Route path="/materialsCreate" element={<MaterialsCreate />} />
              <Route path="/prestamos" element={<PrestamosTable />} />
              <Route path="/prestamosEdit/:id" element={<PrestamosEdit />} />
              <Route path="/prestamosCreate" element={<PrestamosCreate />} />
              {/* Redirigir cualquier ruta no encontrada al dashboard si ya hay token */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<App />);
