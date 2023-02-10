import React, {useContext, useState} from 'react';
import './header.css'
import logo from '../../assets/logo.svg'
import avatar from "../../assets/default-avatar.svg"
import {Link, useNavigate} from "react-router-dom";
import Button from "../button/Button";
import {ADMIN_ROUTE, COURSES_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, USER_PROFILE_ROUTE} from "../../utils/consts";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import CustomLink from "../custom-link/CustomLink";

const Header = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [isActive, setIsActive] = useState(false)

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        setIsActive(false)
        navigate(LOGIN_ROUTE)
    }

    const links = [
        {text: "Профиль", to: USER_PROFILE_ROUTE},
        {text: "Настройки", to: USER_PROFILE_ROUTE},

    ]
    return (
        <header className="header">
            <Link className="header__logo" to={COURSES_ROUTE}>
                <img src={logo} alt="logo"/>
            </Link>
            <div className="header-container">

                {
                    user.getUser().role === "ADMIN" && (
                        <Link className="button" to={ADMIN_ROUTE}>Админка</Link>
                    )
                }

                {
                    user.getIsAuth() ?
                        <>
                            <button className={`user ${isActive && "open"}`} onClick={(e) => {
                                setIsActive(!isActive)
                            }}>
                                <img
                                    src={user.getUser().avatar ? (process.env.REACT_APP_API_URL + "users/" + user.getUser().avatar) : avatar}
                                    alt="avatar" title="Ваш аватар"/>
                            </button>

                            <div className={`user-menu-wrapper ${isActive && "open"}`}>
                               <div className="user-menu-container">
                                   <ul className="user-menu">
                                       {
                                           links.map((link, index) => {
                                               return <CustomLink key={index} onClick={() => setIsActive(false)} text={link.text} to={link.to}/>
                                           })
                                       }
                                   </ul>
                                   <Button attributes={{onBlur: () => setIsActive(false), onClick: logOut}} text="Выйти"/>
                               </div>
                            </div>
                        </>

                        :
                        <div className="auth">
                            <Button attributes={{onClick: () => navigate(LOGIN_ROUTE)}} text="Войти"/>
                            <Button attributes={{onClick: () => navigate(REGISTRATION_ROUTE)}}
                                    text="Зарегистрироваться"/>
                        </div>
                }

            </div>
        </header>
    );
});

export default Header;