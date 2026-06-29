import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <header className="flex w-full justify-between p-4 border-b-2 border-slate-700">
      <div>Ref-5</div>
      <nav className="flex gap-4 px-4 ">
        <Link to={"/"}>New Match</Link>
        <Link to={"/match"}>Live Match</Link>
        <Link to={"/history"}>History</Link>
      </nav>
    </header>
  );
};
