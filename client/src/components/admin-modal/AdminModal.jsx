import React, {useContext, useState} from 'react';
import "./admin-modal.css"
import Input from "../input/Input";
import Button from "../button/Button";
import {createCourse, editCourse} from "../../http/coursesAPI";
import {Context} from "../../index";

const AdminModal = ({modalIsActive, setModalIsActive, course, setCourse, mode, id}) => {
    const {courses} = useContext(Context)
    const [name, setName] = useState(course ? course.name: '')
    const [description, setDescription] = useState(course ? course.description: '')
    const [about, setAbout] = useState(course ? course.about: '')
    const [file, setFile] = useState('')

    const addCourse = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append("about", about)
        formData.append('img', file)
        createCourse(formData).then((course) => {
            courses.setCourse(course)
            setModalIsActive(false)
        }).catch(e => {
            console.log(e)
        })
    }
    const updateCourse = () => {
        const formData = new FormData()
        formData.append('id', id)
        formData.append('name', name)
        formData.append('description', description)
        formData.append("about", about)
        formData.append('img', file)
        editCourse(formData).then(editedCourse => {
            setCourse(editedCourse)
            setModalIsActive(false)
        })
    }
    return (
        <div className={`modal-container ${modalIsActive ? 'active' : ''}`}>
            <dialog aria-labelledby="course" className="modal">
                <h1 className="modal__title"
                    id="course">{course ? "Ркдактировать курс" : "Создать курс"}</h1>
                <form onSubmit={e => {
                    e.preventDefault()
                }}>
                    <Input attributes={
                        {
                            value: name,
                            onChange: (e) => {
                                setName(e.target.value)
                            },
                            name: "name",
                            placeholder: "Название",
                            type: "text"
                        }
                    } />

                    <Input attributes={
                        {
                            value: description,
                            onChange: (e) => {
                                setDescription(e.target.value)
                            },
                            name: "description",
                            placeholder: "Краткое описание",
                            type: "text"
                        }
                    } />
                    <textarea value={about}
                              onChange={(e) => setAbout(e.target.value)}
                              name={"about"}
                              placeholder={"Полное описание"}
                    />

                    <Input attributes={
                        {
                            onChange: (e) => {
                                setFile(e.target.files[0])
                            },
                            type: "file"
                        }
                    } />

                    <Button attributes={
                        {
                            type: "submit",
                            onClick: () => {
                                mode === 'edit' ?
                                 updateCourse(): addCourse()
                            },
                        }
                    } text="Сохранить" className={"button-1"}
                    />

                    <Button text={"Закрыть"} attributes={
                        {
                            type: "button",
                            onClick: () => setModalIsActive(false)
                        }
                    } className={"button-2"}
                    />
                </form>
            </dialog>
        </div>
    );
};

export default AdminModal;