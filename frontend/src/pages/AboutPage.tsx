import { Link } from "react-router-dom";
import {
  Users, Building2, ArrowRight, Target, Zap, ShieldCheck,
} from "lucide-react";

export function AboutPage() {
  return (
    <div>
      {/* ---------- FULL-BLEED HERO (static image) ---------- */}
      <section
        className="relative overflow-hidden bg-slate-900 -mx-4 sm:-mx-6 lg:-mx-8 -mt-10 sm:-mt-14"
        style={{ height: "clamp(380px, 55vh, 520px)" }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=2400&q=80)",
          }}
        />

        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-5 max-w-2xl">
              Recruitment, made simple
            </h1>
            <p className="text-base sm:text-lg text-white/85 max-w-xl leading-relaxed">
              eKazi connects employers with the right candidates — and
              candidates with the right opportunities. One platform, both
              sides of hiring.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- CONTENT ---------- */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-16 sm:space-y-24">

        {/* What we do */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-6 sm:p-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center text-white mb-4 shadow-soft">
              <Building2 className="w-[18px] h-[18px]" strokeWidth={2.25} />
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              For employers
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Create job listings, publish them in one click, and manage
              every candidate application from a clean dashboard. Move
              candidates through your pipeline — from applied to hired.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              Sign in to your account
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="card p-6 sm:p-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white mb-4 shadow-soft">
              <Users className="w-[18px] h-[18px]" strokeWidth={2.25} />
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              For candidates
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Browse open positions from hiring companies, apply in
              minutes with a simple form, and track your applications — no
              account required.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              Browse open positions
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-8 text-center">
            What we care about
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <ValueCard
              icon={Target}
              title="Clarity"
              description="No bloated features. Just the tools hiring teams actually use."
            />
            <ValueCard
              icon={Zap}
              title="Speed"
              description="From posting a job to reviewing candidates in minutes, not days."
            />
            <ValueCard
              icon={ShieldCheck}
              title="Trust"
              description="Your data stays yours. Passwords hashed, tokens secure."
            />
          </div>
        </section>

        {/* Contact / CTA */}
        <section className="card p-8 sm:p-12 bg-gradient-to-br from-brand-600 via-brand-700 to-violet-700 border-0 text-white text-center overflow-hidden relative">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 w-52 h-52 rounded-full bg-violet-400/20 blur-3xl" />

          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Ready to hire smarter?
            </h2>
            <p className="text-white/80 max-w-md mx-auto mb-6 leading-relaxed">
              Post your first job in minutes and start receiving
              applications from qualified candidates.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-white text-brand-700 text-sm font-semibold hover:bg-slate-100 transition-colors group"
              >
                Get started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-white/10 backdrop-blur text-white text-sm font-semibold hover:bg-white/20 transition-colors ring-1 ring-white/20"
              >
                Browse jobs
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Target;
  title: string;
  description: string;
}) {
  return (
    <div className="card p-6 text-center">
      <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-[18px] h-[18px]" strokeWidth={2.25} />
      </div>
      <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}