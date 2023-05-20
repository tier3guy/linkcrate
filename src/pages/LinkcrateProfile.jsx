import React from "react";

// External Components
import { useParams } from "react-router-dom";

const LinkcrateProfile = () => {
    const { name } = useParams();

    return <div>{name}</div>;
};

export default LinkcrateProfile;
