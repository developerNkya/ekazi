import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Sparkles, ArrowRight, Menu, X } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "../hooks/useAuth";

const NAV_LINKS = [
  { to: "/", label: "Open positions", end: true },
  { to: "/about", label: "About", end: false },
];

export function PublicLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isFullBleed = pathname === "/" || pathname === "/about";

  // Close mobile menu whenever route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* ---------- NAVBAR ---------- */}
      <header className="h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0"
            onClick={() => setMobileOpen(false)}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-soft">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900 tracking-tight">eKazi</span>
          </Link>

          {/* ---------- Desktop nav (≥ md) ---------- */}
          <div className="hidden md:flex items-center gap-1 ml-auto">
            <nav className="flex items-center gap-1 mr-2">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    clsx(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "text-brand-600 bg-brand-50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {user ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="btn btn-primary btn-sm group"
              >
                Go to dashboard
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            ) : (
              <Link to="/login" className="btn btn-secondary btn-sm">
                Employer sign in
              </Link>
            )}
          </div>

          {/* ---------- Mobile: hamburger only (no CTA) ---------- */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="md:hidden btn btn-ghost btn-icon ml-auto"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* ---------- Mobile dropdown panel ---------- */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200/80 bg-white animate-slide-up">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    clsx(
                      "block px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "text-brand-600 bg-brand-50"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Divider */}
              <div className="pt-3 mt-3 border-t border-slate-100">
                {user ? (
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="btn btn-primary btn-md w-full justify-center group"
                  >
                    Go to dashboard
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="btn btn-primary btn-md w-full justify-center"
                  >
                    Employer sign in
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ---------- MAIN CONTENT ---------- */}
      <main className="flex-1">
        {isFullBleed ? (
          <Outlet />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-fade-in">
            <Outlet />
          </div>
        )}
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer className="border-t border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-slate-900 text-sm">eKazi</span>
            </div>

            <nav className="flex items-center gap-5 text-sm text-slate-500 flex-wrap justify-center">
              <Link to="/" className="hover:text-slate-900 transition-colors">
                Open positions
              </Link>
              <Link to="/about" className="hover:text-slate-900 transition-colors">
                About
              </Link>
              <Link to="/login" className="hover:text-slate-900 transition-colors">
                Employer sign in
              </Link>
            </nav>

            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} eKazi
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}