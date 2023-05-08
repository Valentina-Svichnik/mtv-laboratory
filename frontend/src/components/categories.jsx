import React from 'react';

const Categories = () => {
    let content = [];
    const titles =['Дезинфицирующая продукция', 'Диспансеры и дозаторы', 'Светильники и рециркуляторы', 'Хозяйственные товары', 'Рекламно-сувенирная продукция', 'Аксессуары для товарокурения']

    for (let i = 1; i <= 6; i++) {
        content.push( <div className={"category" + i}><a className='bold'>{titles[i-1]}</a></div>)
    }
    return (
        <div className='categories mx-main'>
            {content}
        </div>
    );
};

export default Categories;