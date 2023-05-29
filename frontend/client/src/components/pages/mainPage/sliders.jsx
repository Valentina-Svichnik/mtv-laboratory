// import React from 'react';
import Card from "../../card";
import axios from "axios";

import React, {useEffect, useRef, useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";

import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";


function Sliders() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8000/product/`
        }).then(response => {
            setProducts(response.data)
        })
    }, [])

    return (
        <div className='sliders px-main py-main'>
            <div className='btn-row'>
                <a href='#' className='h2 btn-shadow'>Популярное</a>
                <a href='#' className='h2 btn-shadow'>Акции</a>
                <a href='#' className='h2 btn-shadow'>Новинки</a>
            </div>

            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                rewind={true}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper2 my-main"
            >
                {products.map((output, id) => (
                    <SwiperSlide><Card product={output}/></SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}

// class Sliders extends  React.Component {
//     state = {products: [],}
//
//     componentDidMount() {
//         let data;
//         axios.get('http://localhost:8000/product/')
//             .then(res => {
//                 data = res.data;
//                 this.setState({
//                     products: data
//                 });
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }
//
//
//
//     render() {
//         console.log(this.state.products)
//         return (
//             <div className='sliders px-main py-main'>
//                 <div className='btn-row'>
//                     <a href='#' className='h2 btn-shadow'>Популярное</a>
//                     <a href='#' className='h2 btn-shadow'>Акции</a>
//                     <a href='#' className='h2 btn-shadow'>Новинки</a>
//                 </div>
//
//                 <Swiper
//                     slidesPerView={4}
//                     spaceBetween={30}
//                     rewind={true}
//                     navigation={true}
//                     modules={[Navigation]}
//                     className="mySwiper2 my-main"
//                 >
//                     {this.state.products.map((output, id) => (
//                         <SwiperSlide><Card product={output}/></SwiperSlide>
//                     ))}
//                 </Swiper>
//
//             </div>
//         )
//     }
// }


export default Sliders;