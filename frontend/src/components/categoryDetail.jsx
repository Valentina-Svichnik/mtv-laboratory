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
import Card from "./card";

import Back from '../assets/arrow-back.svg'
import Down from '../assets/arrow-down.png'

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
        <div className='mt-main'>
            <div className='row mx-main'>
                <p className='bold text-gray'>Главная / {category.name}</p>
                <div className='filters'>
                    <div className='row one'>
                        <p className='text'>Товаров на странице</p>
                        <input className='filter-count' placeholder='20' />
                    </div>

                    <div className='row two'>
                        <p className='text'>Сортировать</p>
                        <input className='filter-sort' placeholder='Без сортировки'/>
                    </div>
                </div>
            </div>
            <a className=''>
                <img src={Back}/>
                <p className='mt-quater bold text-gray mx-main'>Назад</p>
            </a>

            {/*<h1>{category.name}</h1>*/}

            <div className='bc-gray py-main px-main mt-half'>
                <div className='products'>
                    {products.map(output => (
                        <Card product={output}/>
                    ))}
                </div>
                <a className='text mt-main text-center'>Показать ещё <img src={Back}/></a>
            </div>



        </div>
    )
}

// class CategoryDetail extends React.Component {
//
//
//     state = {categories: [],}
//     slug = category.params.slug
//
//
//     componentDidMount() {
//         console.log(this.state.categories)
//         let data;
//         axios.get(`http://localhost:8000/category/`)
//             .then(res => {
//                 data = res.data;
//                 this.setState({
//                     categories: data
//                 });
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }
//
//
//     render() {
//
//         return (
//             <div>
//                 <h1>Hello! </h1>
//             </div>
//         );
//     };
// };

export default CategoryDetail;