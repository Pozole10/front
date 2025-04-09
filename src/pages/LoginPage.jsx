import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

export default function LoginPage({ onLoginSuccess }) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      correoElectronico: correo,
      contrasena: contrasena,
    };

    try {
      const response = await axios.post(
        "https://api-prestamos-n9ke.onrender.com/users/login",
        loginData, // ← JSON directo
        {
          headers: {
            "Content-Type": "application/json", // ← MUY IMPORTANTE
          },
        }
      );

      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        onLoginSuccess(response.data.access_token);
        navigate("/dashboard");
      } else {
        alert("Login fallido");
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error al iniciar sesión. Revisa tus credenciales.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">¡Bienvenido!</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Correo electrónico"
            className="login-input"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="login-input"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
        <p className="login-register-text">
          ¿No tienes cuenta?{" "}
          <span
            className="login-register-link"
            onClick={() => navigate("/register")}
          >
            Regístrate
          </span>
        </p>
      </div>
    </div>
  );
}
