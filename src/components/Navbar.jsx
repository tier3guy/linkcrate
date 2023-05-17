// Components
import Logo from "./Logo";

// External Imports
import { Link } from "react-router-dom";

const links = [
    {
        label: "Features",
        to: "/features",
        disabled: false
    },
    {
        label: "Blogs",
        to: "/blogs",
        disabled: false
    },
    {
        label: "Help",
        to: "/help",
        disabled: false
    },
    {
        label: "FAQ",
        to: "/faq",
        disabled: false
    },
    {
        label: "Templates",
        to: "/templates",
        disabled: true
    },
    {
        label: "Pricing",
        to: "/pricing",
        disabled: true
    }
];

const Navbar = () => {
    return (
        <nav className="p-4 px-16 bg-white fixed top-0 w-screen border-y flex items-center justify-between">
            <div className="flex space-x-10 items-center">
                <Logo />
                <div className="flex space-x-4 items-center">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            to={link.to}
                            className={`${
                                link.disabled
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-gray-900"
                            }`}
                        >
                            <p className="text-base">{link.label}</p>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flex space-x-5 items-center">
                <p className="text-slate-900 font-medium cursor-pointer">
                    Login
                </p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-3xl">
                    <p className="text-base text-white font-medium">
                        Sign Up Free
                    </p>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
