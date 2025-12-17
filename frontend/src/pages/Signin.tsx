import  {  useRef, useState } from "react";
import type { AuthContextType } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function SignInSection({
  refProp,
}: {
  refProp?: React.RefObject<HTMLElement>;
}) {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const {setUser} = useAuth() as AuthContextType;
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${backendurl}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (data.success) {
        document.cookie = `token=${data.token}; path=/;`;
        setUser(data.user);
        document.cookie = `user=${encodeURIComponent(JSON.stringify(data.user))}; path=/;`;
        navigate("/dashboard");
      } else {
        throw alert(data.message);
      }
    } catch (err) {
      alert("An error occurred while signing in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="bg-neutral-950/95 px-5 sm:px-10 py-16 min-h-screen flex items-center justify-center"
      id="signin"
      ref={refProp}
    >
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl shadow-xl p-8 sm:p-10 border border-white/10"
        style={{ boxShadow: "0 4px 32px 0 rgba(0,0,0,0.25)" }}>
        <h1 className="text-2xl font-extrabold text-center bg-gradient-to-r from-[#00ffe7] via-cyan-400 to-[#00ffe7] bg-clip-text text-transparent mb-2 pb-5 tracking-tight">
          Welcome back to DSA-GURU
        </h1>
        <p className="text-center text-neutral-300 text-base mb-6">
          Sign in to continue
        </p>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <label className="flex flex-col gap-2">
            <span className="text-neutral-100 font-medium">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. xyz@gmail.com"
              required
              className="w-full bg-white/10 backdrop-blur-sm px-5 py-3 rounded-lg text-neutral-100 placeholder-neutral-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#00ffe7] transition"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-neutral-100 font-medium">Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full bg-white/10 backdrop-blur-sm px-5 py-3 rounded-lg text-neutral-100 placeholder-neutral-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#00ffe7] transition"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#00ffe7] to-cyan-600 px-6 py-3 rounded-lg text-neutral-900 font-bold flex justify-center items-center gap-2 transition-all duration-200 hover:scale-[1.03] hover:from-cyan-400 hover:to-[#00ffe7] disabled:opacity-60 border border-white/10 shadow"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-neutral-400 text-sm mt-6">
          Don't have an account?{" "}
          <button
            onClick={()=> navigate("/sign-up")}
            className="text-[#00ffe7] hover:text-cyan-300 font-semibold transition"
          >
            Sign Up
          </button>
        </p>
      </div>
    </section>
  );
}
