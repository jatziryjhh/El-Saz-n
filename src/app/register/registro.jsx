import  { useState } from "react";
import axios from "axios";

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidom: "",
    apellidop: "",
    correo: "",
    contrasena: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const payload = {
      ...formData,
      status: 1,
      rol: {
        id_role: 3, 
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/usuario/registro",
        payload
      );

      setSuccess("Usuario registrado con éxito" + response.data.message);
      setFormData({
        nombre: "",
        apellidom: "",
        apellidop: "",
        correo: "",
        contrasena: "",
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setError("Error al registrar usuario, verifica los datos " + err);
    }
  };

  return (
    <div
      className="h-screen w-3/4 bg-cover bg-center flex items-center justify-center rounded-lg"
      style={{
        backgroundImage: "url('/img/background/loginBg.png')",
      }}
    >
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            src="/img/icons/LoginLogoNoBG.png"
            alt="Cafetería El Sazón"
            className="w-32 mb-4"
          />
          <h1 className="text-2xl font-bold text-brown-700 mb-4 text-amber-800">
            Regístrate
          </h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-brown-500 rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="apellidop"
                placeholder="Apellido Paterno"
                value={formData.apellidop}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-brown-500 rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="apellidom"
                placeholder="Apellido Materno"
                value={formData.apellidom}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-brown-500 rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="correo"
                placeholder="Correo"
                value={formData.correo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-brown-500 rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="contrasena"
                placeholder="Contraseña"
                value={formData.contrasena}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-brown-500 rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-2 rounded-md hover:bg-orange-600 transition"
            >
              Registrarse
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-700">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-orange-500 font-semibold">
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
