import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/PrestamosEdit.css"; // Asegúrate de agregar la ruta del archivo de estilos


export default function PrestamosEdit() {
  const [prestamo, setPrestamo] = useState({
    id_material: 0,
    id_usuario: 0,
    fecha_prestamo: "",
    fecha_devolucion: "",
    estado_prestamo: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://api-prestamos-n9ke.onrender.com/prestamos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPrestamo(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos del préstamo:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrestamo({
      ...prestamo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`https://api-prestamos-n9ke.onrender.com/prestamosUpdate/${id}`, prestamo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Préstamo actualizado:", response.data);
        navigate("/prestamos");
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar el préstamo:", error);
      });
  };

  return (
    <div className="edit-prestamo-container">
      <h2>Editar Préstamo</h2>
      <form onSubmit={handleSubmit} className="edit-prestamo-form">
        <div className="form-group">
          <label htmlFor="id_material">ID del Material:</label>
          <input type="number" id="id_material" name="id_material" value={prestamo.id_material} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="id_usuario">ID del Usuario:</label>
          <input type="number" id="id_usuario" name="id_usuario" value={prestamo.id_usuario} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="fecha_prestamo">Fecha de Préstamo:</label>
          <input type="datetime-local" id="fecha_prestamo" name="fecha_prestamo" value={prestamo.fecha_prestamo} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="fecha_devolucion">Fecha de Devolución:</label>
          <input type="datetime-local" id="fecha_devolucion" name="fecha_devolucion" value={prestamo.fecha_devolucion} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="estado_prestamo">Estado del Préstamo:</label>
          <input type="text" id="estado_prestamo" name="estado_prestamo" value={prestamo.estado_prestamo} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-button">Actualizar Préstamo</button>
      </form>
    </div>
  );
}
