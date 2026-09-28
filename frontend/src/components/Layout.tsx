import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Briefcase, LogOut, Sparkles } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/jobs", label: "Jobs", icon: Briefcase, end: false },
];

export function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Signed out");
    navigate("/login");
  };

  const initials =
    user?.name?.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() ?? "?";

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200/80 fixed inset-y-0 left-0">
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-soft">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-[15px] leading-tight">eKazi</div>
            <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Recruiter</div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                  isActive ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={clsx("w-[18px] h-[18px]", isActive ? "text-brand-600" : "text-slate-400")} strokeWidth={2} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-100">
          <div className="flex items-center gap-2.5 px-2 py-2 mb-1">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-violet-500 text-white flex items-center justify-center text-xs font-semibold shrink-0 shadow-soft">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-slate-900 truncate leading-tight">{user?.name}</p>
              <p className="text-[11px] text-slate-500 truncate leading-tight mt-0.5">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="btn btn-ghost btn-sm w-full justify-start">
            <LogOut className="w-4 h-4" />Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        <header className="md:hidden h-14 sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-900">eKazi</span>
          </div>
          <button onClick={handleLogout} className="btn btn-ghost btn-icon" aria-label="Sign out">
            <LogOut className="w-4 h-4" />
          </button>
        </header>

        <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 flex">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                clsx(
                  "flex-1 flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                  isActive ? "text-brand-600" : "text-slate-500"
                )
              }
            >
              <Icon className="w-5 h-5" strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 md:pb-8">
          <div className="max-w-5xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}