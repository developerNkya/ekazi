import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Briefcase, MapPin, Search, ArrowRight, AlertCircle, BookOpen,
} from "lucide-react";
import { publicJobsApi } from "../api/public";
import { Skeleton } from "../components/Skeleton";
import { HeroCarousel } from "../components/HeroCarousel";
import { StatsBar } from "../components/StatsBar";
import type { PublicJob } from "../types";

const EMPLOYMENT_LABEL: Record<string, string> = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
};

export function CareersPage() {
  const [search, setSearch] = useState("");

  const { data: jobs, isLoading, isError } = useQuery({
    queryKey: ["public-jobs"],
    queryFn: publicJobsApi.listJobs,
  });

  const filtered = (jobs ?? []).filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* ---------- FULL-BLEED HERO (edge to edge) ---------- */}
      <HeroCarousel />

      {/* ---------- CONTAINER-WRAPPED SECTIONS ---------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-16 sm:space-y-24">
        {/* STATS */}
        <StatsBar />

        {/* LATEST JOBS */}
        <section>
          <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Latest jobs
              </h2>
              <p className="text-sm text-slate-500 mt-1.5">
                Fresh opportunities from employers on eKazi
              </p>
            </div>
          </div>

          <div className="relative mb-5 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              placeholder="Search by title or location…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-9"
            />
          </div>

          {isError && (
            <div className="card p-6 text-center border-red-200 bg-red-50">
              <div className="mx-auto w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3">
                <AlertCircle className="w-6 h-6" />
              </div>
              <p className="text-sm text-red-700">
                Failed to load jobs. Please try again later.
              </p>
            </div>
          )}

          {isLoading && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card p-5 space-y-3">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ))}
            </div>
          )}

          {!isLoading && !isError && (
            <>
              {filtered.length === 0 ? (
                <div className="card p-12 text-center">
                  <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600 flex items-center justify-center mb-4">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1.5">
                    {search ? "No jobs match your search" : "No open positions right now"}
                  </h3>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto">
                    {search
                      ? "Try a different keyword or location."
                      : "Check back soon — new roles are posted regularly."}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              )}
            </>
          )}
        </section>

        {/* CAREER TIPS */}
        <section>
          <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Career tips
              </h2>
              <p className="text-sm text-slate-500 mt-1.5">
                Practical advice for job seekers and employers
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TipCard
              title="How to write a CV that gets interviews"
              excerpt="A CV is a sales tool. Learn how to structure yours to communicate value, not just duties."
              to="/about"
            />
            <TipCard
              title="Preparing for your next interview"
              excerpt="Research, rehearse, and show enthusiasm. Here's a practical checklist for interview day."
              to="/about"
            />
            <TipCard
              title="Negotiating your salary with confidence"
              excerpt="Understand your market value, justify your ask, and know when to walk away."
              to="/about"
            />
          </div>
        </section>

        {/* CTA */}
        <section className="card p-8 sm:p-12 bg-gradient-to-br from-brand-600 via-brand-700 to-violet-700 border-0 text-white text-center overflow-hidden relative">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 w-52 h-52 rounded-full bg-violet-400/20 blur-3xl" />

          <div className="relative max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Ready to hire smarter?
            </h2>
            <p className="text-white/80 mb-7 leading-relaxed">
              Post your first job in minutes and start receiving applications
              from qualified candidates.
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
                to="/about"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-white/10 backdrop-blur text-white text-sm font-semibold hover:bg-white/20 transition-colors ring-1 ring-white/20"
              >
                Learn more
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function JobCard({ job }: { job: PublicJob }) {
  return (
    <Link
      to={`/careers/${job.id}`}
      className="card p-5 sm:p-6 block hover:shadow-pop hover:border-slate-300 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">
            {job.title}
          </h3>
          <div className="flex items-center gap-x-4 gap-y-1 text-[13px] text-slate-500 mt-2 flex-wrap">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              {EMPLOYMENT_LABEL[job.employmentType] ?? job.employmentType}
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-3 line-clamp-2 leading-relaxed">
            {job.description}
          </p>
        </div>

        <div className="shrink-0 pt-1">
          <span className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-600 group-hover:text-brand-700 transition-colors">
            View
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </span>
          <ArrowRight className="sm:hidden w-5 h-5 text-slate-400" />
        </div>
      </div>
    </Link>
  );
}

function TipCard({
  title,
  excerpt,
  to,
}: {
  title: string;
  excerpt: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="card p-5 sm:p-6 block hover:shadow-pop hover:border-slate-300 transition-all duration-200 group"
    >
      <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
        <BookOpen className="w-[18px] h-[18px]" strokeWidth={2.25} />
      </div>
      <h3 className="font-semibold text-slate-900 mb-2 leading-snug group-hover:text-brand-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">{excerpt}</p>
    </Link>
  );
}