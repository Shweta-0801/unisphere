import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  CalendarCheck,
  Search,
  BookOpen,
  MessageSquare,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Lock,
  Mail
} from "lucide-react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    navigate("/dashboard");
  }

  function handleDemoLogin() {
    setEmail("student@unisphere.edu");
    setPassword("password123");
    setTimeout(() => {
      navigate("/dashboard");
    }, 200);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-blue-500 selection:text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/30 blur-3xl rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-200/30 blur-3xl rounded-full" />
      </div>

      {/* Top Bar */}
      <div className="relative z-10 px-6 py-5 max-w-7xl mx-auto w-full flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>

        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm">
            <GraduationCap size={18} />
          </div>
          <span className="font-bold text-slate-900 tracking-tight">
            Uni<span className="text-blue-600">Sphere</span>
          </span>
        </div>
      </div>

      {/* Center Container: Split Card Layout */}
      <div className="relative z-10 max-w-4xl mx-auto w-full px-6 py-6 my-auto">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 overflow-hidden grid md:grid-cols-12">
          
          {/* Left Column: Project Showcase Panel */}
          <div className="md:col-span-5 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-8 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-white/10 rounded-full blur-xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-semibold backdrop-blur mb-6">
                <Sparkles size={12} className="text-amber-300" />
                <span>Unified Campus Hub</span>
              </div>

              <h2 className="text-2xl font-black tracking-tight leading-snug">
                One Account. <br />
                All Campus Services.
              </h2>

              <p className="text-blue-100 text-xs mt-3 leading-relaxed">
                Log in to check attendance percentages, calculate safe bunks, report campus grievances, or download semester study notes.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl p-2.5 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <CalendarCheck size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold">Smart Attendance</div>
                  <div className="text-[10px] text-blue-100">Safe bunk & criteria calculator</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl p-2.5 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Search size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold">Lost & Found Grid</div>
                  <div className="text-[10px] text-blue-100">Campus-wide item recovery</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl p-2.5 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold">Peer Study Notes</div>
                  <div className="text-[10px] text-blue-100">Curated semester resources</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/15 flex items-center gap-2 text-[11px] text-blue-100 font-medium">
              <ShieldCheck size={14} className="text-emerald-300" />
              <span>Campus Data Privacy Verified</span>
            </div>
          </div>

          {/* Right Column: Interactive Login Form */}
          <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Welcome Back
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Enter your credentials to access your dashboard.
              </p>
            </div>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Campus Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@unisphere.edu"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Password
                  </label>
                  <span className="text-xs text-blue-600 font-medium hover:underline cursor-pointer">
                    Forgot?
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Sign In to UniSphere</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>

            <div className="mt-5 relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-xs text-slate-400 font-medium uppercase absolute">
                Quick Demo
              </span>
            </div>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="mt-5 w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles size={14} className="text-amber-500" />
              <span>One-Click Demo Student Access</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom info */}
      <div className="relative z-10 py-4 text-center text-xs text-slate-400">
        UniSphere Campus Management Platform • 2026
      </div>
    </div>
  );
}

export default LoginPage;