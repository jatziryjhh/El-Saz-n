import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; 

export default function CrearProductos() {
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    nombre_producto: "",
    descripcion: "",
    precio: "",
    cantidad_disponible: "",
    categoria_id: "", 
  });
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login"; 
      return;
    }

    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/categoria/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);
        setCategorias(response.data.data);
      } catch (error) {
        console.error("Error al cargar las categorías", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); 

    if (!token) {
      console.error("Token de autenticación no encontrado");
      return;
    }

    const productData = {
      nombre_producto: formData.nombre_producto,
      descripcion: formData.descripcion,
      precio: parseFloat(formData.precio),
      cantidad_disponible: parseInt(formData.cantidad_disponible),
      categoria: { id_categoria: parseInt(formData.categoria_id) }, 
      imagen: previewImage,
    };

    console.log("Datos que se van a enviar:", productData);

    try {
      const response = await axios.post("http://localhost:8080/api/producto/", productData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log("Producto creado:", response.data);
      toast.success("Producto registrado");
      setFormData({
        nombre_producto: "",
        descripcion: "",
        precio: "",
        cantidad_disponible: "",
        categoria_id: "",
      });
      setPreviewImage(null);

    } catch (error) {
      console.error("Error al crear producto:", error);
      toast.error("Error al crear el producto.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-8 p-6 bg-neutral-50 min-h-screen">
      <Toaster position="bottom-right" /> 
      <div className="w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Inserta un nuevo producto</h1>
        <div className="mb-4">
          <label htmlFor="imagen" className="block font-medium text-gray-700 mb-2">
            Imagen
          </label>
          <input
            type="file"
            id="imagen"
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-300"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="w-full h-64 border border-gray-200 rounded-lg overflow-hidden shadow-md flex items-center justify-center">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Vista previa"
              className="object-cover max-h-full w-auto"
            />
          ) : (
            <div className="flex items-center justify-center text-gray-500">
              No hay imagen seleccionada
            </div>
          )}
        </div>
      </div>

      {/* Formulario */}
      <div className="w-full lg:w-1/2 bg-white p-6 shadow-lg rounded-lg border border-gray-200">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre_producto" className="block font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="nombre_producto"
              name="nombre_producto"
              value={formData.nombre_producto}
              onChange={handleInputChange}
              placeholder="Nombre"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-300"
            />
          </div>
          <div>
            <label htmlFor="categoria" className="block font-medium text-gray-700">
              Categoría
            </label>
            <select
              id="categoria"
              name="categoria_id"
              value={formData.categoria_id}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-300"
            >
              {/* Renderizar categorías dinámicamente */}
              <option value="">Selecciona una categoría</option>
              {Array.isArray(categorias) && categorias.length > 0 && categorias.map((categoria) => (
                <option key={categoria.id_categoria} value={categoria.id_categoria}>
                  {categoria.nombrecategoria}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="cantidad_disponible" className="block font-medium text-gray-700">
                Cantidad
              </label>
              <input
                type="number"
                id="cantidad_disponible"
                name="cantidad_disponible"
                value={formData.cantidad_disponible}
                onChange={handleInputChange}
                placeholder="1"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-300"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="precio" className="block font-medium text-gray-700">
                Precio
              </label>
              <input
                type="text"
                id="precio"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                placeholder="$50.00"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-300"
              />
            </div>
          </div>
          <div>
            <label htmlFor="descripcion" className="block font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              placeholder="Descripción..."
              rows="3"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-300"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-300"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
