import { Link } from "react-router";

function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <header className="flex-1 flex items-center justify-center p-6">
        <main className="w-full max-w-5xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <section className="flex-1 text-center md:text-left">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-[#00ffe7] leading-tight drop-shadow-lg">
              Welcome to <span className="text-white">DSAGURU</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300/90 max-w-lg">
              Master Data Structures & Algorithms with curated questions,
              topic-wise practice, and smart progress tracking. Your journey to
              coding excellence starts here.
            </p>
            <ul className="mt-8 space-y-3 text-base text-gray-400/90 max-w-md mx-auto md:mx-0">
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#00ffe7]/20 text-[#00ffe7] text-base border border-[#00ffe7]/30">
                  ✓
                </span>
                Topics grouped by difficulty
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#00ffe7]/20 text-[#00ffe7] text-base border border-[#00ffe7]/30">
                  ✓
                </span>
                Create bookmarks & track your progress
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#00ffe7]/20 text-[#00ffe7] text-base border border-[#00ffe7]/30">
                  ✓
                </span>
                Powerful search for your favorite questions
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#00ffe7]/20 text-[#00ffe7] text-base border border-[#00ffe7]/30">
                  ✓
                </span>
                Detailed solutions & explanations
              </li>
            </ul>
            <div className="mt-8 flex justify-center md:justify-start gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-6 py-3 bg-[#00ffe7]/10 border border-[#00ffe7]/30 text-[#00ffe7] rounded-lg font-semibold backdrop-blur-sm transition-all duration-200 ease-out hover:scale-105 hover:bg-[#00ffe7]/20 hover:text-gray-900"
              >
                Get Started
              </Link>
              
            </div>
          </section>

          <section className="hidden md:flex flex-1 items-center justify-center relative">
  {/* subtle accent glow */}
  <div className="absolute w-72 h-72 rounded-full bg-[#00ffe7]/10 blur-3xl" />

  <img
    src="https://unpkg.com/ionicons@7.1.0/dist/svg/analytics-outline.svg"
    alt="Data Structures and Algorithms"
    className="
      relative
      w-72 h-72
      object-contain
      opacity-90
      drop-shadow-[0_0_45px_rgba(0,255,231,0.18)]
      transition-transform duration-500
      hover:scale-[1.03]
    "
    loading="lazy"
  />
</section>
        </main>
      </header>

      {/* Features Section */}
      <section
        id="features"
        className="w-full max-w-6xl mx-auto py-16 px-4 md:px-0"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#00ffe7] mb-10">
          Why Choose DSAGURU?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col items-center text-center shadow-lg hover:scale-105 transition">
            <span className="text-4xl mb-4">📚</span>
            <h3 className="text-xl font-semibold text-white mb-2">
              Curated Question Bank
            </h3>
            <p className="text-gray-300/90">
              Access hundreds of handpicked DSA questions, categorized by topic
              and difficulty.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col items-center text-center shadow-lg hover:scale-105 transition">
            <span className="text-4xl mb-4">📈</span>
            <h3 className="text-xl font-semibold text-white mb-2">
              Track Your Progress
            </h3>
            <p className="text-gray-300/90">
              Visualize your learning journey with smart analytics and
              personalized recommendations.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col items-center text-center shadow-lg hover:scale-105 transition">
            <span className="text-4xl mb-4">💡</span>
            <h3 className="text-xl font-semibold text-white mb-2">
              Expert Solutions
            </h3>
            <p className="text-gray-300/90">
              Learn from detailed solutions and explanations for every problem.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full max-w-4xl mx-auto py-12 px-4 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
          Ready to become a DSA Guru?
        </h2>
        <p className="text-gray-300/80 text-center mb-8 max-w-xl">
          Join thousands of learners and start your journey to ace coding
          interviews and competitive programming.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center px-8 py-4 bg-[#00ffe7]/20 border border-[#00ffe7]/30 text-[#00ffe7] rounded-xl font-bold text-lg backdrop-blur-sm transition-all duration-200 ease-out hover:scale-105 hover:bg-[#00ffe7]/40 hover:text-gray-900"
        >
          Start Practicing Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-gray-500 text-sm border-t border-white/10 mt-auto">
        © {new Date().getFullYear()} DSAGURU. All rights reserved.
      </footer>
    </div>
  );
}

export default Landing;
