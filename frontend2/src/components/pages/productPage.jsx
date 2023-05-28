import React, {useEffect, useState} from 'react';
import Down from "../../assets/arrow-down.svg";
import Back from "../../assets/arrow-back.svg";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import LeftNav from "../leftNav";
import FirstNav from "../firstNav";
import SecondNav from "../secondNav";
import Subscribe from "../subscribe";

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

    const [count, setCount] = useState(0)

    function increment() {
        setCount(count + 1)
    }

    function decrement() {
        if (count > 0) {
            setCount(count - 1)
        }
    }

    function addToBasket() {
        setCount( 0)
    }


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
            </div>
            <Subscribe/>
        </div>
    )
}

export default ProductPage;