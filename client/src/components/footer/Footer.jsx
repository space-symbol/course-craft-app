import React, {useEffect, useState} from 'react';
import './footer.css'
import vk from '../../assets/vk.svg'
import telegram from '../../assets/telegram.svg'
import {CARDS_ROUTE} from "../../utils/consts";
import CustomLink from "../link2/CustomLink";

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
        {
            path: CARDS_ROUTE,
            text: "Курсы"
        },
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

    const activateBurger = (e) => {
        setBurgerIsActive(!burgerIsActive)
    }
    return (
        <footer>
            {
                mobile &&
                <button
                    className={`burger ${burgerIsActive && 'open'}`}
                    onClick={activateBurger}
                    onFocus={activateBurger}
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
                                <CustomLink attributes={{onClick: activateBurger}}
                                            key={index}
                                            text={link.text}
                                            to={link.path}/>
                            )
                        })}
                </ul>
            </nav>

            <div className="contacts">
                <div className="contacts-stoleru">
                    <div className="contacts-title">Вадим</div>
                    <div className="contacts-wrapper">
                        <a rel="noreferrer" target="_blank" href="https://vk.com/s.vadim500">
                            <img src={vk} alt="vk" title="вконтакте"/>
                        </a>
                        <a rel="noreferrer" target="_blank" href="https://t.me/vadimishere">
                            <img src={telegram} alt="telegram" title="телеграм"/>
                        </a>
                    </div>
                </div>
                <div className="contacts-poplauhin">
                    <div className="contacts-title">Дмитрий</div>
                    <div className="contacts-wrapper">
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
