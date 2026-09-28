import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Plus, Search, MapPin, Users, Pencil, Trash2, Eye, EyeOff, Briefcase, SearchX } from "lucide-react";
import { jobsApi } from "../api/jobs";
import { PageHeader } from "../components/PageHeader";
import { Badge } from "../components/Badge";
import { JobListSkeleton } from "../components/Skeleton";
import { EmptyState } from "../components/EmptyState";
import type { JobStatus } from "../types";

export function JobsPage() {
  const [status, setStatus] = useState<JobStatus | "">("");
  const [search, setSearch] = useState("");
  const qc = useQueryClient();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["jobs", status, search],
    queryFn: () =>
      jobsApi.list({
        ...(status ? { status: status as JobStatus } : {}),
        ...(search ? { search } : {}),
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: jobsApi.remove,
    onSuccess: () => {
      toast.success("Job deleted");
      qc.invalidateQueries({ queryKey: ["jobs"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: () => toast.error("Failed to delete job"),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, s }: { id: number; s: JobStatus }) => jobsApi.changeStatus(id, s),
    onSuccess: (_, v) => {
      toast.success(v.s === "PUBLISHED" ? "Job published" : "Job closed");
      qc.invalidateQueries({ queryKey: ["jobs"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  const hasJobs = !!jobs?.length;
  const isFiltered = !!(status || search);

  return (
    <div>
      <PageHeader
        title="Jobs"
        subtitle="Manage your job listings and their applications"
        actions={
          <Link to="/jobs/new" className="btn btn-primary btn-md">
            <Plus className="w-4 h-4" />
            New Job
          </Link>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            placeholder="Search jobs by title…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-9"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as JobStatus | "")}
          className="input sm:max-w-[180px] cursor-pointer"
        >
          <option value="">All statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>

      {isLoading ? (
        <JobListSkeleton />
      ) : !hasJobs ? (
        <EmptyState
          icon={isFiltered ? SearchX : Briefcase}
          title={isFiltered ? "No jobs match your filters" : "No jobs yet"}
          description={
            isFiltered
              ? "Try clearing your search or changing the status filter."
              : "Create your first job listing to start receiving applications from candidates."
          }
          action={
            !isFiltered ? (
              <Link to="/jobs/new" className="btn btn-primary btn-md">
                <Plus className="w-4 h-4" />
                Create your first job
              </Link>
            ) : null
          }
        />
      ) : (
        <div className="card divide-y divide-slate-100 overflow-hidden">
          {jobs!.map((job) => (
            <div key={job.id} className="p-5 flex items-start justify-between gap-4 hover:bg-slate-50/60 transition-colors group">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                  <Link to={`/jobs/${job.id}`} className="font-semibold text-[15px] text-slate-900 hover:text-brand-600 transition-colors">
                    {job.title}
                  </Link>
                  <Badge value={job.status} />
                </div>
                <div className="flex items-center gap-x-4 gap-y-1 text-[13px] text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{job.employmentType.replace("_", " ")}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{job._count?.applications ?? 0} applications</span>
                </div>
              </div>
              <div className="flex items-center gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                {job.status === "DRAFT" && (
                  <button onClick={() => statusMutation.mutate({ id: job.id, s: "PUBLISHED" })} className="btn btn-secondary btn-sm">
                    <Eye className="w-3.5 h-3.5" /><span className="hidden sm:inline">Publish</span>
                  </button>
                )}
                {job.status === "PUBLISHED" && (
                  <button onClick={() => statusMutation.mutate({ id: job.id, s: "CLOSED" })} className="btn btn-secondary btn-sm">
                    <EyeOff className="w-3.5 h-3.5" /><span className="hidden sm:inline">Close</span>
                  </button>
                )}
                <Link to={`/jobs/${job.id}/edit`} className="btn btn-ghost btn-icon" aria-label="Edit">
                  <Pencil className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => {
                    if (confirm(`Delete "${job.title}"? This cannot be undone.`)) deleteMutation.mutate(job.id);
                  }}
                  className="btn btn-ghost btn-icon text-slate-500 hover:bg-red-50 hover:text-red-600"
                  aria-label="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}