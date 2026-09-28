import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { jobsApi } from "../api/jobs";
import type { EmploymentType, JobStatus } from "../types";
import { PageHeader } from "../components/PageHeader";

const EMPLOYMENT_LABELS: Record<EmploymentType, string> = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
};

const STATUS_LABELS: Record<JobStatus, string> = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
  CLOSED: "Closed",
};

export function JobFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    employmentType: "FULL_TIME" as EmploymentType,
    status: "DRAFT" as JobStatus,
  });

  const { data: existing } = useQuery({
    queryKey: ["job", id],
    queryFn: () => jobsApi.get(Number(id)),
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing) {
      setForm({
        title: existing.title,
        description: existing.description,
        location: existing.location,
        employmentType: existing.employmentType,
        status: existing.status,
      });
    }
  }, [existing]);

  const mutation = useMutation({
    mutationFn: () => (isEdit ? jobsApi.update(Number(id), form) : jobsApi.create(form)),
    onSuccess: () => {
      toast.success(isEdit ? "Job updated" : "Job created");
      qc.invalidateQueries({ queryKey: ["jobs"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["job", id] });
      navigate(isEdit ? `/jobs/${id}` : "/jobs");
    },
    onError: (err: any) => {
      const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.message;
      toast.error(msg || "Something went wrong");
    },
  });

  return (
    <div className="max-w-3xl">
      <Link to="/jobs" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" />Back to Jobs
      </Link>

      <PageHeader
        title={isEdit ? "Edit Job" : "Create Job"}
        subtitle={isEdit ? "Update the details of this job listing." : "Fill in the details below to create a new job listing."}
      />

      <form
        onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}
        className="card p-6 sm:p-7 space-y-5"
      >
        <div>
          <label className="label">Job Title <span className="text-red-500">*</span></label>
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Senior Full-Stack Developer"
            className="input"
          />
        </div>
        <div>
          <label className="label">Description <span className="text-red-500">*</span></label>
          <textarea
            required
            rows={6}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe the role, responsibilities, and requirements…"
            className="input"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Location <span className="text-red-500">*</span></label>
            <input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Dar es Salaam" className="input" />
          </div>
          <div>
            <label className="label">Employment Type <span className="text-red-500">*</span></label>
            <select
              value={form.employmentType}
              onChange={(e) => setForm({ ...form, employmentType: e.target.value as EmploymentType })}
              className="input cursor-pointer"
            >
              {Object.entries(EMPLOYMENT_LABELS).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
            </select>
          </div>
          <div>
            <label className="label">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as JobStatus })}
              className="input cursor-pointer"
            >
              {Object.entries(STATUS_LABELS).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
          <button type="submit" disabled={mutation.isPending} className="btn btn-primary btn-md">
            {mutation.isPending ? "Saving…" : isEdit ? "Save Changes" : "Create Job"}
          </button>
          <button type="button" onClick={() => navigate("/jobs")} className="btn btn-secondary btn-md">Cancel</button>
        </div>
      </form>
    </div>
  );
}