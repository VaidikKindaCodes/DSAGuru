import  { useRef, useState } from "react";
import { useNavigate } from "react-router";

export default function SignUpSection({ refProp }: { refProp?: React.RefObject<HTMLElement> }) {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${backendurl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json().catch(() => ({} as any));

      if (data && data.success) {
        formRef.current?.reset();
        setForm({ name: "", email: "", password: "" });
        navigate("/sign-in");
        return;
      }
      const msg = data?.message || "Unable to sign up. Please try again.";
      alert(msg);
    } catch (err) {
      console.error(err);
      alert("Unable to sign up at the moment. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="bg-neutral-950/95 px-5 sm:px-10 py-16 min-h-screen flex items-center justify-center"
      id="signup"
      ref={refProp}
    >
      <div className="w-full max-w-md rounded-2xl shadow-xl p-8 sm:p-10 border border-cyan-300/10 bg-white/5 backdrop-blur-md transition-all duration-200">
        <h1 className="text-2xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-200 bg-clip-text text-transparent mb-2 pb-5">
          Join DSA-GURU
        </h1>
        <p className="text-center text-neutral-300 text-lg mb-6">Create your account</p>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <label className="flex flex-col gap-2">
            <span className="text-neutral-100 font-semibold">Username</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full bg-white/10 border border-cyan-300/10 px-5 py-3 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 backdrop-blur-sm transition-all duration-200"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-neutral-100 font-semibold">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your email"
              required
              className="w-full bg-white/10 border border-cyan-300/10 px-5 py-3 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 backdrop-blur-sm transition-all duration-200"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-neutral-100 font-semibold">Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="your password"
              required
              className="w-full bg-white/10 border border-cyan-300/10 px-5 py-3 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 backdrop-blur-sm transition-all duration-200"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-300 px-6 py-3 rounded-lg shadow-md text-neutral-950 font-bold flex justify-center items-center gap-2 hover:scale-[1.03] hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-neutral-400 text-sm mt-6">
          Already have an account?{" "}
          <button
            onClick={()=> navigate("/sign-in")}
            className="text-cyan-300 hover:text-cyan-200 font-semibold transition-colors duration-200"
          >
            Sign In
          </button>
        </p>
      </div>
    </section>
  );
}
