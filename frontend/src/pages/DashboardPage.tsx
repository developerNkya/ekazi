import { useQuery } from "@tanstack/react-query";
import { Briefcase, Send, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { dashboardApi } from "../api/dashboard";
import { PageHeader } from "../components/PageHeader";
import { StatCardSkeleton } from "../components/Skeleton";

export function DashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: dashboardApi.stats,
  });

  const cards = data
    ? [
        { label: "Total Jobs", value: data.totalJobs, icon: Briefcase, tint: "from-slate-500 to-slate-700" },
        { label: "Published Jobs", value: data.publishedJobs, icon: TrendingUp, tint: "from-emerald-500 to-emerald-700" },
        { label: "Total Applications", value: data.totalApplications, icon: Send, tint: "from-brand-500 to-violet-600" },
      ]
    : [];

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Overview of your recruitment activity" />

      {isError && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Failed to load stats. Try refreshing the page.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {isLoading
          ? [1, 2, 3].map((i) => <StatCardSkeleton key={i} />)
          : cards.map((c) => (
              <div key={c.label} className="card p-5 animate-slide-up">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${c.tint} flex items-center justify-center text-white shadow-soft mb-4`}>
                  <c.icon className="w-[18px] h-[18px]" strokeWidth={2.25} />
                </div>
                <p className="text-[13px] font-medium text-slate-500">{c.label}</p>
                <p className="text-3xl font-bold mt-1 tracking-tight text-slate-900">{c.value}</p>
              </div>
            ))}
      </div>

      <div className="mt-6 card p-6 sm:p-8 bg-gradient-to-br from-brand-600 via-brand-700 to-violet-700 border-0 text-white overflow-hidden relative animate-slide-up">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 w-52 h-52 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="relative max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur text-[11px] font-semibold tracking-wide mb-3">
            <Sparkles className="w-3 h-3" />
            QUICK START
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2 tracking-tight">
            Post your first job in seconds
          </h3>
          <p className="text-sm text-white/80 mb-6 leading-relaxed">
            Create a job listing, publish it, and start receiving applications from candidates.
          </p>
          <Link to="/jobs/new" className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-white text-brand-700 text-sm font-semibold hover:bg-slate-100 transition-colors group">
            Create a job
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}