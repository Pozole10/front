import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/PrestamosCreate.css"; // Asegúrate de agregar la ruta del archivo de estilos

export default function PrestamosCreate() {
  const [prestamo, setPrestamo] = useState({
    id_material: "",
    id_usuario: "",
    fecha_prestamo: new Date().toISOString().slice(0, 16), // Establece la fecha y hora actual en formato correcto
    fecha_devolucion: "",
    estado_prestamo: "Activo",
  });

  const [usuarios, setUsuarios] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [materialesOcupados, setMaterialesOcupados] = useState([]);
  const [errorFechaDevolucion, setErrorFechaDevolucion] = useState("");
  const token = localStorage.getItem('token')

  const navigate = useNavigate();

  // Obtener lista de usuarios, materiales y préstamos activos al cargar el componente
  useEffect(() => {
    axios
      .get("https://api-prestamos-n9ke.onrender.com/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setUsuarios(response.data))
      .catch((error) => console.error("Error al obtener usuarios:", error));

    axios
      .get("https://api-prestamos-n9ke.onrender.com/materials", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setMateriales(response.data))
      .catch((error) => console.error("Error al obtener materiales:", error));

    // Obtener los préstamos activos para verificar qué materiales están ocupados
    axios
      .get("https://api-prestamos-n9ke.onrender.com/prestamos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Filtramos los materiales ocupados, excluyendo aquellos cuyo estado no sea "Devuelto"
        const materialesOcupados = response.data.filter((prestamo) => prestamo.estado_prestamo !== "Devuelto")
          .map((prestamo) => prestamo.id_material);
        setMaterialesOcupados(materialesOcupados);
      })
      .catch((error) => console.error("Error al obtener préstamos activos:", error));
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si el campo modificado es fecha_devolucion, validar que sea mayor a fecha_prestamo
    if (name === "fecha_devolucion") {
      const fechaDevolucion = new Date(value);
      const fechaPrestamo = new Date(prestamo.fecha_prestamo);

      // Verificar que la fecha de devolución sea mayor a la fecha de préstamo
      if (fechaDevolucion <= fechaPrestamo) {
        setErrorFechaDevolucion("La fecha de devolución debe ser mayor a la fecha de préstamo.");
      } else {
        setErrorFechaDevolucion(""); // Resetear error si la fecha es válida
      }
    }

    setPrestamo({
      ...prestamo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar que no haya error en la fecha de devolución antes de enviar el formulario
    if (errorFechaDevolucion) {
      console.error("Fecha de devolución inválida");
      return;
    }

    axios
      .post("https://api-prestamos-n9ke.onrender.com/prestamosCreate", prestamo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Préstamo creado:", response.data);
        navigate("/prestamos");
      })
      .catch((error) => {
        console.error("Hubo un error al registrar el préstamo:", error);
      });
  };

  return (
    <div className="create-prestamo-container">
      <h2>Registrar Nuevo Préstamo</h2>
      <form onSubmit={handleSubmit} className="create-prestamo-form">
        <div className="form-group">
          <label htmlFor="id_material">Material:</label>
          <select
            id="id_material"
            name="id_material"
            value={prestamo.id_material}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un material</option>
            {materiales
              .filter((material) => !materialesOcupados.includes(material.id)) // Filtramos los materiales ocupados
              .map((material) => (
                <option key={material.id} value={material.id}>
                  {material.tipo_material}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="id_usuario">Usuario:</label>
          <select
            id="id_usuario"
            name="id_usuario"
            value={prestamo.id_usuario}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un usuario</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nombre} {/* Ajusta según la estructura de tu API */}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="fecha_prestamo">Fecha de Préstamo:</label>
          <input
            type="datetime-local"
            id="fecha_prestamo"
            name="fecha_prestamo"
            value={prestamo.fecha_prestamo}
            onChange={handleChange}
            required
            disabled // Esto deshabilita el campo
          />
        </div>

        <div className="form-group">
          <label htmlFor="fecha_devolucion">Fecha de Devolución:</label>
          <input
            type="datetime-local"
            id="fecha_devolucion"
            name="fecha_devolucion"
            value={prestamo.fecha_devolucion}
            onChange={handleChange}
            required
          />
          {errorFechaDevolucion && <p className="error">{errorFechaDevolucion}</p>} {/* Mostrar mensaje de error */}
        </div>

        <div className="form-group">
          <label htmlFor="estado_prestamo">Estado del Préstamo:</label>
          <select
            id="estado_prestamo"
            name="estado_prestamo"
            value={prestamo.estado_prestamo}
            onChange={handleChange}
            required
          >
            <option value="Activo">Activo</option>
            <option value="Vencido">Inactivo</option>
            <option value="Devuelto">Devuelto</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Registrar Préstamo
        </button>
      </form>
    </div>
  );
}
