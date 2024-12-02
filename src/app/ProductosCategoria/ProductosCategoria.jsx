import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "../../components/banner/slider";
import ItemCard from "../../components/card/itemcard";

export default function ProductosCategoria() {
  const { categoria } = useParams(); // Obtener la categoría desde la URL
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/producto/visualizar"
      );
      const data = await response.json();
      console.log("Productos cargados:", data.data);

      // Filtrar productos por categoría y cantidad_disponible > 0
      const productosFiltrados = data.data.filter(
        (producto) =>
          producto.categoria &&
          producto.categoria.nombrecategoria &&
          producto.categoria.nombrecategoria.toLowerCase() ===
            categoria.toLowerCase() &&
          producto.cantidad_disponible > 0 // Excluir productos sin stock
      );

      setProductos(productosFiltrados);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [categoria]); // Volver a cargar si cambia la categoría

  return (
    <>
      <Slider />
      <div className="flex-1 flex justify-center">
        <h1 className="font-bold text-amber-950 text-xl md:text-2xl mb-10">
          {categoria.charAt(0).toUpperCase() + categoria.slice(1)} - Productos
        </h1>
      </div>
      <div className="grid md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-screen-lg">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <ItemCard key={producto.id} props={producto} />
          ))
        ) : (
          <p>No hay productos disponibles en esta categoría.</p>
        )}
      </div>
    </>
  );
}
