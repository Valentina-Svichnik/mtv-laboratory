import React from 'react';
import Offer from "./offer";
import Categories from "./categories";
import Sliders from "./sliders";
import Partners from "./partners";

const MainPage = () => {
    return (
        <div>
            <Offer/>
            <Categories/>
            <Sliders/>
            <Partners/>
        </div>
    );
};

export default MainPage;