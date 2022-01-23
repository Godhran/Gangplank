import React from 'react';
import App from './App';

import {render} from 'react-dom'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './reducers'

import thunk from "redux-thunk"

const store = createStore(rootReducer, applyMiddleware(thunk))

render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

