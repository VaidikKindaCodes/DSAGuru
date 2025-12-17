import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import type { AuthContextType } from "../context/AuthContext";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth() as AuthContextType;

  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initial = saved ?? (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.add(initial);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove(
      theme === "light" ? "dark" : "light"
    );
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header className="fixed top-0 left-0 right-0 z-10 backdrop-blur-md bg-white/5 border-b border-white/10 shadow-sm">
      <div className="flex justify-between items-center py-3 px-5 sm:px-10 max-w-screen-xl mx-auto">
        <Link
          to="/"
          className="text-xl font-bold"
          style={{
            letterSpacing: "0.1em",
            color: "#00ffe7",
          }}
        >
          DSA-GURU
        </Link>

        <nav className="hidden md:flex gap-4 items-center">
          {isAuthenticated ? (
            <>
              <span className="text-white/70 text-sm">
                Hi, <span style={{ color: "#00ffe7" }}>{user?.username || "User"}</span>
              </span>
              <Link
                to="/profile"
                className="px-4 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white/90 text-sm font-medium hover:bg-[#00ffe7]/10 hover:border-[#00ffe7] hover:text-[#00ffe7] transition-colors duration-200"
              >
                Profile
              </Link>
              <Link
                to="/dashboard"
                className="px-4 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white/90 text-sm font-medium hover:bg-[#00ffe7]/10 hover:border-[#00ffe7] hover:text-[#00ffe7] transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link
                to="/bookmarks"
                className="px-4 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white/90 text-sm font-medium hover:bg-[#00ffe7]/10 hover:border-[#00ffe7] hover:text-[#00ffe7] transition-colors duration-200"
              >
                Bookmarks
              </Link>
              <button
                onClick={logout}
                className="px-4 py-1.5 rounded-lg bg-rose-700/80 border border-rose-700/40 text-white/90 text-sm font-medium hover:bg-rose-600/80 hover:border-rose-400 hover:text-[#00ffe7] transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/sign-in"
                className="px-4 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white/90 text-sm font-medium hover:bg-[#00ffe7]/10 hover:border-[#00ffe7] hover:text-[#00ffe7] transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="px-4 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white/90 text-sm font-medium hover:bg-[#00ffe7]/10 hover:border-[#00ffe7] hover:text-[#00ffe7] transition-colors duration-200"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#00ffe7] md:hidden p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-[#00ffe7]/10 hover:border-[#00ffe7] transition-colors duration-200"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {isOpen && (
        <div className="bg-white/5 backdrop-blur-md md:hidden shadow border-t border-white/10">
          <div className="flex flex-col gap-3 p-5">
            {isAuthenticated ? (
              <>
                <span className="text-white/70 text-sm">
                  Hi, <span style={{ color: "#00ffe7" }}>{user?.username || "User"}</span>
                </span>
                <Link
                  to="/profile"
                  className="px-4 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white/90 text-sm font-medium hover:bg-[#00ffe7]/10 hover:border-[#00ffe7] hover:text-[#00ffe7] transition-colors duration-200"
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="px-4 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white/90 text-sm font-medium hover:bg-[#00ffe7]/10 hover:border-[#00ffe7] hover:text-[#00ffe7] transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/bookmarks"
                  className="px-4 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white/90 text-sm font-medium hover:bg-[#00ffe7]/10 hover:border-[#00ffe7] hover:text-[#00ffe7] transition-colors duration-200"
                >
                  Bookmarks
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-1.5 rounded-lg bg-rose-700/80 border border-rose-700/40 text-white/90 text-sm font-medium hover:bg-rose-600/80 hover:border-rose-400 hover:text-[#00ffe7] transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className="px-4 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white/90 text-sm font-medium hover:bg-[#00ffe7]/10 hover:border-[#00ffe7] hover:text-[#00ffe7] transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="px-4 py-1.5 rounded-lg bg-[#00ffe7]/10 border border-[#00ffe7]/30 text-[#00ffe7] text-sm font-semibold hover:bg-[#00ffe7]/20 hover:border-[#00ffe7] hover:text-white transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
