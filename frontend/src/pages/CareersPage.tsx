import { Link } from "react-router-dom";
import { Briefcase, ArrowRight } from "lucide-react";

export function CareersPage() {
  return (
    <div className="card p-10 sm:p-14 text-center animate-slide-up">
      <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600 flex items-center justify-center mb-5">
        <Briefcase className="w-6 h-6" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">Careers at eKazi</h1>
      <p className="text-sm text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
        Open positions are shared via direct links. If you received a link to a specific job, please open it directly.
      </p>
      <Link to="/login" className="btn btn-secondary btn-md group">
        Employer sign in
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}