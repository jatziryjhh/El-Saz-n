export default function ItemCard() {
  return (
    <div className="bg-white cursor-pointer w-56 h-60 rounded-lg">
      <figure className="relative mb-2 w-full h-4/5">
        <span
          className="absolute bottom-0 left-0 bg-white/60 rounded-lg 
                text-black text-xs
                m-2 px-3 py-0.5"
        >
          Categoria
        </span>
        <img
          className="w-full h-full object-cover rounded-lg "
          src="https://editorialtelevisa.brightspotcdn.com/dims4/default/10ea439/2147483647/strip/true/crop/706x706+177+0/resize/1000x1000!/quality/90/?url=https%3A%2F%2Fk2-prod-editorial-televisa.s3.us-east-1.amazonaws.com%2Fbrightspot%2F6b%2F66%2Fbadcc27245e59fc1c0fd1ca34ae3%2Fcafe.jpg"
          alt="nombre"
        />
      </figure>
      <p className="flex justify-between">
        <span className="text-sm font-light">Nombre</span>
        <span className=" text-lg font-medium">$150</span>
      </p>
    </div>
  );
}
