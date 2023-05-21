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

const Footer = () => {
    return (
        <div className="border-t-2 w-[90%] mx-auto py-4 flex flex-col space-y-4 md:flex-row items-center justify-between">
            <div>
                <Logo labelStyle={"text-xl"} logoStyle={"h-6 w-6"} />
            </div>
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4 items-center">
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
            <a href="https://github.com/tier3guy/linkcrate.git">
                <i class="fa-brands fa-github text-2xl text-gray-500 cursor-pointer"></i>
            </a>
        </div>
    );
};

export default Footer;
