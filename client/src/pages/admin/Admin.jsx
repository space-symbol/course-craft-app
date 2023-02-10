import React, {useContext, useEffect, useState} from 'react';
import './admin.css'
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import {fetchUsers} from "../../http/userAPI";
import UserCard from "../../components/user-card/UserCard";
import {fetchCourses} from "../../http/coursesAPI";
import Spinner from "../../components/spinner/Spinner";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import Card from "../../components/card/Card";
import AdminModal from "../../components/admin-modal/AdminModal";

const Admin = observer(() => {
    const {courses} = useContext(Context)
    const [users, setUsers] = useState([])
    const [modalIsActive, setModalIsActive] = useState(false)
    const [category, setCategory] = useState("Пользователи")
    const [loading, setLoading] = useState(true)

    const getUsers = () => {
        fetchUsers().then((users) => {
            setUsers(users)
        }).catch(e => {
            console.log(e)
        }).finally(() => setLoading(false))
    }
    const getCourses = () => {
        fetchCourses().then(({rows}) => {
            courses.setCourses(rows)
        }).catch(e => console.log(e)).finally(() => setLoading(false))
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className="admin-container">
            <AdminModal modalIsActive={modalIsActive} setModalIsActive={setModalIsActive} />
            <div className="search-container">
                <div className="search">
                    <Input attributes={{placeholder: `${category}`}} />
                    <Button text="Поиск" />
                </div>
                <Button attributes={{onClick: () => setModalIsActive(true)}} text="Создать курс" />
            </div>
            <div className="list-container">
                <div className="list">
                    {
                        !loading && category === "Пользователи" ?
                            users.map((user, index) =>
                                <UserCard
                                    key={user.id}
                                    id={user.id}
                                    email={user.email}
                                    animationDelay={(index / 20 + 0.1)} />)
                            :
                            !loading && category === "Курсы"
                                ?
                                courses.getCourses().map((course, index) =>
                                    <Card
                                        animationDelay={(index / 10 + 0.1)}
                                        key={course.id}
                                        course={course}>
                                    </Card>)
                                :
                                <Spinner />
                    }
                </div>
                <div className="category">
                    <Button attributes={{
                        autoFocus: true,
                        onClick: (e) => {
                            setLoading(true)
                            getUsers()
                            setCategory("Пользователи")
                        }
                    }} text="Пользователи" />
                    <Button attributes={{
                        onClick: (e) => {
                            setLoading(true)
                            getCourses()
                            setCategory("Курсы")
                        }
                    }} text="Курсы" />
                </div>
            </div>
        </div>
    );
});

export default Admin;