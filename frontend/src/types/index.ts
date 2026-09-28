export type EmploymentType = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP";
export type JobStatus = "DRAFT" | "PUBLISHED" | "CLOSED";
export type ApplicationStatus = "APPLIED" | "SHORTLISTED" | "INTERVIEW" | "REJECTED" | "HIRED";

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  employmentType: EmploymentType;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  _count?: { applications: number };
}

export interface Application {
  id: number;
  jobId: number;
  candidateName: string;
  email: string;
  phone: string;
  coverLetter?: string;
  resumeUrl: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  job?: Job;
}

export interface DashboardStats {
  totalJobs: number;
  publishedJobs: number;
  totalApplications: number;
}

export interface PublicJob {
  id: number;
  title: string;
  description: string;
  location: string;
  employmentType: EmploymentType;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationSubmission {
  candidateName: string;
  email: string;
  phone: string;
  coverLetter?: string;
  resumeUrl: string;
}

export interface SubmittedApplication {
  id: number;
  candidateName: string;
  email: string;
  status: ApplicationStatus;
  createdAt: string;
}