import React from 'react';
import "./user-card.css"

const UserCard = ({id, email, animationDelay}) => {
    return (
        <div style={{animationDelay: `${animationDelay}s`}} className="user-card">
            <span className={"email"}>email:</span>
            <a href={`mailto:${email}`}>{email}</a>
        </div>
    );
};

export default UserCard;
