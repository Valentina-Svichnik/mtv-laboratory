import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";

import 'swiper/swiper.min.css';
// import 'swiper/modules/pagination/pagination.min.css'

import { Navigation } from "swiper";
import { Pagination } from "swiper";
import axios from "axios";

class Partners extends React.Component {
    state = {partnets: [],}

    componentDidMount() {
        let data;
        axios.get('http://localhost:8000/partner/')
            .then(res => {
                data = res.data;
                this.setState({
                    partnets: data
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className='py-main px-main'>
                <div className='partners'>
                    <h2 className='h2'>Наши постоянные клиенты</h2>
                    <p className='text my-half'>Мы ориентированына распространение высокотехнологичных решений и продуктов. Постояннорасширяя перечень продукции и направлений дистрибуции, мы идем к нашейцели — развивать российские инновационные компании. <br/><br/>
                        Долгосрочные и лояльные отношения с нашими партнерами — основа, которая позволяет нашему сотрудничеству развиваться быстро</p>
                </div>

                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    rewind={true}
                    navigation={true}
                    // pagination={{
                    //     dynamicBullets: true,
                    // }}
                    modules={[Navigation, Pagination]}
                    className="swiper-partners"
                >
                    {this.state.partnets.map((output, id) => (
                        <SwiperSlide key={id}>
                            <img src={output.img} alt={output.partner_name}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        );
    }
}


export default Partners;
