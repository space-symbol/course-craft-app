import React, {useContext, useEffect, useState} from 'react';
import './courses.css'
import Card from "../../components/card/Card";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {fetchCourses} from "../../http/coursesAPI";
import Container from "../../components/container/Container";
import {useSearchParams} from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";

const Courses = observer(() => {
    const {courses} = useContext(Context)
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true)

    const getCourses = (searchParams) => {
        fetchCourses(searchParams).then(({rows}) => {
            courses.setCourses(rows)
        }).catch(e => {
            console.log(e)
        }).finally(() => setLoading(false))
    }
    useEffect(() => {
        getCourses()
    }, [])


    const inputAttributes = {
        autoFocus: true,
        placeholder: "Курсы",
        onChange: (e) => {
            setSearchParams({search: e.target.value});
        },
        onKeyDown: (e) => {
            if (e.code === "Enter") {
                getCourses(searchParams.get('search'))
            }
        }
    }

    return (
        <div className="cards-container">
            <div className="search">
                <Input attributes={inputAttributes} />
                <Button attributes={{onClick: () => getCourses(searchParams.get('search'))}} text="Поиск" />
            </div>
            {
                loading ? <Spinner /> :
                    <div className="cards">
                        {
                            courses.getCourses().map((course) => {
                                return <Card key={course?.id} course={course} />
                            })}
                    </div>
            }

        </div>
    );
});

export default Courses;
