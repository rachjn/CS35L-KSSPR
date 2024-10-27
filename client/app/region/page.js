import { PageShell } from "@/components/PageShell";
import { Text } from "@/components/Text";

function RegionSquare({ name, color }) {
  return (
    <button
      className="flex items-center justify-center border border-black h-24"
      style={{ backgroundColor: color }}
    >
      <Text>{name}</Text>
    </button>
  );
}

export default function Region() {
  return (
    <PageShell title="pick a region">
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
