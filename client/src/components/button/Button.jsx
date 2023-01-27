import React from 'react';
import "./button.css"
const Button = ({attributes, className, text}) => {
    return (
        <button {...attributes} className={`button ${className}`}>{text}</button>
    );
};

export default Button;
