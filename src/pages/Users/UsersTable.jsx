import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/UsersTable.css"; // Asegúrate de agregar la ruta del archivo de estilos

export default function UsersTable() {
  const [usuarios, setUsuarios] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();


  useEffect(() => {
    // Obtener la lista de usuarios
    axios
      .get("https://api-prestamos-n9ke.onrender.com/users",{
        headers: {
            Authorization: `Bearer ${token}`, 
          },
      })
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los usuarios:", error);
      });
  }, []);

  const handleEliminar = (id) => {
    // Eliminar el usuario
    axios
      .delete(`https://api-prestamos-n9ke.onrender.com/usersDelete/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      }) 
      .then(() => {
        setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar el usuario:", error);
      });
  };

  const handleEditar = (id) => {
    // Redirigir a la página de edición con el ID del usuario
    console.log("Editar usuario con ID:", id);
    navigate(`/usersEdit/${id}`)
  };

  return (
    <div className="usuarios-container">
      <h2>Lista de Usuarios</h2>
      <table className="usuarios-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Tipo Usuario</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Estatus</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.primerApellido} {usuario.segundoApellido}</td>
              <td>{usuario.tipoUsuario}</td>
              <td>{usuario.correoElectronico}</td>
              <td>{usuario.numeroTelefono}</td>
              <td>{usuario.estatus}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEditar(usuario.id)}
                >
                  Editar
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleEliminar(usuario.id)}
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
