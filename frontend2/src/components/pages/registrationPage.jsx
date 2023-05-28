import React from 'react';
import FirstNav from "../firstNav";
import SecondNav from "../secondNav";
import {Link, NavLink} from "react-router-dom";
import {Navigate} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux";
import { useState } from "react";
import {register} from "../../features/user";


const RegistrationPage = () => {
    const dispatch = useDispatch();
    const { registered, loading } = useSelector(state => state.user);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });

    const { first_name, last_name, email, password} = formData;
    
    const onChange = e => setFormData({...formData})
      
    const onSubmit = e => {
        e.preventDefault()

        dispatch(register({first_name, last_name, email, password}));
    }

    if (registered) return <Navigate to='/enter'/>

    return (
        <div>
            <FirstNav/>
            <SecondNav/>
            <div className='whiteBlock reg'>
                <div>
                    <h1>Регистрация</h1>
                    <form onSubmit={onSubmit}>
                        <div className='column mt-half'>
                            <label htmlFor='first_name' className='text'>Имя</label>
                            <input name='first_name' type='text' onChange={onChange} required/>
                        </div>
                        <div className='column mt-half'>
                            <label htmlFor='last_name' className='text'>Фамилия</label>
                            <input name='last_name' type='text' onChange={onChange} required/>
                        </div>
                        <div className='column mt-half'>
                            <label htmlFor='phone' className='text'>Телефон</label>
                            <input id='phone'/>
                        </div>
                        <div className='column mt-half'>
                            <label htmlFor='email' className='text'>E-mail</label>
                            <input name='email' type='email' onChange={onChange} required/>
                        </div>
                        <div className='column mt-half'>
                            <label htmlFor='birthday' className='text'>Дата рождения</label>
                            <input id='birthday'/>
                        </div>
                        <div className='column mt-half'>
                            <label htmlFor='gender' className='text'>Пол</label>
                            <input id='gender'/>
                        </div>
                        <div className='column mt-half'>
                            <label htmlFor='password1' className='text'>Придумайте пароль</label>
                            <input id='password1'/>
                        </div>
                        <div className='column mt-half'>
                            <label htmlFor='password2' className='text'>Повторите пароль</label>
                            <input name='password2' type='password' onChange={onChange} required/>
                        </div>
                        <div className='mt-half'>
                            <button className='btn-addToBasket bold'>Зарегистрироваться</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;