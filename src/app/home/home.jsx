import Slider from "../../components/banner/slider";
import ItemCard from "../../components/card/itemcard";

export default function Home() {
  return (
    <>
      <Slider />
      <div className="flex-1 flex justify-center">
        <h1 className="font-bold text-amber-950 text-xl md:text-2xl mb-10">Productos</h1>
      </div>
      <div className="grid md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-screen-lg">
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
    </>
  );
}
