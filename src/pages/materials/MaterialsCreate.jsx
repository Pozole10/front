import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/MaterialsCreate.css"; // Asegúrate de agregar la ruta del archivo de estilos

const TipoMaterial = {
  Proyector: "Proyector",
  Extencion: "Extencion",
  Computadora: "Computadora",
  HDMI: "HDMI",
};


export default function MaterialsCreate() {
  const [material, setMaterial] = useState({
    tipo_material: "",
    marca: "",
    modelo: "",
    estado: "Disponible",
  });

  const navigate = useNavigate();

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
      .post("https://api-prestamos-n9ke.onrender.com/materialsCreate", material, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Material creado:", response.data);
        navigate("/materials");
      })
      .catch((error) => {
        console.error("Hubo un error al crear el material:", error);
      });
  };

  return (
    <div className="create-material-container">
      <h2>Registrar Nuevo Material</h2>
      <form onSubmit={handleSubmit} className="create-material-form">
      <div className="form-group">
          <label htmlFor="tipo_material">Tipo de Material:</label>
          <select
            id="tipo_material"
            name="tipo_material"
            value={material.tipo_material}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un tipo de material</option>
            {Object.keys(TipoMaterial).map((key) => (
              <option key={key} value={TipoMaterial[key]}>
                {TipoMaterial[key]}
              </option>
            ))}
          </select>
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

        <button type="submit" className="submit-button">Registrar Material</button>
      </form>
    </div>
  );
}
