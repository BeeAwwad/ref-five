import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <header className="flex w-full justify-between p-4 border-b-2 border-slate-700">
      <div>
        <span className="font-semibold font-mono">Ref-5</span>
      </div>
      <nav className="flex gap-4 px-4 font-mono">
        <Link
          className="text-sm sm:text-base border-b-2 border-white hover:border-slate-700 active:border-slate-800 transition-transform"
          to={"/"}
        >
          New Match
        </Link>
        <Link
          className="text-sm sm:text-base border-b-2 border-white hover:border-slate-700 active:border-slate-800 transition-transform"
          to={"/match"}
        >
          Live Match
        </Link>
        <Link
          className="text-sm sm:text-base border-b-2 border-white hover:border-slate-700 active:border-slate-800 transition-transform"
          to={"/history"}
        >
          History
        </Link>
      </nav>
    </header>
  );
};
