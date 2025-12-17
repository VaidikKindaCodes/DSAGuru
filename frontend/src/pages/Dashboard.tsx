import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import type { AuthContextType } from "../context/AuthContext";

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

function Dashboard() {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const { user, setUser } = useAuth() as AuthContextType;
  const [questionData, setQuestionData] = useState<QuestionData[]>([]);
  const userid = user?._id;
  const [currentPage, setCurrentPage] = useState(1);
  const [topic, setTopic] = useState("All");
  const [addingToBookmarks, setAddingToBookmarks] = useState(false);
  const [reloadQuestions, setReloadQuestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  const pageSize = 9;
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const allQuestions = questionData.flatMap((qset) => qset.questions);

  const filteredData = allQuestions.filter((q) => {
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

  const handleAddToBookmark = async (id: string) => {
    setAddingToBookmarks(true);
    try {
      const res = await fetch(`${backendurl}/api/bookmark`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ questionId: id, userId: userid }),
      });
      const data = await res.json();
      if (data && data.success) {
        setReloadQuestions(prev => !prev); 
        alert("Question bookmarked");
      } else {
        alert("Couldn't add question to bookmarks");
      }
      setUser(user);
    } catch (error) {
      console.error(error);
    } finally {
      setAddingToBookmarks(false);
    }
  };

  const handleFetchQuestions = async () => {
    const res = await fetch(`${backendurl}/api/fetchdata`);
    const data = await res.json();
    setQuestionData(data);
  };
  const handleAddToSolved = async (id: string) => {
    try {
      const res = await fetch(`${backendurl}/api/addsolved`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ quesId: id, userId: userid }),
      });
      const data = await res.json();
      if (data && data.success) {
        alert("added question to solved list")
        setReloadQuestions(prev => !prev); 
        setUser((prev: AuthContextType["user"]) =>
          prev
            ? {
                ...prev,
                SolvedQuestions: [...(prev.SolvedQuestions || []), id],
              }
            : prev
        );
      } else {
        alert("Couldn't mark as solved");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromSolved = async (id: string) => {
    try {
      const res = await fetch(`${backendurl}/api/removesolved`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ quesId: id, userId: userid }),
      });
      const data = await res.json();
      if (data && data.success) {
        alert("Removed question from solved list");
        setReloadQuestions(prev => !prev); 
        setUser((prev: AuthContextType["user"]) =>
          prev
            ? {
                ...prev,
                SolvedQuestions: prev.SolvedQuestions.filter(
                  (q: string) => q !== id
                ),
              }
            : prev
        );
      } else {
        alert("Couldn't remove from solved");
      }
    } catch (error) {
      console.error(error);
    }
  };
  function isQuestionSolved(questionId: string): boolean {
    return (
      (user?.SolvedQuestions as string[] | undefined)?.includes(questionId) ??
      false
    );
  }

  useEffect(() => {
    handleFetchQuestions();
  }, [reloadQuestions]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f13] via-[#10151a] to-[#181f23] flex items-center justify-center py-8 px-4 sm:px-6">
      <main className="w-full max-w-6xl">
        <header className="mb-8 text-center px-2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#00ffe7] drop-shadow-sm">
            Problem Dashboard
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#00ffe7]/70 px-1">
            Browse curated problems — Solve your favourite problems, sort them
            as per your liking.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title..."
              className="h-10 w-full sm:w-64 px-3 rounded-lg bg-white/5 border border-[#00ffe7]/10 text-sm text-[#00ffe7] placeholder:text-[#00ffe7]/40 focus:outline-none focus:ring-2 focus:ring-[#00ffe7]/60 backdrop-blur-md transition"
            />
          </div>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <label
              htmlFor="topic"
              className="text-[#00ffe7] text-sm sm:text-base"
            >
              Filter by topic
            </label>
            <select
              id="topic"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 w-full sm:w-auto px-3 rounded-lg bg-white/10 border border-[#00ffe7]/10 text-sm text-[#00ffe7] focus:outline-none focus:ring-2 focus:ring-[#00ffe7]/60 backdrop-blur-md transition"
            >
              <option value="All" className="bg-[#181f23] text-[#00ffe7]">
                All
              </option>
              <option
                value="Learn the basics"
                className="bg-[#181f23] text-[#00ffe7]"
              >
                Learn the basics
              </option>
              <option
                value="Learn LinkedList [Single LL, Double LL, Medium, Hard Problems]"
                className="bg-[#181f23] text-[#00ffe7]"
              >
                Learn LinkedList [Single LL, Double LL, Medium, Hard Problems]
              </option>
              <option
                value="Recursion [PatternWise]"
                className="bg-[#181f23] text-[#00ffe7]"
              >
                Recursion [PatternWise]
              </option>
              <option
                value="Bit Manipulation [Concepts & Problems]"
                className="bg-[#181f23] text-[#00ffe7]"
              >
                Bit Manipulation [Concepts & Problems]
              </option>
              <option
                value="Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation]"
                className="bg-[#181f23] text-[#00ffe7]"
              >
                Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack,
                Implementation]
              </option>
              <option
                value="Sliding Window & Two Pointer Combined Problems"
                className="bg-[#181f23] text-[#00ffe7]"
              >
                Sliding Window & Two Pointer Combined Problems
              </option>
              <option
                value="Heaps [Learning, Medium, Hard Problems]"
                className="bg-[#181f23] text-[#00ffe7]"
              >
                Heaps [Learning, Medium, Hard Problems]
              </option>
              <option
                value="Greedy Algorithms [Easy, Medium/Hard]"
                className="bg-[#181f23] text-[#00ffe7]"
              >
                Greedy Algorithms [Easy, Medium/Hard]
              </option>
              <option
                value="Binary Trees [Traversals, Medium and Hard Problems]"
                className="bg-[#181f23] text-[#00ffe7]"
              >
                Binary Trees [Traversals, Medium and Hard Problems]
              </option>
              <option
                value="Binary Search Trees [Concept and Problems]"
                className="bg-[#181f23] text-[#00ffe7]"
              >
                Binary Search Trees [Concept and Problems]
              </option>
              <option
                value="Graphs [Concepts & Problems]"
                className="bg-[#181f23] text-[#00ffe7]"
              >
                Graphs [Concepts & Problems]
              </option>
              <option
                value="Dynamic Programming [Patterns and Problems]"
                className="bg-[#181f23] text-[#00ffe7]"
              >
                Dynamic Programming [Patterns and Problems]
              </option>
              <option value="Tries" className="bg-[#181f23] text-[#00ffe7]">
                Tries
              </option>
              <option value="Strings" className="bg-[#181f23] text-[#00ffe7]">
                Strings
              </option>
            </select>
            <button
              type="button"
              onClick={() => {
                setTopic("All");
                setSearchTerm("");
                setCurrentPage(1);
              }}
              className="h-10 w-full sm:w-auto px-3 rounded-lg bg-white/10 border border-[#00ffe7]/10 text-sm text-[#00ffe7] hover:bg-[#00ffe7]/10 hover:text-[#00ffe7] transition backdrop-blur-md"
            >
              Reset
            </button>
          </div>
        </header>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-1 sm:px-0">
          {pageData.map((question, idx) => {
            const solved = isQuestionSolved(question._id);

            return (
              <article
                key={question._id}
                className={`group relative h-60 rounded-2xl p-5 border backdrop-blur-md transition-all duration-300
        ${
          solved
            ? "bg-[#00ffe7]/10 border-[#00ffe7]/40 shadow-[0_0_20px_#00ffe733]"
            : "bg-white/10 border-[#00ffe7]/10 hover:-translate-y-1 hover:shadow-xl"
        }`}
              >
                {/* Solved badge */}
                {solved && (
                  <span className="absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/40">
                    ✓ Solved
                  </span>
                )}

                {/* Header */}
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-[#00ffe7]">
                    Q{(currentPage - 1) * pageSize + idx + 1}
                  </h3>
                  <p className="mt-1 text-xs text-[#00ffe7]/80 line-clamp-3">
                    {question.title}
                  </p>
                </div>

                {/* Topic */}
                <div className="mb-4">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-[10px] font-medium
          bg-[#00ffe7]/10 text-[#00ffe7] border border-[#00ffe7]/20"
                  >
                    {question.topic}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-auto flex items-center justify-between gap-2">
                  {/* Solved toggle */}
                  <button
                    onClick={() =>
                      solved
                        ? handleRemoveFromSolved(question._id)
                        : handleAddToSolved(question._id)
                    }
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition
            ${
              solved
                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
            }`}
                  >
                    {solved ? "Solved ✓" : "Mark Solved"}
                  </button>

                  {/* Bookmark */}
                  <button
                    onClick={() => handleAddToBookmark(question._id)}
                    disabled={addingToBookmarks}
                    className="px-3 py-1.5 rounded-lg text-[11px] font-medium
            bg-white/10 text-[#00ffe7] border border-[#00ffe7]/20
            hover:bg-[#00ffe7]/20 transition"
                  >
                    {addingToBookmarks ? "..." : "Bookmark"}
                  </button>

                  {/* Reference */}
                  <a
                    href={question.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#00ffe7] underline underline-offset-2
            hover:text-[#00ffe7]/70 transition"
                  >
                    Open ↗
                  </a>
                </div>
              </article>
            );
          })}
        </section>
        <nav className="mt-8 flex items-center justify-center px-2">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white/10 border border-[#00ffe7]/10 rounded-xl px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-md w-full sm:w-auto">
            <button
              className="px-3 sm:px-4 py-2 rounded-lg bg-white/10 border border-[#00ffe7]/10 text-[#00ffe7] hover:bg-[#00ffe7]/10 hover:text-[#181f23] disabled:opacity-40 disabled:cursor-not-allowed transition w-full sm:w-auto"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <div className="px-3 sm:px-4 py-1 rounded-full bg-white/10 border border-[#00ffe7]/10 text-xs sm:text-sm text-[#00ffe7] font-semibold">
              Page {currentPage} / {totalPages || 1}
            </div>
            <button
              className="px-3 sm:px-4 py-2 rounded-lg bg-white/10 border border-[#00ffe7]/10 text-[#00ffe7] hover:bg-[#00ffe7]/10 hover:text-[#181f23] disabled:opacity-40 disabled:cursor-not-allowed transition w-full sm:w-auto"
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

export default Dashboard;
