import React, {useContext, useState} from 'react';
import './admin.css'
import Container from "../../components/container/Container";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import {fetchUsers} from "../../http/userAPI";
import UserCard from "../../components/user-card/UserCard";
import {fetchCourses} from "../../http/coursesAPI";
import Spinner from "../../components/spinner/Spinner";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import Card from "../../components/card/Card";

const Admin = observer(() => {
    const {courses} = useContext(Context)
    const [users, setUsers] = useState({})
    const [category, setCategory] = useState("Пользователи")
    const [modalIsActive, setModalIsActive] = useState(false)
    const [loading, setLoading] = useState(true)

    const getUsers = () => {
        fetchUsers().then(({data: users}) => {
            setUsers(users)
            setLoading(false)
        }).catch(e => {
            console.log(e)
        })
    }
    const getCourses = () => {
        fetchCourses().then(({data}) => {
            courses.setCourses(data.rows)
            setUsers(courses.getCourses())
            setLoading(false)
        })
    }


    return (
        <Container>
            <div className="admin-container">
                <div className={`modal-container ${modalIsActive ? 'active' : ''}`}>
                    <dialog aria-labelledby="create-course" className="modal">
                        <h1 className="modal__title" id="create-course">Создать курс</h1>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            console.log(e)
                        }}>
                            <Input attributes={{placeholder: "Название"}}/>
                            <Input attributes={{placeholder: "Краткое описание"}}/>
                            <Button attributes={{type: "submit", className: "button-1"}} text="Сохранить"/>
                            <Button text={"Закрыть"} attributes={{
                                type: "button",
                                className: "button-2",
                                onClick: () => setModalIsActive(false)
                            }}
                                    />
                        </form>
                    </dialog>
                </div>

                <div className="wrapper">
                    <div className="search">
                        <Input attributes={{placeholder: `${category}`}}/>
                        <Button text="Поиск"/>
                    </div>
                    <Button attributes={{onClick: () => setModalIsActive(true)}} text="Создать курс"/>
                </div>
                <div className="list-container">
                    <div className="list">
                        {
                            !loading && category === "Пользователи" ?
                                users.map((user, index) => <UserCard
                                    key={user.id}
                                    id={user.id}
                                    email={user.email}
                                    animationDelay={(index / 20 + 0.1)}/>)
                                :
                                !loading && category === "Курсы"
                                    ?
                                    courses.getCourses().map((course, index) =>
                                        <Card
                                            animationDelay={(index / 10 + 0.1)}
                                            key={course.id} course={course}/>)
                                    :
                                    <Spinner/>
                        }
                    </div>
                    <div className="category">
                        <Button attributes={{
                            autoFocus: true,
                            onClick: (e) => {
                                e.stopPropagation()
                                getUsers()
                                setCategory("Пользователи")
                            },
                            onFocus: (e) => {
                                e.stopPropagation()
                                getUsers()
                                setCategory("Пользователи")
                            }
                        }} text="Пользователи"/>
                        <Button attributes={{
                            onClick: (e) => {
                                e.stopPropagation()
                                getCourses()
                                setCategory("Курсы")
                            },
                            onFocus: (e) => {
                                e.stopPropagation()
                                getCourses()
                                setCategory('Курсы')
                            }
                        }} text="Курсы"/>
                    </div>
                </div>
            </div>
        </Container>
    );
});

export default Admin;
