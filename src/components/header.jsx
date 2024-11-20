// eslint-disable-next-line react/prop-types
export default function Header({ titulo }) {
  return (
    <header className="flex items-center justify-between min-w-full h-20 px-4 shadow-md mb-10">
      <div className="flex-1 flex justify-center">
        <h1 className="font-bold text-amber-950 ml-24 text-xl md:text-3xl">{titulo}</h1>
      </div>
      <img className="h-20 w-auto" src="/img/icons/logo.png" alt="logo" />
    </header>
  );
}
