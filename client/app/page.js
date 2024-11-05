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
        <Link href="/login" className="bg-gray-600 py-1 px-8 border-black">
          <Text className="text-xl">sign in</Text>
        </Link>
        <Link href="/about" className="ml-auto bg-gray-600 py-1 px-8 border-black">
          <Text className="text-xl">about</Text>
        </Link>
      </div>
    </PageShell>
  );
}
