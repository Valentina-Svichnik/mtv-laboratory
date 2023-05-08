import React from 'react';
import Bubble from "../assets/bubble1.png";

const Offer = () => {
    return (
        <div className='offer  mx-main my-main'>
            <div className='block'>
                <h1 className='text-white'>Долгосрочные отношения <br/> с нашими партнерами</h1>
                <p className='text text-white'>— это основа, которая позволяет нашему сотрудничеству <br/>
                    развиваться быстро</p>
                <a href='#' className='btn-white bold text-white'>В каталог</a>
            </div>
            <img src={Bubble} alt="mtv logo" className='bubble1'/>
            <img src={Bubble} alt="mtv logo" className='bubble2'/>
        </div>
    );
};

export default Offer;