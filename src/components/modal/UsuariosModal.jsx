/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function UsuariosModal({ isOpen, onClose, user, onSave }) {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    apellidop: "",
    apellidom: "",
    rol: "",
    status: "",
  });

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (user) {
      setFormData({
        id_usuario: user.id_usuario,
        nombre: user.nombre || "",
        correo: user.correo || "",
        apellidop: user.apellidop || "",
        apellidom: user.apellidom || "",
        rol: user.rol ? user.rol.id_rol : "", 
        status: user.status ? "true" : "false", 
      });
    }
  }, [user]);

  

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/rol/"); 
        const data = await response.json();
        if (data && data.data) {
          setRoles(data.data);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    if (isOpen) {
      fetchRoles();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Datos a enviar:", formData);
  
    const statusValue = formData.status === "true" ? 1 : 0;
  
    // Buscar el objeto del rol correspondiente en la lista de roles
    const selectedRole = roles.find((role) => role.id_role === parseInt(formData.rol, 10));
  
    const updatedFormData = {
      ...formData,
      status: statusValue,
      rol: selectedRole ? selectedRole : null, 
    };
  
    console.log("Datos actualizados para enviar:", updatedFormData);
  
    try {
      toast.success("Datos actualizados correctamente!");
      onSave(updatedFormData);
      toast.success("Usuario actualizado correctamente!");
      onClose();
    } catch (error) {
       toast.error("Hubo un error al guardar los datos.");
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Editar Usuario</h2>
          <div className="mb-4">
            <label htmlFor="nombre" className="block">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="apellidop" className="block">
              Apellido Paterno
            </label>
            <input
              type="text"
              id="apellidop"
              name="apellidop"
              value={formData.apellidop}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="apellidom" className="block">
              Apellido Materno
            </label>
            <input
              type="text"
              id="apellidom"
              name="apellidom"
              value={formData.apellidom}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="correo" className="block">
              Correo
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="rol" className="block">
              Rol
            </label>
            <select
              id="rol"
              name="rol"
              value={formData.rol || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Selecciona un rol</option>
              {roles.map((role) => (
                <option key={role.id_role} value={role.id_role}>
                  {role.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSubmit}
            >
              Guardar Cambios
            </button>
          </div>
        </div>
        <Toaster /> 
      </div>
    )
  );
}
