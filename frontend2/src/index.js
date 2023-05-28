import React from 'react';
// import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

require('dotenv').config();
const registerRoute = require('./routes/auth/register');
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(registerRoute);
app.use(express.static('frontend/build'));
app.get('*', (req, res) => {
    return res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
