import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/MaterialsEdit.css"; // Asegúrate de agregar la ruta del archivo de estilos

export default function MaterialsEdit() {
  const [material, setMaterial] = useState({
    tipo_material: "",
    marca: "",
    modelo: "",
    estado: "Disponible",
    nombre: "",
    descripcion: "",
    cantidad: 0,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://api-prestamos-n9ke.onrender.com/materials/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setMaterial(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos del material:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterial({
      ...material,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`https://api-prestamos-n9ke.onrender.com/materialsUpdate/${id}`, material, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Material actualizado:", response.data);
        navigate("/materials");
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar el material:", error);
      });
  };

  return (
    <div className="edit-material-container">
      <h2>Editar Material</h2>
      <form onSubmit={handleSubmit} className="edit-material-form">
        <div className="form-group">
          <label htmlFor="tipo_material">Tipo de Material:</label>
          <input type="text" id="tipo_material" name="tipo_material" value={material.tipo_material} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="marca">Marca:</label>
          <input type="text" id="marca" name="marca" value={material.marca} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="modelo">Modelo:</label>
          <input type="text" id="modelo" name="modelo" value={material.modelo} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="estado">Estado:</label>
          <select id="estado" name="estado" value={material.estado} onChange={handleChange} required>
            <option value="Disponible">Disponible</option>
            <option value="No Disponible">No Disponible</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={material.nombre} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea id="descripcion" name="descripcion" value={material.descripcion} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="cantidad">Cantidad:</label>
          <input type="number" id="cantidad" name="cantidad" value={material.cantidad} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-button">Actualizar Material</button>
      </form>
    </div>
  );
}
