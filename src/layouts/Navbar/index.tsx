import Link from "next/link";

export const NavBar: React.FC = () => {
  return (
    <div className="sticky top-0 z-50 w-full bg-[#020024]">
      <div className="flex flex-row gap-8">
        <div className="p-4 text-xl font-semibold text-white">
          Guess That ...
        </div>
        <Link href="/anime" className="p-4 text-xl font-semibold text-white hover:text-[#000090]">
          Anime
        </Link>
      </div>
    </div>
  );
};
