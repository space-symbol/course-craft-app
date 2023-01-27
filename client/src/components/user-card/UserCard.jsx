import React from 'react';
import "./user-card.css"

const UserCard = ({id, email, animationDelay}) => {
    return (
        <button style={{animationDelay: `${animationDelay}s`}} className="user-card button">
            <span>id: {id}</span><span>email: {email}</span>
        </button>
    );
};

export default UserCard;
