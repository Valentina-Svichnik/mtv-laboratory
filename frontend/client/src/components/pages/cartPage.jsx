import { useEffect, useState } from "react";
import React from 'react';
import { useSelector } from "react-redux";
import FirstNav from "components/firstNav";
import SecondNav from "components/secondNav";
import {Link, useNavigate} from 'react-router-dom';
import Back from "../../assets/arrow-back.svg";
import Subscribe from "../subscribe";
import axios from "axios";
import Remove from 'assets/remove.png'



const CartPage = () => {
    const [prod, setProds] = useState([])
    // const [cart, setCarts] = useState([]);
    // const [customer, setCustomers] = useState([]);
    const [cartDetail, setCartDetails] = useState([]);
    const { isAuthenticated, user } = useSelector(state => state.user);
    const navigate = useNavigate();

    // useEffect(() => {
    //     axios({
    //         method: "GET",
    //         url: `http://localhost:8000/cart/`
    //     }). then(response => {
    //         setCarts((response.data))
    //     })
    // }, [])

    // useEffect(() => {
    //     axios({
    //         method: "GET",
    //         url: `http://localhost:8000/customer/`
    //     }). then(response => {
    //         setCustomers((response.data))
    //     })
    // }, [])

    // const user_customer = customer.reduce((obj, item) => {
    //     if (item.email=user.email) obj = item
    //     return obj
    // }, [])
    
    // const user_cart = cart.reduce((obj, item) => {
    //     if (item.owner=user_customer.id) obj = item
    //     return obj
    // }, []) 

    // console.log(user_cart.id)

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8000/cart/1/`
        }). then(response => {
            setCartDetails((response.data))
        })
    }, [cartDetail])

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8000/product/`
        }). then(response => {
            setProds((response.data))
        })
    }, [])

    const cartProducts = cartDetail.products    

    let sum = 0  
    cartProducts?.map(p => (
        sum += Number(p.final_price)
    ))


    const deleteProduct = (id, e) => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/cartProduct/${id}/`)
    }

    if (!isAuthenticated && user === null ) 
        navigate('/login')

    return (
        <div>
            <FirstNav/>
            <SecondNav/>
            <h1 className='mx-main mt-main'>Корзина</h1>
            <Link to={{ pathname: `/`, fromDashboard: false }} className='back mt-quater mx-main'>
                <img src={Back}/>
                <p className='bold text-gray'>Назад</p>
            </Link>

            <div className=''>
            {cartProducts?.map(p => (
                <div className="cartLine row">
                    <img src={prod[p.product-1].image} alt={prod[p.product-1].title} width='200' />
                    <p className="bold nameProd">{ prod[p.product-1].title  }</p>
                    <p className="text">{ p.qty }</p>
                    <p className="h2">{ p.final_price }</p>
                    <button onClick={(e) => deleteProduct(p.id, e)}><img src={Remove} alt="delete product" width='25' /></button>
                </div>
            ))}
            </div>

            <div className="row-end">
                <div className="total mb-main mx-main">
                    <div className="row my-main">
                        <p>ИТОГО</p>
                        <p>{ sum }</p>
                    </div>
                    <Link to={{ pathname: `/ordering`, fromDashboard: false }} className="text btn-addToBasket">Оформить заказ</Link>
                </div>
            </div>
            
            <Subscribe/>
        </div>
    );
};

export default CartPage;