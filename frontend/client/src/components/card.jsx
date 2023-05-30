import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Basket from 'assets/basket.png'
import { useSelector } from "react-redux";

const Card = (p) => {
    const [cart, setCarts] = useState([])
    const [customer, setCustomers] = useState([])
    const [count, setCount] = useState(0)
    const { user } = useSelector(state => state.user);

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

    
    let user_customer = customer.reduce((obj, item) => {
        if (item.email=user.email) obj = item
        return obj
      }, [])

    

    let user_cart = cart.reduce((obj, item) => {
        if (item.owner=user_customer.id) obj = item
        return obj
      }, [])
    


    const addToBasket = async () => {
        let obj = new FormData()

        obj.append('owner', user_customer.id)
        obj.append('cart', user_cart.id)
        obj.append('qty', count)
        obj.append('product', p.product.id)
        obj.append('final_price', count * p.product.price)

        await axios({
            method: 'post',
            url: 'http://localhost:8000/cartProduct/',
            data: obj
        })

        setCount( 0)
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
        </div>
    );
};

export default Card;