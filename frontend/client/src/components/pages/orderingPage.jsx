import { useEffect, useState } from "react";
import React from 'react';
import { useSelector } from "react-redux";
import FirstNav from "components/firstNav";
import SecondNav from "components/secondNav";
import {Link, useNavigate} from 'react-router-dom';
import Back from "../../assets/arrow-back.svg";
import Subscribe from "../subscribe";
import axios from "axios";



const OrderingPage = () => {
    const [cart, setCarts] = useState([])
    const [customer, setCustomers] = useState([])
    const [prod, setProds] = useState([])
    const [cartDetail, setCartDetails] = useState([]);
    const { isAuthenticated, user } = useSelector(state => state.user);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        buying_type: '',
        city: '',
        street: '',
        house: '',
        flat: '',
        comment: '',
    });

    const { first_name, last_name, phone, buying_type, city, street, house, flat, comment } = formData;
 
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }


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

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8000/cart/1/`
        }). then(response => {
            setCartDetails((response.data))
        })
    }, [cartDetail])



    const addOrder = async () => {

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

            let address = formData.city + formData.street + formData.house + formData.flat
            let buying_type = (formData.buying_type==='Самовывоз' ? 'self' : 'delivery')

            obj.append('customer', user_customer.id)
            obj.append('first_name', formData.first_name)
            obj.append('last_name', formData.last_name)
            obj.append('phone', formData.phone)
            obj.append('cart', user_cart.id)
            obj.append('address', address)
            obj.append('status', 'in_progress')
            obj.append('buying_type', buying_type)
            obj.append('comment', formData.comment)
            obj.append('delivery_price', delivery)
            obj.append('price', delivery + sum)


            await axios({
                method: 'post',
                url: `http://localhost:8000/order/`,
                data: obj
            })

            navigate('/successOrder')
        } 

    }


    const cartProducts = cartDetail.products    

    let sum = 0  
    cartProducts?.map(p => (
        sum += Number(p.final_price)
    ))

    let delivery = 0;
    (formData.buying_type === "Курьерская доставка") ? delivery = 600 : delivery = 0


    if (!isAuthenticated && user === null ) 
        navigate('/login')

    return (
        <div>
            <FirstNav/>
            <SecondNav/>
            <h1 className='mx-main mt-main'>Оформление заказа</h1>
            <Link to={{ pathname: `/cart`, fromDashboard: false }} className='back mt-quater mx-main'>
                <img src={Back}/>
                <p className='bold text-gray'>Назад</p>
            </Link>

            <div className="ordering my-main mx-main">
                <div className="column1">
                    <p className="h2">1. КТО БУДЕТ ПОЛУЧАТЬ ЗАКАЗ?</p>
                    <div className="bg-blue mt-main">
                        <form className="flex-wrap">
                            <div className='column mt-half'>
                                <label htmlFor='last_name' className='text'>Фамилия <span>*</span></label>
                                <input name='last_name' type='text' onChange={onChange} required/>
                            </div>
                            <div className='column mt-half'>
                                <label htmlFor='first_name' className='text'>Имя <span>*</span></label>
                                <input name='first_name' type='text' onChange={onChange} required/>
                            </div>
                            <div className='phone column mt-half'>
                                <label htmlFor='phone' className='text'>Телефон <span>*</span></label>
                                <div className="row">
                                    <input 
                                    name='phone' 
                                    type="tel"
                                    required
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                                    onChange={onChange} 
                                    placeholder='999-999-9999'/>
                                    <span class="validity"></span>
                                </div>
                            </div>
                        </form>
                    </div>

                    <p className="h2 mt-main">2. ДОСТАВКА</p>
                    <div className="bg-blue mt-main">
                        <form className="flex-wrap">
                            <div className='column w-100 mt-half'>
                                <p className='bold'>Выберите способ доставки <span>*</span></p>
                                <div className="radio mt-quater">
                                    <input name='buying_type' type='radio' onChange={onChange} value='Самовывоз' required />
                                    <label htmlFor='buying_type' className='text' >Самовывоз</label>
                                </div>
                                <div className="radio">
                                    <input name='buying_type' type='radio' onChange={onChange} value='Курьерская доставка' require/>
                                    <label htmlFor='buying_type' className='text'>Курьерская доставка</label>
                                </div>

                                <p className='bold mt-half'>Адрес доставки</p>
                            </div>
                            <div className='column mt-half'>
                                <label htmlFor='city' className='text'>Город <span>*</span></label>
                                <input name='city' type='text' onChange={onChange} disabled={formData.buying_type === 'Самовывоз'} />
                            </div>
                            <div className='column mt-half'>
                                <label htmlFor='street' className='text'>Улица <span>*</span></label>
                                <input name='street' onChange={onChange} disabled={formData.buying_type === 'Самовывоз'}/>
                            </div>
                            <div className='column w-25 mt-half'>
                                <label htmlFor='house' className='text'>Дом, корпус/строение <span>*</span></label>
                                <input name='house' type='text' onChange={onChange} disabled={formData.buying_type === 'Самовывоз'}/>
                            </div>
                            <div className='column w-25 mt-half'>
                                <label htmlFor='flat' className='text'>Квартира</label>
                                <input name='flat' onChange={onChange} disabled={formData.buying_type === 'Самовывоз'}/>
                            </div>
                            <div className='column mt-half'>
                                <label htmlFor='comment' className='text'>Комментарий к заказу</label>
                                <textarea name='comment' className="comment" onChange={onChange}/>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="column2 bg-blue">
                <div className="row bold mt-half text-gray">
                        <p>Сумма заказа</p>
                        <p>{ sum }</p>
                    </div>
                    <div className="row bold mt-quater text-gray">
                        <p>Доставка</p>
                        <p>{ delivery }</p>
                    </div>
                    <div className="row mt-quater">
                        <p>ИТОГ</p>
                        <p>{ sum + delivery}</p>
                    </div>
                    <Link to={{ pathname: `/ordering`, fromDashboard: false }} onClick={addOrder} className="text btn-addToBasket mt-half">Оформить заказ</Link>
                </div>
            </div>
            
            
            <Subscribe/>
        </div>
    );
};

export default OrderingPage;