'use strict'

// cart reducer

export function cartReducers(state={cart:[]},action){
    switch(action.type){
        case 'ADD_TO_CART':
        return {...state,
            cart:action.payload,
        totalAmount:totals(action.payload).amount,
        totalQty:totals(action.payload).qty
        }
        break;

        case 'UPDATE_CART':
         
        return {...state,
            cart:action.payload,
            totalAmount:totals(action.payload).amount,
            totalQty:totals(action.payload).qty
        }
        break;

        case 'DELETE_CART_ITEM':
        return {...state,
            cart:action.payload,
            totalAmount:totals(action.payload).amount,
            totalQty:totals(action.payload).qty
        }
        break;
    }
    return state;
}

//calculate torals

export function totals(payloadArr){
    const totalAmount = payloadArr.map(function(cartArr){
        return cartArr.price*cartArr.quantity
    }).reduce(function(a,b){
        return a+b;
    },0)//strat summing from index 0

    const totalQty = payloadArr.map(function(qty){
        return qty.quantity;
    }).reduce(function(a,b){
        return a+b
    },0)

    return {amount:totalAmount.toFixed(2),qty:totalQty}
}