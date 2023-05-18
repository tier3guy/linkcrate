// Components
import RoundedIcon from "./RoundedIcon";

const FeaturesCard = ({ title, description, icon }) => {
    return (
        <div className="max-w-sm rounded-lg bg-sky-100 px-5 py-5 flex items-center flex-col">
            <RoundedIcon icon={icon} />
            <h1 className="my-4 text-2xl font-bold text-slate-800">{title}</h1>
            <p className="text-gray-500">{description}</p>
        </div>
    );
};

export default FeaturesCard;
