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

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<PublicLayout />}>
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/careers/:id" element={<PublicJobPage />} />
              <Route path="/careers/:id/apply" element={<ApplyPage />} />
              <Route path="/careers/:id/applied" element={<AppliedPage />} />
            </Route>

            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/new" element={<JobFormPage />} />
              <Route path="/jobs/:id" element={<JobDetailPage />} />
              <Route path="/jobs/:id/edit" element={<JobFormPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}