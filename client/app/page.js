// import { PageShell } from "@/components/PageShell";
// import { Text } from "@/components/Text";
// import Link from "next/link";
// import { LuUser } from "react-icons/lu";

// function RegionSquare({ name, color }) {
//   // Convert the region name to a URL-friendly format
//   const regionParam = name.toLowerCase().replace(/\s+/g, '-');

//   return (
//     <Link
//       href={`/game?region=${regionParam}`}
//       className="flex items-center justify-center border border-black h-24 hover:opacity-80 transition-opacity"
//       style={{ backgroundColor: color }}
//     >
//       <Text>{name}</Text>
//     </Link>
//   );
// }

// export default function Region() {
//   return (
//     <PageShell title="pick a region">
//       {/* Profile Link Square */}
//       <Link
//         href="/profile"
//         className="fixed top-8 right-8 w-24 h-24 border border-black bg-gray-600 flex items-center justify-center hover:bg-gray-700 transition-colors"
//       >
//         <LuUser className="w-8 h-8 text-white" />
//       </Link>

//       {/* Region Grid */}
//       <div className="grid grid-cols-3">
//         <RegionSquare name="North America" color="blue" />
//         <RegionSquare name="South America" color="green" />
//         <RegionSquare name="Europe" color="red" />
//         <RegionSquare name="Africa" color="yellow" />
//         <RegionSquare name="Asia" color="purple" />
//         <RegionSquare name="Oceania" color="cyan" />
//         <RegionSquare name="Antarctica" color="white" />
//         <RegionSquare name="Mars" color="orange" />
//         <RegionSquare name="Jupiter" color="brown" />
//       </div>
//     </PageShell>
//   );
// }

import { PageShell } from "@/components/PageShell";
import { Text } from "@/components/Text";
import Link from "next/link";
import { LuCheck } from "react-icons/lu";

export default function Home() {
  return (
    <PageShell
      title={
        <>
          <div>Oops!</div>
          <div>I had an acc(id)ent</div>
        </>
      }
    >
      <div
        id="robot-box"
        className="flex gap-4 border border-black p-4 bg-cap-blue"
      >
        {/* ON HOVER - display checkmark */}
        <Link
          id="checkbox"
          className="h-10 w-10 border border-black bg-white flex items-center justify-center group"
          href="/region"
        >
          <LuCheck className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        <Text className="text-4xl">i am not a robot</Text>
      </div>

      <div className="mt-4 flex">
        <button className="bg-gray-600 py-1 px-8 border-black">
          <Text className="text-xl">sign in</Text>
        </button>
        <button className="ml-auto bg-gray-600 py-1 px-8 border-black">
          <Text className="text-xl">about</Text>
        </button>
      </div>
    </PageShell>
  );
}