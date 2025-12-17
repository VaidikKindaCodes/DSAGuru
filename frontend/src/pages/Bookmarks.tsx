import { useEffect, useState } from "react";
import type { AuthContextType } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";

interface Question {
  _id: string;
  title: string;
  topic: string;
  url: string;
}

function Bookmarks() {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const { user } = useAuth() as AuthContextType;
  const [bookmarkData, setBookmarkData] = useState<Array<Question>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [topic, setTopic] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchBookmarkData = async () => {
    const res = await fetch(
      `${backendurl}/api/getbookmarkdata?userId=${user?._id}`
    );
    const data = await res.json();
    setBookmarkData(data);
  };

  useEffect(() => {
    fetchBookmarkData();
  }, [user]);

  const pageSize = 9;
  const filteredData = bookmarkData.filter((q) => {
    const matchesTopic = topic === "All" || q.topic === topic;
    const matchesSearch =
      typeof q.title === "string" &&
      q.title.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const pageData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e13] via-[#10151b] to-black flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <main className="w-full max-w-6xl">
        <header className="mb-6 text-center px-2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#00ffe7] drop-shadow-sm">
            Your Bookmarks
          </h1>
          <p className="mt-1 text-sm sm:text-base text-[#00ffe7]/60">
            Solve your favourite problems.
          </p>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title..."
              className="h-10 w-full sm:w-64 px-3 rounded-lg bg-white/5 border border-white/10 text-sm text-[#00ffe7] placeholder:text-[#00ffe7]/40 focus:outline-none focus:ring-2 focus:ring-[#00ffe7]/60 backdrop-blur-md transition"
            />
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <label htmlFor="difficulty" className="text-[#00ffe7]/80 text-sm sm:text-base">
              Filter by topic
            </label>
            <select
              id="difficulty"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 w-full sm:w-auto px-3 rounded-lg bg-white/5 border border-white/10 text-sm text-[#00ffe7] focus:outline-none focus:ring-2 focus:ring-[#00ffe7]/60 backdrop-blur-md transition"
            >
              <option value="All" className="bg-[#10151b] text-[#00ffe7]">All</option>
              <option value="Learn the basics" className="bg-[#10151b] text-[#00ffe7]">Learn the basics</option>
              <option value="Learn LinkedList [Single LL, Double LL, Medium, Hard Problems]" className="bg-[#10151b] text-[#00ffe7]">Learn LinkedList</option>
              <option value="Recursion [PatternWise]" className="bg-[#10151b] text-[#00ffe7]">Recursion</option>
              <option value="Bit Manipulation [Concepts & Problems]" className="bg-[#10151b] text-[#00ffe7]">Bit Manipulation</option>
              <option value="Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation]" className="bg-[#10151b] text-[#00ffe7]">Stack & Queues</option>
              <option value="Sliding Window & Two Pointer Combined Problems" className="bg-[#10151b] text-[#00ffe7]">Sliding Window</option>
              <option value="Heaps [Learning, Medium, Hard Problems]" className="bg-[#10151b] text-[#00ffe7]">Heaps</option>
              <option value="Greedy Algorithms [Easy, Medium/Hard]" className="bg-[#10151b] text-[#00ffe7]">Greedy</option>
              <option value="Binary Trees [Traversals, Medium and Hard Problems]" className="bg-[#10151b] text-[#00ffe7]">Binary Trees</option>
              <option value="Binary Search Trees [Concept and Problems]" className="bg-[#10151b] text-[#00ffe7]">BST</option>
              <option value="Graphs [Concepts & Problems]" className="bg-[#10151b] text-[#00ffe7]">Graphs</option>
              <option value="Dynamic Programming [Patterns and Problems]" className="bg-[#10151b] text-[#00ffe7]">DP</option>
              <option value="Tries" className="bg-[#10151b] text-[#00ffe7]">Tries</option>
              <option value="Strings" className="bg-[#10151b] text-[#00ffe7]">Strings</option>
            </select>
            <button
              type="button"
              onClick={() => {
                setTopic("All");
                setCurrentPage(1);
              }}
              className="h-10 w-full sm:w-auto px-3 rounded-lg bg-white/5 border border-white/10 text-sm text-[#00ffe7]/80 hover:bg-[#00ffe7]/10 hover:text-[#00ffe7] transition backdrop-blur-md"
            >
              Reset
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {pageData.map((question, idx) => (
            <article
              key={question._id}
              className="h-48 sm:h-56 flex flex-col justify-between rounded-xl p-4 bg-white/7 border border-white/10 shadow-sm hover:bg-[#00ffe7]/5 hover:border-[#00ffe7]/30 hover:scale-[1.025] transition-all duration-200 backdrop-blur-md"
            >
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-[#00ffe7] mb-1">
                  Q{(currentPage - 1) * pageSize + idx + 1}
                </h3>
                <p className="text-xs sm:text-sm text-[#00ffe7]/80 mb-2 line-clamp-2">
                  {question.title}
                </p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="px-2 py-1 rounded text-[10px] sm:text-xs font-medium bg-[#00ffe7]/10 text-[#00ffe7] truncate border border-[#00ffe7]/20">
                  {question.topic}
                </span>
                <a
                  href={question.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00ffe7] hover:text-[#00ffe7]/80 text-xs underline transition"
                >
                  Ref
                </a>
              </div>
            </article>
          ))}
        </section>

        <nav className="mt-8 flex items-center justify-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white/7 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-md">
            <button
              aria-label="Previous page"
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[#00ffe7]/90 hover:bg-[#00ffe7]/10 hover:text-[#00ffe7] disabled:opacity-40 disabled:cursor-not-allowed transition w-full sm:w-auto"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-[#00ffe7] font-semibold text-center">
              Page {currentPage} / {totalPages}
            </div>
            <button
              aria-label="Next page"
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[#00ffe7]/90 hover:bg-[#00ffe7]/10 hover:text-[#00ffe7] disabled:opacity-40 disabled:cursor-not-allowed transition w-full sm:w-auto"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </nav>
      </main>
    </div>
  );
}

export default Bookmarks;
