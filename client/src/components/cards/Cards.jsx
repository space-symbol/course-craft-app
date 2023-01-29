import React, {useContext, useEffect, useState} from 'react';
import './cards.css'
import Card from "../card/Card";
import Button from "../button/Button";
import Input from "../input/Input";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {fetchCourses} from "../../http/coursesAPI";

const Cards = observer(() => {
    const {courses} = useContext(Context)

    useEffect(() => {
        if (courses.getCourses().length <= 0) fetchCourses().then(({data}) => {
            courses.setCourses(data.rows)
            console.log(courses.getCourses()[0])
        }).catch(e => {
            console.log(e)
        })
    }, [])

    const [value, setValue] = useState("")

    const inputAttributes = {
        value,
        autoFocus: true,
        placeholder: "Курсы",
        onChange: (e) => {
            setValue(e.target.value)
        },
    }

    return (
        <div className="cards-container">
            <div className="search">
                <Input attributes={inputAttributes}/>
                <Button text="Поиск"/>
            </div>
            <div className="cards">
                {courses.getCourses().map((course) => {
                    return <Card key={course.id} course={course}/>
                })}
            </div>
        </div>
    );
});

export default Cards;
