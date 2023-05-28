import { useEffect } from "react";
import React from 'react';
import FirstNav from "../firstNav";
import SecondNav from "../secondNav";
import {Link} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { resetRegistered } from "../../features/user";

const EnterPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetRegistered());
    }, []);
    return (
        <div>
            <FirstNav/>
            <SecondNav/>
            <div className='whiteBlock'>
                <div>
                    <h1>Вход</h1>
                    <form>
                        <div className='column mt-half'>
                            <label htmlFor='login' className='text'>Логин</label>
                            <input id='login'/>
                        </div>
                        <div className='column mt-half'>
                            <label htmlFor='password' className='text'>Пароль</label>
                            <input id='password'/>
                        </div>
                        <div className='mt-half'>
                            <button className=' btn text'>Забыли пароль?</button>
                            <button className='btn-addToBasket bold'>Войти</button>
                        </div>
                        <Link to={{ pathname: `/registration`, fromDashboard: false }} className='btn mt-half bold text-blue'>Ещё не зарегистрированы?<br/>Создать аккаунт</Link>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default EnterPage;