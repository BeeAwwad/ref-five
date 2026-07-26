import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hamburger from "hamburger-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NavLink = ({ to, label }: { to: string; label: string }) => (
  <Link
    className="text-sm sm:text-base border-b-2 border-white hover:border-slate-700 active:border-slate-800 transition-all"
    to={to}
  >
    {label}
  </Link>
);

export const NavBar = () => {
  const [showNav, setShowNav] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showNav) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [showNav]);

  useGSAP(() => {
    if (menuRef.current && backdropRef.current) {
      gsap.to(menuRef.current, {
        height: showNav ? "auto" : 0,
        opacity: showNav ? 1 : 0,
        duration: 0.4,
        ease: "power2.inOut",
        pointerEvents: showNav ? "auto" : "none",
      });

      gsap.to(backdropRef.current, {
        opacity: showNav ? 1 : 0,
        duration: 0.4,
        ease: "power2.inOut",
        pointerEvents: showNav ? "auto" : "none",
      });
    }
  }, [showNav]);

  const handleLinkClick = (path: string) => {
    navigate(path);
    setShowNav(false);
  };

  return (
    <>
      <header className="flex w-full justify-between items-center p-4 border-b-2 border-primary-500 bg-primary-500 relative z-50 text-white">
        <div>
          <span className="font-semibold font-mono">Ref-5</span>
        </div>

        <div className="md:hidden">
          <Hamburger toggle={setShowNav} toggled={showNav} />
        </div>

        <nav className="hidden md:flex gap-4 px-4 font-mono">
          <NavLink to="/" label="New Match" />
          <NavLink to="/match" label="Live Match" />
          <NavLink to="/history" label="History" />
          <NavLink to="/heads-or-tails" label="Heads/Tails" />
        </nav>
      </header>

      <div
        ref={backdropRef}
        onClick={() => setShowNav(false)}
        className="md:hidden fixed inset-0 bg-black/50 z-30 top-20"
        style={{ opacity: 0, pointerEvents: "none" }}
      />

      <div
        ref={menuRef}
        className="md:hidden fixed top-20 left-0 right-0 bg-white border-b-2 border-slate-700 overflow-hidden z-40"
        style={{ height: 0, opacity: 0 }}
      >
        <nav className="flex flex-col gap-4 px-6 py-10 font-mono">
          <button
            onClick={() => handleLinkClick("/")}
            className="text-sm border-b-2 border-slate-300 active:border-slate-700 pb-2 transition-all"
          >
            New Match
          </button>
          <button
            onClick={() => handleLinkClick("/match")}
            className="text-sm border-b-2 border-slate-300 active:border-slate-700 pb-2 transition-all"
          >
            Live Match
          </button>
          <button
            onClick={() => handleLinkClick("/history")}
            className="text-sm border-b-2 border-slate-300 active:border-slate-700 pb-2 transition-all"
          >
            History
          </button>
          <button
            onClick={() => handleLinkClick("/heads-or-tails")}
            className="text-sm border-b-2 border-slate-300 active:border-slate-700 pb-2 transition-all"
          >
            Heads/Tails
          </button>
        </nav>
      </div>
    </>
  );
};
