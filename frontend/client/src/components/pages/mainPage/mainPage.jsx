import React from 'react';
import Offer from "./offer";
import Sliders from "./sliders";
import Partners from "./partners";
import LeftNav from "components/leftNav";
import FirstNav from "components/firstNav";
import SecondNav from "components/secondNav";
import Subscribe from "components/subscribe";

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