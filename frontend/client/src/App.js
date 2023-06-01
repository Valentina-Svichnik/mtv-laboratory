import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'styles/index.css'
import 'styles/componentStyles.css'

import CategoryDetail from "components/pages/categoryDetail";
import LoginPage from "components/pages/loginPage";
import MainPage from "components/pages/mainPage/mainPage";
import ProductPage from "components/pages/productPage";
import RegistrationPage from "components/pages/registrationPage";
import Categories from "components/pages/categories";
import Footer from "components/footer";
import ProfilePage from "components/pages/profilePage";
import CartPage from "components/pages/cartPage";

import {checkAuth} from "./features/user";
const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(checkAuth());
    }, []);

    return (
        <div>
          <Router>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/category/" element={<Categories />} />
              <Route path="/category/:id" element={<CategoryDetail />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
            <Footer />
          </Router>



          {/*<header>*/}
          {/*  Данные из Django*/}
          {/*</header>*/}
          {/*<hr></hr>*/}
          {/*  {this.state.details.map((output, id) => (*/}
          {/*      <div key={id}>*/}
          {/*        <div>*/}
          {/*          <h2>{output.title}</h2>*/}
          {/*          <p>{output.price}</p>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*  ))}*/}
        </div>

    )
}


export default App;
