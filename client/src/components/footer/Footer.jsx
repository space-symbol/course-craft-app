import React, {useEffect, useState} from 'react';
import './footer.css'
import vk from '../../assets/vk.svg'
import telegram from '../../assets/telegram.svg'
import {COURSES_ROUTE} from "../../utils/consts";
import CustomLink from "../custom-link/CustomLink";

const Footer = () => {
    const [burgerIsActive, setBurgerIsActive] = useState(false)
    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        if (window.innerWidth <= 630) {
            setMobile(true)
        } else {
            setMobile(false)
        }
    }, [])

    const links = [
        {path: COURSES_ROUTE, text: "Курсы"},
    ]

    const resizeHandler = () => {
        if (window.innerWidth <= 670) {
            setMobile(true)
        } else {
            setMobile(false)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", resizeHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])

      return (
        <footer>
            {
                mobile &&
                <button
                    className={`burger ${burgerIsActive && 'open'}`}
                    onClick={() => setBurgerIsActive(!burgerIsActive)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            }

            <nav className={`navbar ${mobile && 'mobile'} ${burgerIsActive && 'open'}`}>
                <ul>
                    {
                        links.map((link, index) => {
                            return (
                                <CustomLink
                                    onClick={() => setBurgerIsActive(false)}
                                    attributes={{tabIndex: !mobile || burgerIsActive ? '0' : '-1'}}
                                    key={index}
                                    text={link.text}
                                    to={link.path}></CustomLink>
                            )
                        })}
                </ul>
            </nav>

            <div className="contacts">
                <div className="contacts-people">
                    <div className="contacts-people__container">
                        <a rel="noreferrer" target="_blank" href="https://vk.com/s.vadim500">
                            <img src={vk} alt="vk" title="вконтакте"/>
                        </a>
                        <a rel="noreferrer" target="_blank" href="https://t.me/vadimishere">
                            <img src={telegram} alt="telegram" title="телеграм"/>
                        </a>
                    </div>
                </div>
                <div className="contacts-people">
                    <div className="contacts-people__container">
                        <a rel="noreferrer" target="_blank" href="https://vk.com/feral_ber">
                            <img src={vk} alt="vk" title="вконтакте"/>
                        </a>
                        <a rel="noreferrer" target="_blank" href="https://t.me/nevasik">
                            <img src={telegram} alt="telegram" title="телеграм"/>
                        </a>
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
