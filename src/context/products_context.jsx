import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducers/products_reducer';

import { products_url as url } from "../utils/constants";

import {
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE,
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR
} from '../actions';

const initialState = {
    isSidebarOpen : false,
    isFetchingProducts : false,
    isFetchingProductsError : false,
    products : [],
    featuredProducts : [],
    isFetchingSingleProduct : false,
    isFetchingSingleProductError : false,
    singleProduct : {},
};


const ProductsContext = createContext(null);

export const ProductsProvider = ({children})=>{

    const [state, dispatch] = useReducer(reducer, initialState);

    async function fetchProducts(url){
        try {
            dispatch({type:GET_PRODUCTS_BEGIN});
            const response = await axios.get(url);
            const products = response.data;
            dispatch({type:GET_PRODUCTS_SUCCESS, payload: products});
        } 
        catch (error) {
            dispatch({type:GET_PRODUCTS_ERROR})
        }
    }
    
    async function fetchSingleProduct(url){
        try{
            dispatch({type:GET_SINGLE_PRODUCT_BEGIN});
            const response = await axios.get(url);
            const singleProduct = response.data;
            dispatch({type:GET_SINGLE_PRODUCT_SUCCESS, payload:singleProduct});
        }
        catch(error){
            dispatch({type:GET_SINGLE_PRODUCT_ERROR});
        }
    }

    useEffect(()=>{
        fetchProducts(url);
    },[])

    const toggleSidebar = ()=>{
        const {isSidebarOpen} = state;
        if(isSidebarOpen){
            return dispatch({type: SIDEBAR_CLOSE});
        }
        return dispatch({type: SIDEBAR_OPEN});
    }
    const value = {
        ...state,
        toggleSidebar,
        fetchSingleProduct,
    }

    return(
        <ProductsContext.Provider value={value} >
            {children}
        </ProductsContext.Provider>
    )
}

export const useProductsContext = ()=>{
    return useContext(ProductsContext);
}