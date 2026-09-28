import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import { PublicLayout } from "./components/PublicLayout";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { JobsPage } from "./pages/JobsPage";
import { JobFormPage } from "./pages/JobFormPage";
import { JobDetailPage } from "./pages/JobDetailPage";
import { CareersPage } from "./pages/CareersPage";
import { PublicJobPage } from "./pages/PublicJobPage";
import { ApplyPage } from "./pages/ApplyPage";
import { AppliedPage } from "./pages/AppliedPage";
import { AboutPage } from "./pages/AboutPage";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* ---------- Public ---------- */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<CareersPage />} />
              <Route path="/careers/:id" element={<PublicJobPage />} />
              <Route path="/careers/:id/apply" element={<ApplyPage />} />
              <Route path="/careers/:id/applied" element={<AppliedPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Route>

            {/* ---------- Auth ---------- */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* ---------- Employer (protected) ---------- */}
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/new" element={<JobFormPage />} />
              <Route path="/jobs/:id" element={<JobDetailPage />} />
              <Route path="/jobs/:id/edit" element={<JobFormPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}