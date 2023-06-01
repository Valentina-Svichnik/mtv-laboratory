
import React from 'react';
import FirstNav from "components/firstNav";
import SecondNav from "components/secondNav";
import {Link, useNavigate} from 'react-router-dom';
import Back from "../../assets/arrow-back.svg";



const SuccessOrder = () => {
    

    return (
        <div className='successPage'>
            <FirstNav/>
            <SecondNav/>
            <Link to={{ pathname: `/`, fromDashboard: false }} className='back mt-main mx-main'>
                <img src={Back}/>
                <p className='bold text-gray'>Вернуться на главную страницу</p>
            </Link>
            <div className="success mx-main my-main">
                <p>Вы успешно оформили заказ! В ближайшее время наш менеджер свяжется с вами</p>
            </div>
        </div>
    );
};

export default SuccessOrder;