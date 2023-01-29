import React, {useContext, useState} from 'react';
import "./admin-form.css"
import Input from "../input/Input";
import Button from "../button/Button";
import {createCourse} from "../../http/coursesAPI";
import {Context} from "../../index";

const AdminForm = ({modalIsActive, setModalIsActive}) => {
    const {courses} = useContext(Context)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [about, setAbout] = useState('')
    const [file, setFile] = useState({})

    const addCourse = () =>{
        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append("about", about)
        formData.append('img', file)
        createCourse(formData).then(({data}) => {
            courses.setCourses([...courses.getCourses(), data])
            console.log(data)
        }).catch(e => {
            console.log(e)
        })
    }
    return (
        <div className={`modal-container ${modalIsActive ? 'active' : ''}`}>
            <dialog aria-labelledby="create-course" className="modal">
                <h1 className="modal__title" id="create-course">Создать курс</h1>
                <form onSubmit={e => {
                    e.preventDefault()
                }}>
                    <Input attributes={{value: name,onChange: (e)=> {setName(e.target.value)}, name: "name", placeholder: "Название"}}/>
                    <Input attributes={{value: description, onChange: (e)=> {setDescription(e.target.value)}, name: "description", placeholder: "Краткое описание"}}/>
                    <textarea value={about} onChange={(e)=> setAbout(e.target.value)}  name={"about"} placeholder={"Полное описание"}/>
                    <Input attributes={{onChange: (e)=> {setFile(e.target.files[0])}, type: "file"}}></Input>
                    <Button attributes={{onClick: (e) => {addCourse()},type: "submit", className: "button-1"}} text="Сохранить"/>
                    <Button text={"Закрыть"} attributes={{
                        type: "button",
                        className: "button-2",
                        onClick: () => setModalIsActive(false)
                    }}
                    />
                </form>
            </dialog>
        </div>
    );
};

export default AdminForm;
