import React from 'react';
import Instagram from "../assets/instagram.svg";
import Pin from '../assets/pin.svg'
import User from '../assets/user.svg'
import Whatsapp from '../assets/whatsapp.svg'
import {Link} from "react-router-dom";

const FirstNav = () => {
    return (
        <div className='first-nav px-main py-half'>
            <div className='block'>
                <Link to={{ pathname: `/`, fromDashboard: false }} className='bold text-black'>Главная</Link>
                <a href='#' className='bold text-black'>О компании</a>
                <a href='#' className='bold text-black'>Доставка и оплата</a>
                <a href='#' className='bold text-black'>Отзывы</a>
                <a href='#' className='bold text-black'>Контакты</a>
            </div>

            <div className='location text'>
                <img src={Pin} alt="pin"/>
                Адрес: г. Москва, ул. 1-ый Красногвардейский, 15
            </div>

            <div className='icons'>
                <a href="#"><img src={Instagram} alt="Instagram link"/></a>
                <a href="#"><img src={Whatsapp} alt="Whatsapp link"/></a>
                <a href="#"><img src={User} alt="Account"/></a>
            </div>
        </div>
    );
};

export default FirstNav;