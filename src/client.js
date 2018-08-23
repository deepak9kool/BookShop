'use strict'

//React
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';


import BooksList from './components/pages/BooksList';
import BooksForm from './components/pages/BooksForm';
import Cart from './components/pages/Cart';
import Main from './Main'; 
// import Menu from './components/Menu';
// import Footer from './components/Footer';

//React-router
import {Router,Route,browserHistory,IndexRoute,hashHistory} from 'react-router'


//import combined reducers
import reducers from './reducers';

//import actions
import addToCart, { addTocart } from './actions/cartActions'
// import { postBooks,deleteBooks,updateBooks } from './actions/booksActions';

 

//step 1 create the store
const middleware = applyMiddleware(thunk,logger);
const store = createStore(reducers,middleware);

const Routes= (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={Main}>
                <IndexRoute component={BooksList}/>
                <Route path='/admin' component={BooksForm}/> 
                <Route path='/cart' component={Cart}/> 
            </Route>
        </Router>
    </Provider>
)

ReactDOM.render(
    Routes,document.getElementById('root'));

//step 2 create and dispatch action



// //delete a book
// store.dispatch(deleteBooks({id:1}));


//  //update a book
//  store.dispatch(updateBooks({
//     id:2,
//     title:'Learn react in 24h'
// }))


// //add to cart 
// store.dispatch(addToCart([{id:1}]))


