// Components
import { FeaturesCard } from "../components";

// Contexts
import { useAuthContext } from "../contexts/AuthContext";

const Features = () => {
    const { createAccountModalVisibility, setCreateAccountModalVisibility } =
        useAuthContext();

    return (
        <div id="features" className=" w-[90%] m-auto">
            <div className="bg-white rounded-3xl p-20 text-center shadow-sm">
                <div className="md:h-full flex flex-col justify-center">
                    <p className="text-xl text-sky-800">Made it Easy</p>
                    <h1 className="md:leading-[75px] my-3 text-6xl font-bold text-slate-800">
                        Features designed for you
                    </h1>
                    <p className="text-lg mt-5 text-gray-500 m-auto w-1/2">
                        Combine everthing in one link, online content, socials,
                        etc and share it with your friends.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
                    <FeaturesCard
                        title="Create"
                        description="Create links easily, organize all the links the way you want. Make it right now, It's free."
                        icon="feather"
                    />
                    <FeaturesCard
                        title="Integrate"
                        description="Integrate your account with various popular services, and get insights from your fans."
                        icon="link"
                    />
                    <FeaturesCard
                        title="Share"
                        description="Share your link anywhere, Tiktok, Instagram, Twitter or your website and other."
                        icon="share"
                    />
                </div>
            </div>

            <div className="my-20">
                <div className="md:h-full md:w-full flex flex-col justify-center">
                    <p className="text-xl text-sky-800">
                        Manage all your links without any hassle,
                    </p>
                    <h1 className="md:w-2/3 md:leading-[75px] my-3 text-6xl font-bold text-slate-800">
                        Manage all your link{" "}
                        <span className="border-b-4 border-yellow-500">
                            as you wish
                        </span>
                    </h1>
                    <p className="mt-5 text-gray-500 w-1/2">
                        Organize all the links according to your needs, make
                        your audience to find them easily. With just a few
                        steps.
                    </p>
                    <button
                        onClick={() => {
                            setCreateAccountModalVisibility(
                                !createAccountModalVisibility
                            );
                        }}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-3xl w-[14%] my-4 text-white"
                    >
                        Sign up free
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Features;
