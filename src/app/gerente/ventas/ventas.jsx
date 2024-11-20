import VentaCard from "../../../components/ventas/ventaCard";

export default function Ventas() {
  return (
    <>
      <h2 className="text-2xl font-semibold">Ventas totales:</h2>
      <div className="flex py-10 justify-center w-3/4 gap-8">
        <VentaCard props={{ periodo: "Anual", total: 1000 }} />
        <VentaCard props={{ periodo: "Mensual", total: 100 }} />
        <VentaCard props={{ periodo: "Semanal", total: 10 }} />
      </div>
    </>
  );
}
