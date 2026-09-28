import { useQuery } from "@tanstack/react-query";
import { Briefcase, Send, Building2 } from "lucide-react";
import { publicJobsApi } from "../api/public";

export function StatsBar() {
  const { data } = useQuery({
    queryKey: ["public-stats"],
    queryFn: publicJobsApi.getStats,
  });

  const stats = [
    {
      label: "Open positions",
      value: data?.totalJobs ?? 0,
      icon: Briefcase,
      tint: "from-brand-500 to-violet-600",
    },
    {
      label: "Applications received",
      value: data?.totalApplications ?? 0,
      icon: Send,
      tint: "from-emerald-500 to-emerald-700",
    },
    {
      label: "Employers hiring",
      value: data?.totalEmployers ?? 0,
      icon: Building2,
      tint: "from-slate-500 to-slate-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="card p-5 sm:p-6 flex items-center gap-4">
          <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${s.tint} flex items-center justify-center text-white shadow-soft shrink-0`}>
            <s.icon className="w-5 h-5" strokeWidth={2.25} />
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {s.value.toLocaleString()}
            </p>
            <p className="text-[13px] text-slate-500 mt-0.5">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}