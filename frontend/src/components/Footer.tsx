import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-[#232526] text-white py-6 px-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold mb-1 text-[#00ffe7]">
                        Vaidik Kathal
                    </h2>
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} Made by{" "}
                        <span className="text-[#00ffe7]">@Vaidik</span>. All rights reserved.
                    </p>
                </div>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a
                        href="https://github.com/vaidik"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00ffe7] transition-colors duration-200 hover:text-white"
                    >
                        <FaGithub size={24} />
                    </a>
                    <a
                        href="https://linkedin.com/in/vaidik"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00ffe7] transition-colors duration-200 hover:text-white"
                    >
                        <FaLinkedin size={24} />
                    </a>
                    <a
                        href="https://twitter.com/vaidik"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00ffe7] transition-colors duration-200 hover:text-white"
                    >
                        <FaTwitter size={24} />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;