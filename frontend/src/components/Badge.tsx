import clsx from "clsx";
import type { JobStatus, ApplicationStatus } from "../types";

type Status = JobStatus | ApplicationStatus;

const STYLES: Record<Status, string> = {
  DRAFT:       "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200/70",
  PUBLISHED:   "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200/70",
  CLOSED:      "bg-slate-100 text-slate-500 ring-1 ring-inset ring-slate-200/70",
  APPLIED:     "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200/70",
  SHORTLISTED: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200/70",
  INTERVIEW:   "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200/70",
  REJECTED:    "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200/70",
  HIRED:       "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200/70",
};

const LABELS: Partial<Record<Status, string>> = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
  CLOSED: "Closed",
  APPLIED: "Applied",
  SHORTLISTED: "Shortlisted",
  INTERVIEW: "Interview",
  REJECTED: "Rejected",
  HIRED: "Hired",
};

export function Badge({ value }: { value: Status }) {
  return (
    <span className={clsx("badge", STYLES[value])}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {LABELS[value] ?? value}
    </span>
  );
}