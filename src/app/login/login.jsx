import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signin",
        {
          correo,
          contrasena,
        }
      );

      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("Usuario", response.data.data.usuario.id);
      window.location.href = "/";
    } catch (err) { 
      setError("Credenciales incorrectas o problema en el servidor");
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
            Inicia sesión
          </h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full px-4 py-2 border border-brown-500 rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="w-full px-4 py-2 border border-brown-500 rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-2 rounded-md hover:bg-orange-600 transition"
            >
              Inicia sesión
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-700">
            No tienes cuenta?{" "}
            <a href="/register" className="text-orange-500 font-semibold">
              Crear Cuenta
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
