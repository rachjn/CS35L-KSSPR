import { PageShell } from "@/components/PageShell";
import { Text } from "@/components/Text";
import Link from "next/link";
import { LuCheck } from "react-icons/lu";

export default function Home() {
  return (
    <>
      <div className="bg-[url('../public/new-bg.png')] bg-cover bg-center h-screen w-full">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-dark-brown text-6xl font-bold italic">oops!</div>
          <div className="text-dark-brown text-7xl font-bold">
            i had an acc<span className="text-light-brown">id</span>ent
          </div>

          <div className="mt-12 flex text-3xl font-bold flex gap-24">
            <Link
              href="/login"
              className="flex items-center justify-center text-lighter-brown rounded bg-dark-brown py-2 min-w-[35rem]"
            >
              <div className="">start</div>
            </Link>
            {/* <Link
              href="/about"
              className="flex items-center text-lighter-brown rounded bg-dark-brown px-20"
            >
              <div className="">about</div>
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
}
