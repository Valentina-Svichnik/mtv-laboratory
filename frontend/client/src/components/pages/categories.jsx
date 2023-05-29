import React from 'react';
import {Link} from "react-router-dom";
import FirstNav from "../firstNav";
import SecondNav from "../secondNav";
import Back from "../../assets/arrow-back.svg";
import Subscribe from "../subscribe";

const Categories = () => {
    let content = [];
    const titles =['Дезинфицирующая продукция', 'Диспансеры и дозаторы', 'Светильники и рециркуляторы', 'Хозяйственные товары', 'Рекламно-сувенирная продукция', 'Аксессуары для товарокурения', 'ДЛЯ ПРЕДПРИЯТИЙ', 'ДЛЯ РЕСТОРАНОВ', 'ДЛЯ КУХНИ', 'ДЛЯ САЛОНОВ КРАСОТЫ', 'WELLNESS - ИНДУСТРИЯ']
    // const titlesTargeted=['ДЛЯ ПРЕДПРИЯТИЙ', 'ДЛЯ РЕСТОРАНОВ', 'ДЛЯ КУХНИ', 'ДЛЯ САЛОНОВ КРАСОТЫ', 'WELLNESS - ИНДУСТРИЯ']

    for (let i = 1; i <= 6; i++) {
        content.push( <div className={"category" + i}><Link to={{ pathname: `/category/${i}/`, fromDashboard: false }} className='bold'>{titles[i-1]}</Link></div>)
    }
    content.push( <br/>)
    content.push( <br/>)
    content.push( <br/>)
    for (let i = 7; i <= 11; i++) {
        content.push( <div className={"category" + i}><Link to={{ pathname: `/category/${i}/`, fromDashboard: false }} className='bold'>{titles[i-1]}</Link></div>)
    }
    return (
        <div>
            <FirstNav/>
            <SecondNav/>
            <h1 className='mx-main mt-main'>Каталог</h1>
            <Link to={{ pathname: `/`, fromDashboard: false }} className='back mt-quater mx-main'>
                <img src={Back}/>
                <p className='bold text-gray'>Назад</p>
            </Link>
            <div className='categories mx-main mx-huge'>
                {content}
            </div>
            <Subscribe/>
        </div>
    );
};

export default Categories;