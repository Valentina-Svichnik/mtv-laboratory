import React from 'react';
import Bubble from "../../../assets/bubble1.png";
import {Link} from "react-router-dom";

const Offer = () => {
    let content = [];
    const titles =['Дезинфицирующая продукция', 'Диспансеры и дозаторы', 'Светильники и рециркуляторы', 'Хозяйственные товары', 'Рекламно-сувенирная продукция', 'Аксессуары для товарокурения']

    for (let i = 1; i <= 6; i++) {
        content.push( <div className={"category" + i}><Link to={{ pathname: `/category/${i}/`, fromDashboard: false }} className='bold'>{titles[i-1]}</Link></div>)
    }
    return (
        <div>
            <div className='offer  mx-main my-main'>
                <div className='block'>
                    <h1 className='text-white'>Долгосрочные отношения <br/> с нашими партнерами</h1>
                    <p className='text text-white'>— это основа, которая позволяет нашему сотрудничеству <br/>
                        развиваться быстро</p>
                    <Link to={{ pathname: `/category/`, fromDashboard: false }} href='#' className='btn-white bold text-white'>В каталог</Link>
                </div>
                <img src={Bubble} alt="mtv logo" className='bubble1'/>
                <img src={Bubble} alt="mtv logo" className='bubble2'/>
            </div>

            <div className='categories mx-main'>
                {content}
            </div>
        </div>
    );
};

export default Offer;