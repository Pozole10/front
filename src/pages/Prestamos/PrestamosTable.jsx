import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/MaterialsTable.css"; // Asegúrate de agregar la ruta del archivo de estilos

export default function PrestamosTable() {
  const [prestamos, setPrestamos] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api-prestamos-n9ke.onrender.com/prestamos/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPrestamos(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los préstamos:", error);
      });
  }, []);

  const handleEliminar = (id) => {
    axios
      .delete(`https://api-prestamos-n9ke.onrender.com/prestamosDelete/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      }) 
      .then(() => {
        setPrestamos(prestamos.filter((prestamo) => prestamo.id !== id));
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar el préstamo:", error);
      });
  };

  const handleEditar = (id) => {
    navigate(`/prestamosEdit/${id}`);
  };

  const handleCrear = () => {
    navigate("/prestamosCreate");
  };

  return (
    <div className="materiales-container">
      <h2>Lista de Préstamos</h2>
      <button className="create-button" onClick={handleCrear}>
        Crear Préstamo
      </button>
      <table className="materiales-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Material</th>
            <th>ID Usuario</th>
            <th>Fecha Préstamo</th>
            <th>Fecha Devolución</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.length > 0 ? (
            prestamos.map((prestamo) => (
              <tr key={prestamo.id}>
                <td>{prestamo.id}</td>
                <td>{prestamo.id_material}</td>
                <td>{prestamo.id_usuario}</td>
                <td>{new Date(prestamo.fecha_prestamo).toLocaleDateString()}</td>
                <td>{new Date(prestamo.fecha_devolucion).toLocaleDateString()}</td>
                <td>{prestamo.estado_prestamo}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEditar(prestamo.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleEliminar(prestamo.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No hay préstamos registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
