import React from 'react';
import Logo_white from '../assets/logo-white.png'
import axios from "axios";
import { Link } from 'react-router-dom';


function Uppercase(props) {
    if (props.obj.targeted) {
        return <li className='mt-quater'><Link to={{ pathname: `/category/${props.obj.id}/`, fromDashboard: false }} className='bold text-uppercase text-white'>{props.obj.name}</Link></li>;
    }
}

function LowerCase(props) {
    if (!props.obj.targeted) {
        return <li className='mt-quater'><Link to={{ pathname: `/category/${props.obj.id}/`, fromDashboard: false }} className='bold text-white'>{props.obj.name}</Link></li>;
    }
}


class Footer extends React.Component {
    state = {categories: [],}

    componentDidMount() {
        let data;
        axios.get('http://localhost:8000/category/')
            .then(res => {
                data = res.data;
                this.setState({
                    categories: data
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        return (
            <div className='footer py-main px-main'>
                <div className='block'>
                    <img src={Logo_white} alt='mtv logo'/>
                    <div>
                        <p className='bold text-white'>КАТАЛОГ</p>
                        <ul>
                            {this.state.categories.map((output, id) => (
                                <LowerCase key={id} obj={output} />
                            ))}
                        </ul>
                    </div>
                    <ul>
                        {this.state.categories.map((output, id) => (
                            <Uppercase key={id} obj={output} />
                        ))}
                    </ul>
                    <ul>
                        <li><a href='#' className='bold text-white'>Контакты</a></li>
                        <li className='mt-half'><a href='#' className='bold text-white'>Отзывы</a></li>
                        <li className='mt-half'><a href='#' className='bold text-white'>Доставка и оплата</a></li>
                        <li className='mt-half'><a href='#' className='bold text-white'>О компании</a></li>
                    </ul>
                </div>
                <hr className='mt-main'/>
                <div className='mt-main partners'>
                    <p className='text text-white'>Не оферта, все права защищены.</p>
                    <p className='text text-white'>mtvlab.ru - МТВ лаборатории © 2023</p>
                </div>
            </div>
        );
    };
};

export default Footer;