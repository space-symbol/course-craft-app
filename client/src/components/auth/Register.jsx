import React from "react";
import "./auth.css"
import {useForm} from "react-hook-form";
import Form from "../form/Form";
import {Link} from "react-router-dom";
import {registration} from "../../http/userAPI";
import {observer} from "mobx-react-lite";


const Register = observer(() => {
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset,
        watch
    } = useForm({
        mode: "onBlur",
    })


    const emailInput = {
        attributes: {type: "email", autoFocus: true, placeholder: "Введи email", autoComplete: "email"},
        validations: {
            ...register("email", {
                required: "Поле обязательно к заполнению",
                minLength: {
                    value: 6,
                    message: "Минимум 6 символов"
                },
                pattern: {
                    value: RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])"),
                    message: "Некорректный email"
                }
            })
        },
        errors,
    }
    const passwordInput = {
        attributes: {type: "password", placeholder: "Придумай пароль", autoComplete: "new-password"},
        validations: {
            ...register("password", {
                required: "Поле обязательно к заполнению",
                minLength: {
                    value: 8,
                    message: "Минимум 8 символов"
                },
            })
        },
        errors,
    }

    const button = {
        attributes: {
            disabled: !isValid,
            type: "submit"
        },
        text: "Зарегистрироваться"
    }

    const inputs = [emailInput, passwordInput]

    const onSubmit = {
        registration,
        handleSubmit,
        reset
    }
    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} inputs={inputs} button={button}/>
            <p>Есть аккаунт? <Link to="/login">Войди!</Link></p>
        </div>
    );
});
export default Register;
