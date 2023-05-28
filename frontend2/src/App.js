import axios from "axios";
import React from "react";
import 'styles/index.css'
import 'styles/componentStyles.css'
import Categories from "components/pages/categories";
import Footer from "components/footer";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import CategoryDetail from "components/pages/categoryDetail";
import EnterPage from "components/pages/enterPage";
import MainPage from "components/pages/mainPage/mainPage";
import ProductPage from "components/pages/productPage";
import RegistrationPage from "components/pages/registrationPage";
import {store} from "store";

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
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/enter" element={<EnterPage />} />
                        <Route path="/registration" element={<RegistrationPage />} />
                        <Route path="/category/" element={<Categories />} />
                        <Route path="/category/:id" element={<CategoryDetail />} />
                        <Route path="/product/:id" element={<ProductPage />} />
                    </Routes>
                    {/*<Subscribe/>*/}
                    <Footer />
                </Router>
            </Provider>



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
