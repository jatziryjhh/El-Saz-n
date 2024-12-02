import { useState, useEffect } from "react";
import axios from "axios";
import UserTableRow from "./UserTableRow";
import EditUserModal from "../modal/UsuariosModal";
import CreateUserModal from "../modal/UsuarioRegistroModal";  

export default function UserTable() {
  const [datosUsuarios, setDatosUsuarios] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);  

  useEffect(() => { 
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get("http://localhost:8080/api/usuario/", config)
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          const usuariosTransformados = response.data.data.map((usuario) => ({
            id_usuario: usuario.id,
            nombre: usuario.nombre,
            apellidop: usuario.apellidop,
            apellidom: usuario.apellidom,
            rol: usuario.rol.nombre,
            status: usuario.status,
            correo: usuario.correo,
          }));
          setDatosUsuarios(usuariosTransformados);
          console.log("Datos obtenidos:", usuariosTransformados);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  const handleEdit = (id) => {
    const userToEdit = datosUsuarios.find((usuario) => usuario.id_usuario === id);
    setEditingUser(userToEdit);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = (updatedUser) => {
    axios
      .put(
        `http://localhost:8080/api/usuario/${updatedUser.id_usuario}`,
        updatedUser,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then(() => {
        setDatosUsuarios((prev) =>
          prev.map((user) =>
            user.id_usuario === updatedUser.id_usuario ? { ...user, ...updatedUser } : user
          )
        );
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error al guardar cambios:", error);
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`http://localhost:8080/api/usuario/${id}`, config)
      .then(() => {
        setDatosUsuarios(datosUsuarios.filter((usuario) => usuario.id_usuario !== id));
      })
      .catch((error) => {
        console.error("Error al eliminar el usuario:", error);
      });
  };

  const handleSaveNewUser = (newUser) => {
    axios
      .post("http://localhost:8080/api/usuario/registro", newUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setDatosUsuarios((prev) => [...prev, response.data]);
        setIsCreateModalOpen(false); 
        window.location.reload();

      })
      .catch((error) => {
        console.error("Error al agregar el nuevo usuario:", error);
      });
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setIsCreateModalOpen(true)} 
          className="bg-amber-500 text-white px-4 py-2 rounded"
        >
          Añadir Usuario
        </button>
      </div>
      <div className="mb-6"></div>
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datosUsuarios.map((usuario) => (
            <UserTableRow
              key={usuario.id_usuario}
              props={usuario}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={editingUser}
        onSave={handleSaveChanges}
      />

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveNewUser}
      />
    </>
  );
}
