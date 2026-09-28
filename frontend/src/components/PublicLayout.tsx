import { Link, Outlet } from "react-router-dom";
import { Sparkles } from "lucide-react";

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-3xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          <Link to="/careers" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-soft">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900 tracking-tight">eKazi</span>
          </Link>
          <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Employer sign in
          </Link>
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-slate-200/80 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} eKazi — Recruitment made simple
        </div>
      </footer>
    </div>
  );
}