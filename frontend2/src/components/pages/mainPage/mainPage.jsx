import React from 'react';
import Offer from "./offer";
import Categories from "../categories";
import Sliders from "./sliders";
import Partners from "./partners";
import LeftNav from "../../leftNav";
import FirstNav from "../../firstNav";
import SecondNav from "../../secondNav";
import Subscribe from "../../subscribe";

const MainPage = () => {
    return (
        <div>
            <LeftNav/>
            <div className='container'>
                <FirstNav/>
                <SecondNav/>
                <Offer/>
                {/*<Categories/>*/}
                <Sliders/>
                <Partners/>
            </div>
            <Subscribe/>
        </div>
    );
};

export default MainPage;