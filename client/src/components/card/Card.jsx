import React from 'react';
import './card.css'
import {COURSE_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom"

const Card = ({course, animationDelay}) => {
    const navigate = useNavigate()
    return (
        <button style={{animationDelay: `${animationDelay}s`}} className="card"
                onClick={() => navigate(COURSE_ROUTE + '/' + course.id)}>
            <img className="card__image" src={course?.img} alt={`Аватарка курса ${course.title}`}/>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
        </button>
    );
};

export default Card;
