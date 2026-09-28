import { Zap, ShieldCheck, Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Post in seconds",
    description: "Launch a job listing in under a minute. No fluff, no forms to fight.",
    tint: "from-amber-500 to-orange-600",
  },
  {
    icon: ShieldCheck,
    title: "Verified employers",
    description: "Every listing comes from a real company. No scams, no spam.",
    tint: "from-emerald-500 to-teal-700",
  },
  {
    icon: Sparkles,
    title: "Apply effortlessly",
    description: "Candidates apply in one click — no account, no endless signups.",
    tint: "from-brand-500 to-violet-700",
  },
];

export function StatsBar() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {FEATURES.map((f) => (
        <div
          key={f.title}
          className="card p-6 hover:shadow-pop hover:border-slate-300 transition-all duration-200 group"
        >
          <div
            className={`w-11 h-11 rounded-lg bg-gradient-to-br ${f.tint} flex items-center justify-center text-white shadow-soft mb-4`}
          >
            <f.icon className="w-5 h-5" strokeWidth={2.25} />
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-1.5">
            {f.title}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            {f.description}
          </p>
        </div>
      ))}
    </div>
  );
}