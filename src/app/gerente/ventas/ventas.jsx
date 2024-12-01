import  { useEffect, useState } from 'react';
import axios from 'axios';
import VentaCard from '../../../components/ventas/ventaCard';

const Ventas = () => {
  const [ventasTotales, setVentasTotales] = useState({
    totalMensual: 0,
    totalAnual: 0,
    totalSemanal: 0,
  });

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Verifica si el token se obtiene correctamente

        const response = await axios.get("http://localhost:8080/api/pedido/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Datos de la respuesta:', response.data);
        // Verifica la estructura de la respuesta
        if (response.data && Array.isArray(response.data.data)) {
          const pedidosCompletados = response.data.data.filter(pedido => pedido.status === "Completado");
          console.log('Pedidos completados:', pedidosCompletados);

          if (pedidosCompletados.length > 0) {
            const totalMensual = pedidosCompletados.reduce((acc, pedido) => {
              if (isCurrentMonth(new Date(pedido.fecha_pedido))) {
                return acc + pedido.total_pedido;
              }
              return acc;
            }, 0);

            const totalAnual = pedidosCompletados.reduce((acc, pedido) => {
              if (isCurrentYear(new Date(pedido.fecha_pedido))) {
                return acc + pedido.total_pedido;
              }
              return acc;
            }, 0);

            const totalSemanal = pedidosCompletados.reduce((acc, pedido) => {
              if (isCurrentWeek(new Date(pedido.fecha_pedido))) {
                return acc + pedido.total_pedido;
              }
              return acc;
            }, 0);

            setVentasTotales({
              totalMensual,
              totalAnual,
              totalSemanal,
            });
          } else {
            console.log('No hay pedidos completados.');
          }
        } else {
          console.error('La respuesta no es un array o no tiene la estructura esperada:', response.data.data);
        }
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
      }
    };
    
    fetchPedidos();
  }, []); // Solo un `useEffect` al nivel del componente

  // Funciones para verificar fechas
  const isCurrentMonth = (date) => {
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  };

  const isCurrentYear = (date) => {
    const now = new Date();
    return date.getFullYear() === now.getFullYear();
  };

  const isCurrentWeek = (date) => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(now.setDate(now.getDate() + 6));
    return date >= startOfWeek && date <= endOfWeek;
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {ventasTotales.totalMensual || ventasTotales.totalAnual || ventasTotales.totalSemanal ? (
        <>
          <VentaCard props={{ periodo: 'Mensual', total: ventasTotales.totalMensual.toFixed(2) }} />
          <VentaCard props={{ periodo: 'Anual', total: ventasTotales.totalAnual.toFixed(2) }} />
          <VentaCard props={{ periodo: 'Semanal', total: ventasTotales.totalSemanal.toFixed(2) }} />
        </>
      ) : (
        <p>No hay datos de ventas disponibles</p>
      )}
    </div>
  );
};

export default Ventas;
