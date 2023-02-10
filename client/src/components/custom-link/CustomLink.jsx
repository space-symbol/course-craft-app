import React from 'react';
import './custom-link.css'
import {Link} from "react-router-dom";

const CustomLink = ({attributes, onClick, text, to}) => {
    return (
        <Link {...attributes} onClick={onClick} className="link" to={to}>{text}</Link>
    );
};

export default CustomLink;
