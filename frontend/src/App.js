import axios from "axios";
import React from "react";
import './styles/index.css'
import './styles/mainPage.css'
import LeftNav from "./components/leftNav";
import FirstNav from "./components/firstNav";
import SecondNav from "./components/secondNav";
import Offer from "./components/offer";
import Categories from "./components/categories";
import Sliders from "./components/sliders";
import Partners from "./components/partners";
import Subscribe from "./components/subscribe";
import Footer from "./components/footer";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryDetail from "./components/categoryDetail";
import MainPage from "./components/mainPage";

class App extends React.Component{
  state = { details: [], }

  componentDidMount() {
    let data;
    axios.get('http://localhost:8000')
        .then(res => {
          data = res.data;
          this.setState({
            details: data
          });
        })
        .catch(err => {
          console.log(err);
        })
  }
  render() {
    return (
        <div>
            <Router>
                <LeftNav/>
                <div className='container'>
                    <FirstNav/>
                    <SecondNav/>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/category/:id" element={<CategoryDetail />} />

                    </Routes>
                </div>

            </Router>
            <Subscribe/>
            <Footer />

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
}


export default App;
