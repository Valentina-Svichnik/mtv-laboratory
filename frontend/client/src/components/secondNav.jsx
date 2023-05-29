import React, {useState} from 'react';
import Phone from "assets/phone.svg";
import Cart from "assets/cart.svg";
import Search from "assets/search.svg";
import ModalBackCall from "./modalBackCall";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "features/user";

const SecondNav = () => {
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector(state => state.user)
    const [modalActive, setModalActive] = useState( false)

    const authLinks = (
        <>
            <a onClick={() => dispatch(logout())} className='text btn-addToBasket logout'>Выйти</a>
        </>
    )

    // const TelegramBot = require('node-telegram-bot-api');
    // const token = '6045841826:AAFSFlENYXC87L5_yxXWQDPBHzZ8fEu6y4Y';
    // const bot = new TelegramBot(token, {polling: true});
    //
    // bot.on('message', (msg) => {
    //
    //     var Hi = "hi";
    //     if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
    //         bot.sendMessage(msg.chat.id,"Hello dear user");
    //     }
    //
    // });

    return (
        <div className='secondNav px-main py-half'>
            <div className='column'>
                <a href="mailto:hello@mtvlab.ru" className='text text-black'>hello@mtvlab.ru</a>
                <a href="tel:89104188177" className='bold text-black'>+7 910 418-81-77</a>
            </div>

            <div className='phone'>
                <img src={Phone} alt="phone" width='11px'/>
                <button className='text text-blue' onClick={() => setModalActive(true)}>Заказать звонок</button>
            </div>

            <form>
                <input type="text" placeholder="Поиск" id="search" /><label htmlFor="search" className='search-img'><img src={Search} alt='search' width='15px'/></label>
            </form>

            <div className='cart'>
                <img src={Cart} alt="shopping cart" width='23px'/>
                <div>
                    <p className='bold'>Ваша корзина</p>
                    <p className='text'>0 руб.</p>
                </div>
            </div>
            {  isAuthenticated ? authLinks : true}
            <ModalBackCall active={modalActive} setActive={setModalActive}>
                <p className='huge-text'>Заказать обратный звонок</p>
                <form className='modalBackCall'>
                    <div className='column mt-half'>
                        <label htmlFor='phone' className='text'>Куда перезвонить?</label>
                        <input id='phone' placeholder='+7(999) 999-99-99'/>
                    </div>
                    <div className='column mt-half'>
                        <label htmlFor='comment' className='text'>Комментарий к звонку</label>
                        <input id='comment'/>
                    </div>
                    <div className='mt-half'>
                        <button className='btn-addToBasket bold'>Отправить</button>
                    </div>
                </form>
            </ModalBackCall>

        </div>
    );
};

export default SecondNav;