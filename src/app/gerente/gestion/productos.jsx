import { useState } from "react";

export default function CrearProductos() {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result); // Actualizar la vista previa con la imagen cargada
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-8 p-6 bg-neutral-50 min-h-screen">
      {/* Sección de Imagen */}
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
            onChange={handleImageChange} // Manejar el cambio de imagen
          />
        </div>
        <div className="w-full h-64 border border-gray-200 rounded-lg overflow-hidden shadow-md flex items-center justify-center">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Vista previa"
              className="object-cover max-h-full w-auto" // Controla el tamaño máximo
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
        <form className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
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
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-300"
            >
              <option value="postre">Postre</option>
              <option value="bebida">Bebida</option>
              <option value="comida">Comida</option>
            </select>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="cantidad" className="block font-medium text-gray-700">
                Cantidad
              </label>
              <input
                type="number"
                id="cantidad"
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
