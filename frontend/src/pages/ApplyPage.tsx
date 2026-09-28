import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  ArrowLeft, User, Mail, Phone, Link as LinkIcon, FileText, AlertCircle,
} from "lucide-react";
import { publicJobsApi } from "../api/public";
import { Skeleton } from "../components/Skeleton";

export function ApplyPage() {
  const { id } = useParams();
  const jobId = Number(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    candidateName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resumeUrl: "",
  });

  const { data: job, isLoading, isError } = useQuery({
    queryKey: ["public-job", jobId],
    queryFn: () => publicJobsApi.getJob(jobId),
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: () => publicJobsApi.apply(jobId, form),
    onSuccess: () => navigate(`/careers/${jobId}/applied`, { replace: true }),
    onError: (err: any) => {
      const msg =
        err.response?.data?.errors?.[0]?.message ||
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(msg);
    },
  });

  // ---------- Loading ----------
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-2/3" />
        <div className="card p-6 space-y-4 mt-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    );
  }

  // ---------- Not available ----------
  if (isError || !job) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card p-10 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-semibold text-slate-900 mb-2">
            This position is no longer available
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            We're no longer accepting applications for this role.
          </p>
          <Link to="/" className="btn btn-secondary btn-md">
            <ArrowLeft className="w-4 h-4" />
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  // ---------- Form ----------
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        to={`/careers/${jobId}`}
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to job
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Apply for {job.title}
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          {job.location} · {job.employmentType.replace("_", " ").toLowerCase()}
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
        className="card p-6 sm:p-8 space-y-5"
      >
        {/* Full Name */}
        <div>
          <label className="label">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              required
              minLength={2}
              value={form.candidateName}
              onChange={(e) => setForm({ ...form, candidateName: e.target.value })}
              placeholder="Your full name"
              className="input pl-9"
            />
          </div>
        </div>

        {/* Email + Phone — stacked on mobile, 2-col on wider */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="input pl-9"
              />
            </div>
          </div>
          <div>
            <label className="label">
              Phone <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="tel"
                required
                minLength={7}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+255 712 345 678"
                className="input pl-9"
              />
            </div>
          </div>
        </div>

        {/* Resume URL */}
        <div>
          <label className="label">
            Resume URL <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="url"
              required
              value={form.resumeUrl}
              onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
              placeholder="https://drive.google.com/..."
              className="input pl-9"
            />
          </div>
          <p className="text-xs text-slate-500 mt-1.5">
            Link to your resume (Google Drive, Dropbox, or personal site).
          </p>
        </div>

        {/* Cover Letter */}
        <div>
          <label className="label">
            Cover Letter <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <textarea
              rows={5}
              maxLength={3000}
              value={form.coverLetter}
              onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
              placeholder="Tell us why you're a great fit for this role…"
              className="input pl-9"
            />
          </div>
          <p className="text-xs text-slate-500 mt-1.5">
            {form.coverLetter.length} / 3000 characters
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="btn btn-primary btn-lg"
          >
            {mutation.isPending ? "Submitting…" : "Submit application"}
          </button>
          <Link
            to={`/careers/${jobId}`}
            className="btn btn-secondary btn-lg"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}