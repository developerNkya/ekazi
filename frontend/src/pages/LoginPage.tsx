import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@ekazi.co.tz");
  const [password, setPassword] = useState("password123");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ---------- LEFT BRAND PANEL (with faded image) ---------- */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-slate-900">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=2400&q=80)",
          }}
        />

        {/* Gradient overlay (indigo → violet, semi-transparent) */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-700/90 via-brand-800/85 to-violet-900/90" />

        {/* Extra dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30" />

        {/* Decorative blobs */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-400/20 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center ring-1 ring-white/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg tracking-tight">eKazi</span>
          </div>

          <div>
            <h2 className="text-4xl font-bold leading-[1.15] tracking-tight mb-5">
              Hire smarter,
              <br />
              not harder.
            </h2>
            <p className="text-white/75 text-base max-w-md leading-relaxed">
              Manage your jobs, review candidates, and move them through your
              pipeline — all in one place.
            </p>
          </div>

          <div className="text-xs text-white/50">
            © {new Date().getFullYear()} eKazi. All rights reserved.
          </div>
        </div>
      </div>

      {/* ---------- RIGHT FORM PANEL ---------- */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-[380px] animate-slide-up">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg tracking-tight">eKazi</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1.5">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500 mb-7">
            Sign in to manage your recruitment pipeline.
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-9"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-9"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary btn-lg w-full group mt-2"
            >
              {submitting ? "Signing in…" : "Sign in"}
              {!submitting && (
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-brand-600 hover:text-brand-700">
              Create one
            </Link>
          </p>

          <div className="mt-8 p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-500 leading-relaxed">
            <p className="font-semibold text-slate-700 mb-1">Demo credentials</p>
            <p className="font-mono">demo@ekazi.co.tz · password123</p>
          </div>
        </div>
      </div>
    </div>
  );
}