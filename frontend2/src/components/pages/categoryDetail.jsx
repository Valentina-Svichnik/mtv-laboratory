import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useMatch,
    useParams,
} from 'react-router-dom';
import Card from "../card";

import Back from '../../assets/arrow-back.svg'
import Down from '../../assets/arrow-down.svg'
import LeftNav from "../leftNav";
import FirstNav from "../firstNav";
import SecondNav from "../secondNav";
import Subscribe from "../subscribe";

function ShowMore(length) {
    if (length.length > 0) {
        return <a className='text mt-main text-center showMore'>Показать ещё <img src={Down}/></a>
    } else
        return <p className='text'>Товары не найдены</p>
}

function CategoryDetail() {
    const [category, setCategory] = useState({})
    const [products, setProducts] = useState([])
    const { id } = useParams();


    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8000/category/${id}/`
        }). then(response => {
            setCategory(response.data)
            setProducts(response.data.products)
        })
    }, [id])

    return(
        <div>
            <LeftNav/>
            <div className='container'>
                <FirstNav/>
                <SecondNav/>
                <div className='mt-main'>
                    <div className='row mx-main'>
                        <p className='bold text-gray'>Главная / {category.name}</p>
                        <form className='filters'>
                            <div className='row one'>
                                <p className='text'>Товаров на странице</p>
                                <input className='filter-count' placeholder='20' />
                            </div>

                            <div className='row two'>
                                <p className='text'>Сортировать</p>
                                <input id='sort' className='filter-sort' placeholder='Без сортировки'/><label htmlFor="sort" className='sort-img'><img src={Down}/></label>
                            </div>
                        </form>
                    </div>
                    <Link to={{ pathname: `/`, fromDashboard: false }} className='back mt-quater mx-main'>
                        <img src={Back}/>
                        <p className='bold text-gray'>Назад</p>
                    </Link>

                    <div className='categoryDetail bc-gray py-main px-main mt-half'>
                        <div className='products'>
                            {products.map(output => (
                                <Card product={output}/>
                            ))}
                        </div>
                        {/*<a className='text mt-main text-center showMore'>Показать ещё <img src={Down}/></a>*/}
                        <ShowMore length={products.length} />
                    </div>



                </div>
            </div>
            <Subscribe/>
        </div>
    )
}

export default CategoryDetail;