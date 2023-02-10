import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import "./course.css"
import {deleteCourse, fetchCourse} from "../../http/coursesAPI";
import {Context} from "../../index";
import Button from "../../components/button/Button";
import Spinner from "../../components/spinner/Spinner";
import AdminModal from "../../components/admin-modal/AdminModal";
import {observer} from "mobx-react-lite";


const Course = observer(() => {
    const [course, setCourse] = useState({})
    const [loading, setIsLoading] = useState(true)
    const [modalIsActive, setModalIsActive] = useState(false)
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const {id} = useParams()
    useEffect(() => {
        fetchCourse(id).then(res => {
            setCourse(res)
            setIsLoading(false)
        }).catch(e => {
            console.log(e)
        })
    }, [])

    return (
        <div className="course">
            <main className="course-about">
                <h1 className="course-about__name">{course.name}</h1>
                <section className="course-about__text">
                    {course.about}
                </section>
            </main>
            {
                loading ? <Spinner /> : <img className="course__img"
                                             src={process.env.REACT_APP_API_URL + "courses/" + course?.img}
                                             alt={`Картинка для курса ${course.name}`} />}
            {
                user._user.role === "ADMIN" && <>
                    <Button attributes={{onClick: () => setModalIsActive(true)}} text={"Редактировать курс"} />,
                    <Button attributes={{
                        onClick: () => {
                            deleteCourse(id).then(res => {
                                navigate(-1)
                            }).catch(e => console.log(e))
                        }
                    }} text="Удалить курс" />

                    {
                        !loading &&
                        <AdminModal modalIsActive={modalIsActive}
                                    setModalIsActive={setModalIsActive}
                                    course={course}
                                    setCourse={setCourse}
                                    mode={"edit"}
                                    id={id}
                        />
                    }
                </>
            }

        </div>
    );
});

export default Course;
