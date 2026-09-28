import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ArrowLeft, MapPin, Briefcase, Calendar, ExternalLink, Inbox, Copy, Check } from "lucide-react";
import { jobsApi } from "../api/jobs";
import { applicationsApi } from "../api/applications";
import { Badge } from "../components/Badge";
import { Skeleton } from "../components/Skeleton";
import { EmptyState } from "../components/EmptyState";
import type { ApplicationStatus } from "../types";

const STATUS_OPTIONS: ApplicationStatus[] = ["APPLIED", "SHORTLISTED", "INTERVIEW", "REJECTED", "HIRED"];

export function JobDetailPage() {
  const { id } = useParams();
  const jobId = Number(id);
  const qc = useQueryClient();
  const [filter, setFilter] = useState<ApplicationStatus | "">("");
  const [copied, setCopied] = useState(false);

  const { data: job, isLoading: loadingJob } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => jobsApi.get(jobId),
  });

  const { data: apps, isLoading: loadingApps } = useQuery({
    queryKey: ["applications", jobId, filter],
    queryFn: () => applicationsApi.listByJob(jobId, filter ? (filter as ApplicationStatus) : undefined),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, s }: { id: number; s: ApplicationStatus }) => applicationsApi.updateStatus(id, s),
    onSuccess: () => {
      toast.success("Status updated");
      qc.invalidateQueries({ queryKey: ["applications", jobId] });
    },
    onError: () => toast.error("Failed to update"),
  });

  const copyLink = async () => {
    const url = `${window.location.origin}/careers/${jobId}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Application link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (loadingJob) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <div className="card p-6 space-y-3 mt-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="card p-8 text-center">
        <p className="text-slate-600">Job not found.</p>
        <Link to="/jobs" className="btn btn-secondary btn-md mt-4">Back to Jobs</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/jobs" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-4 h-4" />Back to Jobs
      </Link>

      <div className="card p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap mb-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{job.title}</h1>
              <Badge value={job.status} />
            </div>
            <div className="flex items-center gap-x-4 gap-y-1 text-[13px] text-slate-500 flex-wrap">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
              <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{job.employmentType.replace("_", " ")}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{new Date(job.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {job.status === "PUBLISHED" && (
              <button onClick={copyLink} className="btn btn-secondary btn-md" title="Copy public application link">
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{copied ? "Copied" : "Copy link"}</span>
              </button>
            )}
            <Link to={`/jobs/${job.id}/edit`} className="btn btn-secondary btn-md">Edit Job</Link>
          </div>
        </div>
        <div className="pt-4 border-t border-slate-100">
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{job.description}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-slate-900 tracking-tight">Applications</h2>
            {apps && apps.length > 0 && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{apps.length}</span>
            )}
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as ApplicationStatus | "")}
            className="input !h-9 text-[13px] sm:max-w-[180px] cursor-pointer"
          >
            <option value="">All statuses</option>
            {STATUS_OPTIONS.map((s) => (<option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>))}
          </select>
        </div>

        {loadingApps ? (
          <div className="card divide-y divide-slate-100 overflow-hidden">
            {[1, 2].map((i) => (
              <div key={i} className="p-5 space-y-3">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-3.5 w-1/3" />
                <Skeleton className="h-3.5 w-2/3" />
              </div>
            ))}
          </div>
        ) : !apps?.length ? (
          <EmptyState
            icon={Inbox}
            title="No applications yet"
            description={filter ? "No applications match this status filter." : "Applications will appear here once candidates apply."}
          />
        ) : (
          <div className="card divide-y divide-slate-100 overflow-hidden">
            {apps.map((app) => (
              <div key={app.id} className="p-5 hover:bg-slate-50/60 transition-colors">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">{app.candidateName}</p>
                    <p className="text-[13px] text-slate-500 mt-0.5">{app.email} · {app.phone}</p>
                  </div>
                  <select
                    value={app.status}
                    onChange={(e) => statusMutation.mutate({ id: app.id, s: e.target.value as ApplicationStatus })}
                    className="input !h-9 text-[13px] cursor-pointer max-w-[160px]"
                  >
                    {STATUS_OPTIONS.map((s) => (<option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>))}
                  </select>
                </div>
                {app.coverLetter && (
                  <p className="mt-3 text-[13px] text-slate-600 leading-relaxed line-clamp-2">{app.coverLetter}</p>
                )}
                <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[13px] text-brand-600 hover:text-brand-700 font-medium mt-3">
                  View Resume<ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}