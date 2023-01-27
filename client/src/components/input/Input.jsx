import React from 'react';
import './input.css'

const Input = ({attributes, validations, errors}) => {

    return (
        <div className="input-wrapper">
            <input className={`${errors && errors[validations?.name] ? `has-error`: ''}`} {...attributes} {...validations}/>
            {errors && errors[validations?.name] ? <p className="error-message">{errors[validations.name]?.message || "Error"}</p>: ""}
        </div>


    );
};

export default Input;
