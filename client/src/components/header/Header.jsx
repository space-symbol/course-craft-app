import React, {useContext, useState} from 'react';
import './header.css'
import logo from '../../assets/logo.svg'
import avatar from "../../assets/default-avatar.svg"
import {Link, useNavigate} from "react-router-dom";
import Button from "../button/Button";
import {ADMIN_ROUTE, CARDS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, USER_PROFILE_ROUTE} from "../../utils/consts";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import CustomLink from "../link2/CustomLink";

const Header = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [isActive, setIsActive] = useState(false)

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        navigate(LOGIN_ROUTE)
    }

    return (
        <header className="header">
            <Link className="header__logo" to={CARDS_ROUTE}>
                <img src={logo} alt="logo"/>
            </Link>
            <div className="header-container">

                {
                    user._user.role === "ADMIN" && (
                        <Link className="button" to={ADMIN_ROUTE}>Админка</Link>
                    )
                }

                {
                    user._isAuth ?
                        <>
                            <button className={`user ${isActive && "open"}`} onClick={() => setIsActive(!isActive)}>
                                <img src={avatar} alt="avatar" title="Ваш аватар"/>
                            </button>

                            <ul className={`user-menu ${isActive && "open"}`}>
                                <div className="links">
                                    <CustomLink text="Профиль" to={USER_PROFILE_ROUTE}/>
                                    <CustomLink text="Настройки" to={USER_PROFILE_ROUTE}/>
                                </div>
                                <Button attributes={{onBlur: () => setIsActive(false),onClick: logOut}} text="Выйти"/>
                            </ul>
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
