// Components
import Logo from "./Logo";
import { ProfileDropDownModal } from "./Modals";

// External Imports
import { Link } from "react-router-dom";

// Internal Imports
import { useState } from "react";

// Contexts
import { useAuthContext } from "../contexts/AuthContext";

const links = [
    {
        label: "Features",
        to: "/#features",
        disabled: false
    },
    {
        label: "Blogs",
        to: "/blogs",
        disabled: false
    },
    {
        label: "Help",
        to: "/help-center",
        disabled: false
    },
    {
        label: "FAQ",
        to: "/guide",
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
    const {
        loginModalVisibilty,
        setLoginModalVisibilty,
        createAccountModalVisibility,
        setCreateAccountModalVisibility,
        deleteAccountModalVisibility,
        setDeleteAccountModalVisibility,
        user
    } = useAuthContext();

    const [dropdownVisibility, setDropdownVisibility] = useState(false);

    return (
        <nav className="z-[100] p-4 px-8 md:px-16 bg-white fixed top-0 w-screen border-y flex items-center justify-between">
            {/* Drop Down Menu */}
            <ProfileDropDownModal
                visible={dropdownVisibility}
                setVisibility={setDropdownVisibility}
                setDeleteAccountModal={setDeleteAccountModalVisibility}
                deleteAccountModal={deleteAccountModalVisibility}
            />

            <div className="flex space-x-10 items-center">
                <Logo />
                <div className="space-x-4 items-center hidden md:flex">
                    {links.map((link, index) =>
                        link.id ? (
                            <a
                                key={index}
                                href={`#${link.id}`}
                                className={`${
                                    link.disabled
                                        ? "text-gray-400 cursor-not-allowed"
                                        : "text-gray-900"
                                }`}
                            >
                                <p className="text-base">{link.label}</p>
                            </a>
                        ) : (
                            <Link
                                key={index}
                                to={link.to}
                                onClick={() => {
                                    setDropdownVisibility(false);
                                }}
                                className={`${
                                    link.disabled
                                        ? "text-gray-400 cursor-not-allowed"
                                        : "text-gray-900"
                                }`}
                            >
                                <p className="text-base">{link.label}</p>
                            </Link>
                        )
                    )}
                </div>
            </div>
            <div
                className={`${
                    user ? "hidden" : "block"
                } flex space-x-5 items-center`}
            >
                <p
                    onClick={() => {
                        setLoginModalVisibilty(!loginModalVisibilty);
                    }}
                    className="text-slate-900 font-medium cursor-pointer"
                >
                    Login
                </p>
                <button
                    onClick={() => {
                        setCreateAccountModalVisibility(
                            !createAccountModalVisibility
                        );
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-3xl"
                >
                    <p className="text-base text-white font-medium">
                        Sign Up Free
                    </p>
                </button>
            </div>
            <div className={`${user ? "block" : "hidden"}`}>
                <img
                    onClick={() => {
                        setDropdownVisibility(!dropdownVisibility);
                    }}
                    src={
                        user?.photoURL
                            ? user.photoURL
                            : "https://api.dicebear.com/6.x/identicon/svg"
                    }
                    alt="User"
                    className="w-10 h-10 rounded-full cursor-pointer border-1 border-gray-500"
                />
            </div>
        </nav>
    );
};

export default Navbar;
