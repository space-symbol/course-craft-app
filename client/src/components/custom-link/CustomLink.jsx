import React from 'react';
import './link2.css'
import {Link} from "react-router-dom";

const CustomLink = ({attributes, text, to}) => {
    return (
        <Link {...attributes} className="link" to={to}>{text}</Link>
    );
};

export default CustomLink;
