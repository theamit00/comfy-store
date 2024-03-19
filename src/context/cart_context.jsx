import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

function getLocalStorage(){

  let cart = localStorage.getItem('cart');

  if(cart){
    return JSON.parse(cart);
  }
  return [];
}

const initialState = {
  cart: getLocalStorage(),
  total_amount: 0,
  total_items: 0,
  shipping_fee: 200,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(()=>{
    dispatch({type : COUNT_CART_TOTALS});
    localStorage.setItem('cart', JSON.stringify(state.cart));

  },[state.cart])

  const addToCart = (id, color, amount, product)=>{
    dispatch({type:ADD_TO_CART, payload:{id, color, amount, product}});
  }

  const removeItem = (id)=>{
    dispatch({type : REMOVE_CART_ITEM, payload:{id}});
  }

  const clearCart = ()=>{
    dispatch({type : CLEAR_CART})
  }

  const toggleCartItemAmount = (id, typeOfChange)=>{
    // console.log(id,typeOfChange)
    dispatch({type : TOGGLE_CART_ITEM_AMOUNT, payload:{id, typeOfChange}});
  }

  const value = {
    ...state,
    addToCart,
    removeItem,
    clearCart,
    toggleCartItemAmount
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
