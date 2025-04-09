import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

export default function Dashboard({onLogoutSuccess}) {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    navigate(`/${page}`); 
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogoutSuccess();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Bienvenido al Dashboard</h2>
      <div className="dashboard-buttons">
        <button
          className="dashboard-button"
          onClick={() => handleNavigate("users")}
        >
          Usuarios
        </button>
        <button
          className="dashboard-button"
          onClick={() => handleNavigate("prestamos")}
        >
          Préstamos
        </button>
        <button
          className="dashboard-button"
          onClick={() => handleNavigate("materials")}
        >
          Materiales
        </button>
        <button
          className="dashboard-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
