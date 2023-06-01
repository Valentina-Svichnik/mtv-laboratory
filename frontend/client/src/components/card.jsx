import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Basket from 'assets/basket.png'
import { useSelector } from "react-redux";
import {Navigate} from 'react-router-dom';
import ModalBackCall from "./modalBackCall";


const Card = (p) => {
    const [cart, setCarts] = useState([])
    const [customer, setCustomers] = useState([])
    const [count, setCount] = useState(0)
    const { isAuthenticated, user } = useSelector(state => state.user);
    const [modalActive, setModalActive] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8000/cart/`
        }). then(response => {
            setCarts((response.data))
        })
    }, [])

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8000/customer/`
        }). then(response => {
            setCustomers((response.data))
        })
    }, [])



    const addToBasket = async () => {

        if (!isAuthenticated && user === null ) {
            navigate('/login')
        } else {

            let user_customer = customer.reduce((obj, item) => {
                if (item.email=user.email) obj = item
                return obj
              }, [])
        
        
            let user_cart = cart.reduce((obj, item) => {
                if (item.owner=user_customer.id) obj = item
                return obj
              }, [])

              let obj = new FormData()

            obj.append('owner', user_customer.id)
            obj.append('cart', user_cart.id)
            obj.append('qty', count)
            obj.append('product', p.product.id)
            obj.append('final_price', count * p.product.price)

            await axios({
                method: 'post',
                url: `http://localhost:8000/cartProduct/`,
                data: obj
            })

            setModalActive(true)
            // setCount( 0)
        }   
    }


    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }


    return (
        <div className='card'>
            <div className='imgProduct'><img src={p.product.image} alt={p.product.title}/></div>
            <Link to={{ pathname: `/product/${p.product.id}`, fromDashboard: false }} className='text text-black'>{p.product.title}</Link>
            <div className='row'>
                <p className='h2'>{p.product.price}</p>
                <div className='row gap-half'>
                    <button onClick={decrement} className='btn-backet small-bold'>-</button>
                    <p className='small-bold'>{count}</p>
                    <button onClick={increment} className='btn-backet small-bold'>+</button>
                    <button onClick={addToBasket}><img src={Basket} alt='add to basket'/></button>
                </div>
                <div className='sale text-white small-bold hide'>-20%</div>
            </div>

            <ModalBackCall active={modalActive} setActive={setModalActive}>
                <p className='text mb-half'>Товары успешно добавлены!</p>
                <Link to={{ pathname: `/cart`, fromDashboard: false }} className='text btn-addToBasket mt-half'>Перейти в корзину</Link>
            </ModalBackCall>
        </div>
    );
};

export default Card;