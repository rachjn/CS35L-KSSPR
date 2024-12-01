import { HomeButton } from "@/components/HomeButton";
import Link from "next/link";
import { LuUser } from "react-icons/lu";

function RegionSquare({ name, bgColor }) {
  // Convert the region name to a URL-friendly format
  const regionParam = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link
      href={`/game?region=${regionParam}`}
      className={`${bgColor} border border-white border-opacity-30 text-lg shadow-md flex items-center text-dark-brown lowercase px-4 justify-center rounded-lg py-14 hover:scale-[105%] transform transition-transform duration-200`}
    >
      <div>{name}</div>
    </Link>
  );
}

export default function Region() {
  return (
    <>
      <HomeButton />
      {/* Profile Link Square */}
      <Link href="/profile" className="absolute right-12 top-8 p-2">
        <LuUser className="w-12 h-12 text-dark-brown" />
      </Link>

      <div className="flex justify-center items-center h-screen flex-col">
        <div className="mb-8 text-5xl font-bold text-dark-brown ">
          choose a region
        </div>
        {/* Region Grid */}
        <div className="grid grid-cols-3 justify-center gap-3">
          <RegionSquare name="North America" bgColor={"bg-sq1"} />
          <RegionSquare name="South America" bgColor={"bg-sq2"} />
          <RegionSquare name="Europe" bgColor={"bg-sq3"} />
          <RegionSquare name="Africa" bgColor={"bg-sq2"} />
          <RegionSquare name="Asia" bgColor={"bg-sq3"} />
          <RegionSquare name="Oceania" bgColor={"bg-sq4"} />
          <RegionSquare name="Caribbean" bgColor={"bg-sq3"} />
          <RegionSquare name="Middle East" bgColor={"bg-sq4"} />
          <RegionSquare name="Central America" bgColor={"bg-sq5"} />
        </div>
      </div>
    </>
  );
}
