const RoundedIcon = ({ icon }) => {
    const icons = {
        feather: "fa-feather",
        link: "fa-link",
        share: "fa-share-nodes"
    };

    return (
        <div className="w-12 h-12 bg-blue-600 rounded-full grid place-content-center">
            <i
                className={`fa-solid ${icons[icon]} text-2xl`}
                style={{ color: "white" }}
            ></i>
        </div>
    );
};

export default RoundedIcon;
