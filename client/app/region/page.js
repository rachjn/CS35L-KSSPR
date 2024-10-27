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
      {/* Profile Link Square */}
      <Link
        href="/profile"
        className="fixed top-4 right-4 w-16 h-16 border border-black bg-gray-600 flex items-center justify-center hover:bg-gray-700 transition-colors"
      >
        <LuUser className="w-8 h-8 text-white" />
      </Link>

      {/* Region Grid */}
      <div className="grid grid-cols-3">
        <RegionSquare name="North America" color="blue" />
        <RegionSquare name="South America" color="green" />
        <RegionSquare name="Europe" color="red" />
        <RegionSquare name="Africa" color="yellow" />
        <RegionSquare name="Asia" color="purple" />
        <RegionSquare name="Oceania" color="cyan" />
        <RegionSquare name="Antarctica" color="white" />
        <RegionSquare name="Mars" color="orange" />
        <RegionSquare name="Jupiter" color="brown" />
      </div>
    </PageShell>
  );
}
