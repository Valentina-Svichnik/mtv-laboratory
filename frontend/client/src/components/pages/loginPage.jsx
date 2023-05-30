import { useEffect, useState } from "react";
import React from 'react';
import FirstNav from "components/firstNav";
import SecondNav from "components/secondNav";
import {Link, Navigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { resetRegistered, login } from "features/user";


const LoginPage = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, loading, registered } = useSelector(state => state.user);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (registered)
            dispatch(resetRegistered());
    }, [registered]);

    const { email, password } = formData;

    const onChange = e => {
        if (e.target.name === 'email'){
            setFormData({...formData, [e.target.name]: e.target.value.toLowerCase() });
        } else
            setFormData({...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault()

        dispatch(login({ email, password }));
    }


    if (isAuthenticated) return <Navigate to='/'/>

    return (
        <div>
            <FirstNav/>
            <SecondNav/>
            <div className='whiteBlock'>
                <div>
                    <h1>Вход</h1>
                    <form onSubmit={onSubmit}>
                        <div className='column mt-half'>
                            <label htmlFor='email' className='text'>Логин</label>
                            <input name='email' type='email' onChange={onChange} required/>
                        </div>
                        <div className='column mt-half'>
                            <label htmlFor='password' className='text'>Пароль</label>
                            <input name='password' type='password' onChange={onChange} required/>
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

export default LoginPage;