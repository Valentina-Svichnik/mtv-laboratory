import React, {useEffect, useState} from 'react';
import Down from "../../assets/arrow-down.svg";
import Back from "../../assets/arrow-back.svg";
import {Link, useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import FirstNav from "../firstNav";
import SecondNav from "../secondNav";
import Subscribe from "../subscribe";

import { useSelector } from "react-redux";
import ModalBackCall from "components/modalBackCall";

function ShowMore(length) {
    if (length.length > 3) {
        return <a className='text mt-main text-center showMore'>Показать ещё <img src={Down}/></a>
    }
}

function ProductPage() {
    const [product, setProduct] = useState([])
    const [category, setCategory] = useState({})
    // const [comment, setComment] = useState({})
    const { id } = useParams();
    const [cart, setCarts] = useState([])
    const [customer, setCustomers] = useState([])
    const [count, setCount] = useState(0)
    const { isAuthenticated, user } = useSelector(state => state.user);
    const [modalActive, setModalActive] = useState( false)
    const navigate = useNavigate();


    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8000/product/${id}/`
        }). then(response => {
            setProduct(response.data)
            setCategory(response.data.category[0])
            // setComment((response.data.comment))
        })
    }, [id])

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
            obj.append('product', product.id)
            obj.append('final_price', count * product.price)

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

    return(
        <div>
            <FirstNav/>
            <SecondNav/>
            <div className='mt-main mx-main'>
                <p className='bold text-gray'>Главная / {category.name}</p>
                <Link to={{ pathname: `/category/${category.id}`, fromDashboard: false }} className='back mt-quater'>
                    <img src={Back}/>
                    <p className='bold text-gray'>Назад</p>
                </Link>
                <div className='product-block row'>
                    <img src={product.image} alt={product.slug}/>
                    <div>
                        <h1> {product.title}</h1>
                        <p className='h2 mt-main'>{product.price}</p>

                        <div className='row my-main'>
                            <div className='row gap-half'>
                                <button onClick={decrement} className='btn-backet small-bold'>-</button>
                                <p className='small-bold'>{count}</p>
                                <button onClick={increment} className='btn-backet small-bold'>+</button>
                                <button onClick={addToBasket} className='btn-addToBasket bold mx-half'>Добавить в корзину</button>
                            </div>
                        </div>

                        <p className='bold mt-main'>Описание</p>
                        <p className='text'>{product.description}</p>

                        <p className='bold mt-half'>Состав:</p>
                        <p className='text mb-main'>{product.composition}</p>
                    </div>
                </div>
                {/*<p className='bold'>Отзывы</p>*/}
                {/*<ShowMore length={product.length} />*/}

                <ModalBackCall active={modalActive} setActive={setModalActive}>
                    <p className='text mb-half'>Товары успешно добавлены!</p>
                    <Link to={{ pathname: `/cart`, fromDashboard: false }} className='text btn-addToBasket mt-half'>Перейти в корзину</Link>
                </ModalBackCall>
            </div>
            <Subscribe/>
        </div>
    )
}

export default ProductPage;