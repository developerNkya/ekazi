import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { MapPin, Briefcase, Calendar, ArrowRight, AlertCircle, ArrowLeft } from "lucide-react";
import { publicJobsApi } from "../api/public";
import { Badge } from "../components/Badge";
import { Skeleton } from "../components/Skeleton";

const EMPLOYMENT_LABEL: Record<string, string> = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
};

export function PublicJobPage() {
  const { id } = useParams();
  const jobId = Number(id);

  const { data: job, isLoading, isError } = useQuery({
    queryKey: ["public-job", jobId],
    queryFn: () => publicJobsApi.getJob(jobId),
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="card p-6 space-y-3 mt-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="card p-10 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h1 className="text-lg font-semibold text-slate-900 mb-2">This position is no longer available</h1>
        <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
          The job you're looking for doesn't exist or is no longer accepting applications.
        </p>
        <Link to="/careers" className="btn btn-secondary btn-md">
          <ArrowLeft className="w-4 h-4" />Back to Careers
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/careers" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-4 h-4" />Back to Careers
      </Link>

      <div className="card p-6 sm:p-8">
        <div className="flex items-center gap-2.5 flex-wrap mb-3">
          <Badge value="PUBLISHED" />
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs text-slate-500">
            Posted {new Date(job.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">{job.title}</h1>
        <div className="flex items-center gap-x-5 gap-y-2 text-sm text-slate-500 flex-wrap mb-6">
          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{job.location}</span>
          <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" />{EMPLOYMENT_LABEL[job.employmentType] ?? job.employmentType}</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(job.updatedAt).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</span>
        </div>
        <Link to={`/careers/${job.id}/apply`} className="btn btn-primary btn-lg group">
          Apply for this position
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="card p-6 sm:p-8">
        <h2 className="text-base font-semibold text-slate-900 mb-4">About this role</h2>
        <div className="text-[15px] text-slate-700 leading-relaxed whitespace-pre-wrap">{job.description}</div>
      </div>
    </div>
  );
}