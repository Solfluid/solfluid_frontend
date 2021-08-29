import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';


ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
     document.querySelector("#root"));