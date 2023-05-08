import React from 'react';
import Phone from "../assets/phone.svg";
import Cart from "../assets/cart.svg";
import Search from "../assets/search.svg";

const SecondNav = () => {
    return (
        <div className='secondNav px-main py-half'>
            <div>
                <a href='#' className='text text-black'>hello@mtvlab.ru</a>
                <p className='bold'>+7 (495) 136-71-36</p>
            </div>

            <div className='phone'>
                <img src={Phone} alt="phone" width='11px'/>
                <a href='#' className='text'>Заказать звонок</a>
            </div>

            <form>
                <input type="text" placeholder="Поиск" id="search" /><label htmlFor="search"><img src={Search} alt='search' width='15px'/></label>
            </form>

            <div className='cart'>
                <img src={Cart} alt="shopping cart" width='23px'/>
                <div>
                    <p className='bold'>Ваша корзина</p>
                    <p className='text'>0 руб.</p>
                </div>
            </div>
        </div>
    );
};

export default SecondNav;