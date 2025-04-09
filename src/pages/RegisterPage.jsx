import axios from "axios"; // Importa Axios
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterPage.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [nombre, setNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const userData = {
      nombre: nombre,
      primerApellido: primerApellido,
      segundoApellido: segundoApellido,
      tipoUsuario: selectedOption,
      nombreUsuario: nombreUsuario,
      correoElectronico: email,
      contrasena: password,
      numeroTelefono: numeroTelefono,
      estatus: "Activo"
    };
    
    console.log("User Data:", userData);
    axios
      .post("https://api-prestamos-n9ke.onrender.com/usersCreate/", userData,{
        headers: {
          "Content-Type": "application/json",
        },
      })  
      .then((response) => {
        console.log("Respuesta del servidor:", response);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Hubo un error al enviar los datos:", error);
      });
    };
  return (
    <>
      <div className="register-container">
        <div className="register-box">
          <h2 className="register-title">¡Bienvenido!</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <input
              placeholder="Nombre(s)"
              className="register-input"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              placeholder="Apellido Paterno"
              className="register-input"
              value={primerApellido}
              onChange={(e) => setPrimerApellido(e.target.value)}
              required
            />
            <input
              placeholder="Apellido Materno"
              className="register-input"
              value={segundoApellido}
              onChange={(e) => setSegundoApellido(e.target.value)}
              required
            />
            <input
              placeholder="Nombre de Usuario"
              className="register-input"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              required
            />
            <input
              placeholder="Teléfono"
              className="register-input"
              value={numeroTelefono}
              onChange={(e) => setNumeroTelefono(e.target.value)}
              required
            />
            <select
              className="register-input"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              required
            >
              <option value="">-- Selecciona tu tipo de usuario --</option>
              <option value="Alumno">Alumno</option>
              <option value="Profesor">Profesor</option>
              <option value="Secretaria">Secretaria</option>
              <option value="Laboratorista">Laboratorista</option>
              <option value="Directivo">Directivo</option>
              <option value="Administrativo">Administrativo</option>
            </select>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="register-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="register-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="register-button">
              Registrarse
            </button>
          </form>
          <p className="register-login-text">
            ¿Ya tienes cuenta?{" "}
            <span
              className="register-login-link"
              onClick={() => navigate("/login")}
            >
              Inicia Sesión
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
