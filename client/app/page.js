import Image from "next/image";
import Link from "next/link";
import { LuCheck } from "react-icons/lu";


export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center my-10">
        <div className="h-[90vh] w-[30rem] border border-black">
          <div id="title-section" className="border-b border-black bg-cap-blue">
            <div className="p-10 font-bold text-white text-outline">
              <div className="text-4xl">Oops!</div>
              <div className="text-4xl">I had an acc(id)ent</div>
            </div>
          </div>
          <div id="mid-section" className="border-b border-black h-[50%]">
            <div className="m-10"></div>
          </div>
          <div
            id="end-section"
            className="flex items-center mt-10 justify-center"
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

              <div
                className="text-4xl font-bold text-white text-outline"
              >
                i am not a robot
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}