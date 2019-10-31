import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import {detectFaces, signin, register} from './reducers';
import App from './App';


import 'tachyons';


import './index.css';

const rootReducer = combineReducers({detectFaces,signin, register});
//const logger = createLogger();
const store = createStore(rootReducer);

ReactDOM.render(
  
  <Provider store={store}> 
    <App /> 
  </Provider>
  ,
  document.getElementById('root')
);
