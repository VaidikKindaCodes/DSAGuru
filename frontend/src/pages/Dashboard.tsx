import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import type { AuthContextType } from "../context/AuthContext";

/* ================= TYPES ================= */

interface Question {
  _id: string;
  title: string;
  topic: string;
  url: string;
}

interface QuestionData {
  _id: string;
  title: string;
  questions: Question[];
}

/* ================= COMPONENT ================= */

function Dashboard() {
  const backendurl = import.meta.env.VITE_BACKEND_URL as string;

  const { user, setUser } = useAuth() as AuthContextType;

  const [questionData, setQuestionData] = useState<QuestionData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [topic] = useState<string>("All");

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const pageSize = 9;

  /* ================= SEARCH DEBOUNCE ================= */

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  /* ================= DATA ================= */

  const allQuestions: Question[] = questionData.flatMap(
    (q) => q.questions
  );

  const filteredData = allQuestions.filter((q) => {
    const topicMatch = topic === "All" || q.topic === topic;
    const searchMatch = q.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());
    return topicMatch && searchMatch;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / pageSize)
  );

  const pageData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  /* ================= HELPERS ================= */

  const isSolved = (id: string): boolean =>
    user?.SolvedQuestions?.includes(id) ?? false;

  const isBookmarked = (id: string): boolean =>
    user?.BookmarkQuestions?.includes(id) ?? false;

  /* ================= API ================= */

  const fetchQuestions = async () => {
    const res = await fetch(`${backendurl}/api/fetchdata`);
    const data: QuestionData[] = await res.json();
    setQuestionData(data);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  /* ================= SOLVED ================= */

  const addSolved = async (id: string) => {
    await fetch(`${backendurl}/api/addsolved`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ quesId: id }),
    });

    setUser((prev) =>
      prev
        ? {
            ...prev,
            solvedQuestions: [...new Set([...prev.SolvedQuestions, id])],
          }
        : prev
    );
  };

  const removeSolved = async (id: string) => {
    await fetch(`${backendurl}/api/removesolved`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ quesId: id }),
    });

    setUser((prev) =>
      prev
        ? {
            ...prev,
            solvedQuestions: prev.SolvedQuestions.filter((q) => q !== id),
          }
        : prev
    );
  };

  /* ================= BOOKMARK ================= */

  const toggleBookmark = async (id: string) => {
    await fetch(`${backendurl}/api/bookmark`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ questionId: id }),
    });

    setUser((prev) =>
      prev
        ? {
            ...prev,
            bookmarkedQuestions: prev.BookmarkQuestions.includes(id)
              ? prev.BookmarkQuestions.filter((q) => q !== id)
              : [...prev.BookmarkQuestions, id],
          }
        : prev
    );
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#0a0f13] py-8 px-4">
      <main className="max-w-6xl mx-auto">

        {/* HEADER */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-[#00ffe7]">
            Problem Dashboard
          </h1>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search problems..."
            className="mt-4 w-full sm:w-72 h-10 px-3 rounded-lg bg-white/10 border border-[#00ffe7]/20 text-[#00ffe7]"
          />
        </header>

        {/* GRID */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageData.map((q) => {
            const solved = isSolved(q._id);
            const bookmarked = isBookmarked(q._id);

            return (
              <article
                key={q._id}
                className={`rounded-2xl p-5 border transition
                ${
                  solved
                    ? "border-green-500/50 bg-green-500/10"
                    : "border-[#00ffe7]/20 bg-white/10"
                }`}
              >
                <h3 className="text-sm font-semibold text-[#00ffe7]">
                  {q.title}
                </h3>

                <p className="mt-2 text-xs text-[#00ffe7]/70">
                  {q.topic}
                </p>

                <div className="mt-4 flex justify-between items-center gap-2">
                  <button
                    onClick={() =>
                      solved ? removeSolved(q._id) : addSolved(q._id)
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold
                    ${
                      solved
                        ? "bg-green-500/30 text-green-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {solved ? "Solved ✓" : "Mark Solved"}
                  </button>

                  <button
                    onClick={() => toggleBookmark(q._id)}
                    className="px-3 py-1.5 rounded-lg text-xs bg-white/10 border border-[#00ffe7]/30 text-[#00ffe7]"
                  >
                    {bookmarked ? "★ Bookmarked" : "Bookmark"}
                  </button>

                  <a
                    href={q.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#00ffe7] underline"
                  >
                    Open ↗
                  </a>
                </div>
              </article>
            );
          })}
        </section>

        {/* PAGINATION */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>
          <span className="text-[#00ffe7]">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;
