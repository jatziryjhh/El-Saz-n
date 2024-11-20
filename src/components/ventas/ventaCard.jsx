export default function VentaCard(props) {
  // eslint-disable-next-line react/prop-types
  const { periodo, total } = props.props;
  return (
    <div className="flex flex-col justify-center items-center h-44 w-64 rounded-md bg-amber-800 hover:bg-amber-600 gap-5">
      <p className="text-2xl text-slate-300">{periodo}:</p>
      <p className="font-bold text-xl text-slate-200">${total}</p>
    </div>
  );
}
