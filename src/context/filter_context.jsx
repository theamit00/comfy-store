import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import { useProductsContext } from "./products_context";

import { 
    LOAD_PRODUCTS,
    SET_GRIDVIEW,
    SET_LISTVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from "../actions";

const FilterContext = createContext(null);

const initialState = {
    allProducts : [],
    filteredProducts : [],
    grid_view : true,
    sort : 'price-lowest',
    filters:{
        searchText : '',
        company : 'all',
        category : 'all',
        color : 'all',
        price : 0,
        min_price : 0,
        max_price : 0,
        shipping : false,
    }
}

export const FilterProvider = ({children})=>{

    const [state, dispatch] = useReducer(reducer, initialState)
    const {products} = useProductsContext();

    useEffect(()=>{
        dispatch({type:LOAD_PRODUCTS, payload: products});
    },[products])

    useEffect(()=>{
        dispatch({type:FILTER_PRODUCTS})
        dispatch({type:SORT_PRODUCTS})
    },[products,state.sort,state.filters])

    function setGridView(){
        dispatch({type:SET_GRIDVIEW});
    }

    function setListView(){
        dispatch({type:SET_LISTVIEW});
    }

    function updateSort(e){
        const value = e.target.value;
        dispatch({type:UPDATE_SORT, payload:value})
    }

    function updateFilters(e){
        const name = e.target.name;
        let value = e.target.value;

        if(name === 'category'){
            value = e.target.textContent;
        }

        if(name === 'color'){
            value = e.target.attributes['data-color'].value;
        }

        if(name === 'price'){
            value = +value;
        }

        if(name === 'shipping'){
            value = e.target.checked;
        }

        dispatch({type:UPDATE_FILTERS, payload:{name, value}})
    }

    function clearFilters(){
        const filters = {
            searchText : '',
            company : 'all',
            category : 'all',
            color : 'all',
            price : state.filters.max_price,
            shipping : false,
        }
        dispatch({type:CLEAR_FILTERS, payload:{...state.filters,...filters}})
    }

    const value = {
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters
    }

    return (
        <FilterContext.Provider value={value} >
            {children}
        </FilterContext.Provider>
    )
}

export const useFilterContext = ()=>{
    return useContext(FilterContext);
}