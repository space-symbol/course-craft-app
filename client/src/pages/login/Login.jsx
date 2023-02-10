import React from 'react';
import './login.css'
import {useForm} from "react-hook-form";
import {login} from "../../http/userAPI";
import Form from "../../components/form/Form";
import {Link} from "react-router-dom";

const Auth = () => {

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset,
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
                },
            })
        },
        errors,
    }

    const passwordInput = {
        attributes: {type: "password", placeholder: "Введи пароль", autoComplete: "currentPassword"},
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
            type: "submit",
            disabled: !isValid,
        },
        text: "Войти"
    }

    const inputs = [emailInput, passwordInput]

    const onSubmit = {
        login,
        handleSubmit,
        reset
    }
    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} inputs={inputs} button={button} />
            <p>Нет аккаунта? <Link to="/registration">Зарегестрируйся!</Link>
            </p>
        </div>
    );
};

export default Auth;
