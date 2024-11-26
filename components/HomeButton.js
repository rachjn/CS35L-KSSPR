import Link from "next/link";
import Image from "next/image";
export const HomeButton = () => {
  return (
    <Link href="/">
      <Image
        src="/home-icon.png"
        height={80}
        width={80}
        alt="ss-concepts"
        className="rounded-lg absolute mx-4"
      />
    </Link>
  );
};
