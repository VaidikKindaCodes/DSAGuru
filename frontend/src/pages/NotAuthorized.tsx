import { useNavigate } from "react-router-dom";

function NotAuthorized() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-[#181c1f] to-[#23272b]">
            <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-xl px-8 py-10 shadow-lg flex flex-col items-center">
                <h1 className="text-3xl font-bold text-[#00ffe7] mb-4 drop-shadow-sm">
                    403 - Not Authorized
                </h1>
                <p className="text-base text-gray-300 mb-8 text-center">
                    You do not have permission to view this page.
                </p>
                <button
                    className="px-6 py-2 rounded-lg bg-[#00ffe7]/10 border border-[#00ffe7]/30 text-[#00ffe7] font-semibold hover:bg-[#00ffe7]/20 hover:border-[#00ffe7]/60 transition-colors duration-200"
                    onClick={() => navigate("/sign-in")}
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
}

export default NotAuthorized;
