'use strict'

import {createStore} from 'redux';

//step 3 define reducers

const reducer = function (state={books:[]},action){
    switch(action.type){
        case 'POST_BOOK':
        // let books = state.books.concat(action.payload)
        // return {books};
        return {books:[...state.books, ...action.payload ]}
        break;

        case 'DELETE_BOOK':
        const currentBookToDelete = [...state.books];
        const indexToDelete = currentBookToDelete.findIndex(
            function(book){
                return book.id===action.payload.id
            }
        )
        return {books:[...currentBookToDelete.slice(0,indexToDelete),
        ...currentBookToDelete.slice(indexToDelete+1)]}
        break;

        case 'UPDATE_BOOK':
        const currentBookToUpdate = [...state.books]
        const indexToUpdate = currentBookToUpdate.findIndex(
            function(book){
                return book.id===action.payload.id
            }
        )

        const newBookToUpdate = {
            ...currentBookToUpdate[indexToUpdate],
            title : action.payload.title
        }
        // const newBookToUpdate = Object.assign({}, currentBookToUpdate(indexToUpdate), title:action.payload.title);
        console.log("What is it newBookToUpdate",newBookToUpdate);

        return {books:[...currentBookToUpdate.slice(0,indexToUpdate),newBookToUpdate,
        ...currentBookToUpdate.slice(indexToUpdate+1)]}
    }
    return state;
}
 

//step 1 create the store
const store = createStore(reducer);

store.subscribe(function(){
    console.log("Current state:",store.getState())
    // console.log("Current price:",store.getState()[1].price)
})

//step 2 create and dispatch action

store.dispatch({type:'POST_BOOK',
 payload:[{
     id:1,
     title:"this is the book title",
     description:'this is the book descrpition',
     price:33.33
 },
 {
    id:2,
    title:"this is the second book title",
    description:'this is the second book descrpition',
    price:50
 }
]
})

//delete a book

store.dispatch({type:'DELETE_BOOK',
 payload:{
     id:1
 }
})

 //update a book

store.dispatch({type:'UPDATE_BOOK',
payload:{
    id:2,
    title:'Learn react in 24h'
}
})
