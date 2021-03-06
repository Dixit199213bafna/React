import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import burgerBuilder from "./store/reducer/burgerBuilder";
import orderReducer from "./store/reducer/order";
import authReducer from "./store/reducer/auth";
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

const rootReducer =  combineReducers ({
    burgerBuilder: burgerBuilder,
    order: orderReducer,
    auth: authReducer,
})
const composeEnhancers = process.env.NODE_ENV === 'developement' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render((<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>), document.getElementById('root'));
registerServiceWorker();
