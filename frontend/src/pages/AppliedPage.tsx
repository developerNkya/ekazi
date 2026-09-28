import { Link, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export function AppliedPage() {
  const { id } = useParams();

  return (
    <div className="card p-10 sm:p-12 text-center animate-slide-up">
      <div className="mx-auto w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
        <CheckCircle2 className="w-7 h-7" strokeWidth={2.25} />
      </div>
      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
        Application submitted!
      </h1>
      <p className="text-sm text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
        Thank you for applying. The employer will review your application and reach out if there's a good fit.
      </p>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <Link to={`/careers/${id}`} className="btn btn-secondary btn-md">View job again</Link>
        <Link to="/careers" className="btn btn-primary btn-md">Browse more jobs</Link>
      </div>
    </div>
  );
}