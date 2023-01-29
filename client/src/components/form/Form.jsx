import React, {useContext} from "react";
import "./form.css"
import Input from "../input/Input";
import Button from "../button/Button";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {CARDS_ROUTE} from "../../utils/consts";

const Form = ({inputs, button, onSubmit}) => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const inputRender = () => inputs.map((input, index) => {
        return <Input
            key={index + "input"}
            {...input}
        />
    })

    return (
        <form  onSubmit={
            onSubmit.handleSubmit(async ({email, password}) => {
                try {
                    const data = await ((onSubmit?.registration && onSubmit?.registration(email, password)) || (onSubmit?.login && onSubmit.login(email, password)))
                    user.setUser(data)
                    user.setIsAuth(true)
                    navigate(CARDS_ROUTE)
                } catch (e) {
                    alert(e.response.data.message)
                }

            })}>
            <div className="inputs-container">
                {inputRender()}
            </div>
            <Button attributes={button.attributes} text={button.text}/>
        </form>
    );
};
export default Form;
