'use strict'
import axios from 'axios';
//get book
export function getBooks(book){
    return function(dispatch){
        axios.get("api/books")
            .then(function(response){
                dispatch({type:'GET_BOOKS',payload:response.data})
            })
            .catch(function(err){
                dispatch({type:'GET_BOOKS_REJECTED',payload:err})
            })
    }
    // return {
    //     type:'GET_BOOKS'
    // }
}

//post book
export function postBooks(book){
    return function(dispatch){
        axios.post('/api/books',book)
        .then(function(response){
            dispatch({type:'POST_BOOKS',payload:response.data})
        })
        .catch(function(err){
            dispatch({type:'POST_BOOKS_REJECTED',payload:'There was an error in post books'})
        })
    }
    // return {
    //     type:'POST_BOOKS',
    //     payload:book
    // }
}

//delete book
export function deleteBooks(id){
    return function(dispatch){
        axios.delete('/api/books/'+id)
            .then(function(response){
                dispatch({type:'DELETE_BOOK',payload:id})
            })
            .catch(function(err){
                dispatch({type:'DELETE_BOOK_REJECTED',payload:err})
            })
    }
    // return {
    //     type:'DELETE_BOOK',
    //     payload:id
    // }
}

//update book
export function updateBooks(book){
    return {
        type:'UPDATE_BOOK',
        payload:book
    }
}