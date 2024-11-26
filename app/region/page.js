import { PageShell } from "@/components/PageShell";
import { Text } from "@/components/Text";
import Link from "next/link";
import { LuUser } from "react-icons/lu";

function RegionSquare({ name, color }) {
  // Convert the region name to a URL-friendly format
  const regionParam = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link
      href={`/game?region=${regionParam}`}
      className="flex items-center justify-center border border-black h-24 hover:opacity-80 transition-opacity"
      style={{ backgroundColor: color }}
    >
      <Text>{name}</Text>
    </Link>
  );
}

export default function Region() {
  return (
    <PageShell title="pick a region">
      {/* Profile and Leaderboard Buttons */}
  <div className="fixed top-4 right-4 flex items-center gap-2">
    {/* Leaderboard Button */}
    <Link
      href="/leaderboard"
      className="w-16 h-16 border border-black bg-yellow-500 flex items-center justify-center hover:bg-yellow-600 transition-colors rounded"
    >
      👑
    </Link>

    {/* Profile Button */}
    <Link
      href="/profile"
      className="w-16 h-16 border border-black bg-gray-600 flex items-center justify-center hover:bg-gray-700 transition-colors rounded"
    >
      <LuUser className="w-8 h-8 text-white" />
    </Link>
  </div>


      {/* Back Button */}
      <Link
        href="/"
        className="fixed top-4 left-4 w-16 h-16 border border-black bg-gray-600 flex items-center justify-center hover:bg-gray-700 transition-colors"
      >
        <Text className="text-xl text-white">Back</Text>
      </Link>


      

      {/* Region Grid */}
      <div className="grid grid-cols-3">
        <RegionSquare name="North America" color="blue" />
        <RegionSquare name="South America" color="green" />
        <RegionSquare name="Europe" color="red" />
        <RegionSquare name="Africa" color="yellow" />
        <RegionSquare name="Asia" color="purple" />
        <RegionSquare name="Oceania" color="cyan" />
        <RegionSquare name="Caribbean" color="white" />
        <RegionSquare name="Middle East" color="orange" />
        <RegionSquare name="Central America" color="brown" />
      </div>
    </PageShell>
  );
}
