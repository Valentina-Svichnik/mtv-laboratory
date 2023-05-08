import React from 'react';
import Search from "../assets/search.svg";

const Subscribe = () => {
    return (
        <div className='subscribe bc-blue'>
            <div className='block'>
                <p className='huge-text text-white'>Подпишись на новости</p>
                <p className='text text-white'>Не пропусти новые акции и предложения</p>
            </div>

            <form className='subscribe-form'>
                <input type="text" placeholder="Email" />
                <button type='submit' className='text btn-white text-white'>Отправить</button>
            </form>


        </div>
    );
};

export default Subscribe;