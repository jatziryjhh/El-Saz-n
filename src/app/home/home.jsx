import { useEffect, useState } from "react";
import Slider from "../../components/banner/slider";
import ItemCard from "../../components/card/itemcard";

export default function Home() {
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/producto/visualizar"
      );
      const data = await response.json();
      console.log("Productos cargados:", data.data);
      setProductos(data.data);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <>
      <Slider />
      <div className="flex-1 flex justify-center">
        <h1 className="font-bold text-amber-950 text-xl md:text-2xl mb-10">
          Productos
        </h1>
      </div>
      <div className="grid md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-screen-lg">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <ItemCard key={producto.id} props={producto} />
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
    </>
  );
}
