import React, {useState} from 'react';
import Basket from '../assets/basket.png'

const Card = (product) => {
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

    return (
        <div className='card'>
            <div className='imgProduct'><img src={product.product.image} alt={product.product.title}/></div>
            <p className='text'>{product.product.title}</p>
            <div className='row'>
                <p className='h2'>{product.product.price}</p>
                <div className='row gap-half'>
                    <button onClick={decrement} className='btn-backet small-bold'>-</button>
                    <p className='small-bold'>{count}</p>
                    <button onClick={increment} className='btn-backet small-bold'>+</button>
                    <button onClick={addToBasket}><img src={Basket} alt='add to basket'/></button>
                </div>
                <div className='sale text-white small-bold'>-20%</div>
            </div>


        </div>
    );
};

export default Card;