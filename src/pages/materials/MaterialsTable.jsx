import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/MaterialsTable.css"; // Asegúrate de agregar la ruta del archivo de estilos

export default function MaterialsTable() {
  const [materiales, setMateriales] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener la lista de materiales
    axios
      .get("https://api-prestamos-n9ke.onrender.com/materials", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMateriales(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los materiales:", error);
      });
  }, []);

  const handleEliminar = (id) => {
    // Eliminar el material
    axios
      .delete(`https://api-prestamos-n9ke.onrender.com/materialsDelete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setMateriales((prevMateriales) =>
          prevMateriales.filter((material) => material.id !== id)
        );
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar el material:", error);
      });
  };

  const handleEditar = (id) => {
    // Redirigir a la página de edición con el ID del material
    navigate(`/materialsEdit/${id}`);
  };

  const handleCrear = () => {
    // Redirigir a la página de creación de materiales
    navigate("/materialsCreate");
  };

  return (
    <div className="materiales-container">
      <h2>Lista de Materiales</h2>
      <button className="create-button" onClick={handleCrear}>
        Crear Material
      </button>
      <table className="materiales-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Tipo de Material</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {materiales.map((material) => (
            <tr key={material.id}>
              <td>{material.id}</td>
              <td>{material.tipo_material}</td>
              <td>{material.marca}</td>
              <td>{material.modelo}</td>
              <td>{material.estado}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEditar(material.id)}
                >
                  Editar
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleEliminar(material.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
