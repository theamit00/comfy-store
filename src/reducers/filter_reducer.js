import { formatPrice } from "../utils/helpers";
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

function filterData(data,type,value){
    return data.filter((item)=>item[type] === value);
}

export default function reducer (state, action){
    const {type} = action;

    if(type === LOAD_PRODUCTS){
        let maxPrice = 0;
        if(action.payload.length){
            maxPrice = Math.max(...action.payload.map((p)=>p.price)); // calculating maximum price of product
        }

        return {
            ...state,
            allProducts:[...action.payload],
            filteredProducts:[...action.payload],
            filters:{...state.filters, max_price : maxPrice, price : maxPrice}
        }
    }

    if(type === SET_GRIDVIEW){
        return {
            ...state,
            grid_view : true,
        }
    }

    if(type === SET_LISTVIEW){
        return {
            ...state,
            grid_view : false,
        }
    }

    if(type === UPDATE_SORT){
        return{
            ...state,
            sort:action.payload
        }
    }

    if(type === UPDATE_FILTERS){
        const {name, value} = action.payload;
        // console.log(action.payload);
        return{
            ...state,
            filters:{...state.filters,[name]:value}
        }
    }

    if(type === CLEAR_FILTERS){
        return{
            ...state,
            filters:{...action.payload}
        }
    }

    if(type === SORT_PRODUCTS){

        const {filteredProducts, sort} = state;

        let sortedProducts = [...filteredProducts]

        if(sort === 'price-lowest'){
            sortedProducts = sortedProducts.sort((a,b)=>a.price - b.price);
        }
        if(sort === 'price-highest'){
            sortedProducts = sortedProducts.sort((a,b)=>b.price - a.price);
        }
        if(sort === 'name-a'){
            sortedProducts = sortedProducts.sort((a,b)=>{
                const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            });
        }
        if(sort === 'name-z'){
            sortedProducts = sortedProducts.sort((a,b)=>{
                const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameB < nameA) {
                    return -1;
                }
                if (nameB > nameA) {
                    return 1;
                }

                // names must be equal
                return 0;
            });
        }

        return {...state, filteredProducts : sortedProducts};
    }

    if(type === FILTER_PRODUCTS){
        const {allProducts} = state
        const {searchText, category, company, color, price, shipping} = state.filters;
        
        let tempProducts = [...allProducts];

        if(searchText){
            tempProducts = tempProducts.filter((product)=>product.name.includes(searchText));
        }

        if(category !== 'all'){
            tempProducts = tempProducts.filter((product)=>product.category === category);
        }

        if(company !== 'all' ){
            tempProducts = tempProducts.filter((product)=>product.company === company);
        }

        if(color !== 'all'){
            tempProducts = tempProducts.filter((product)=>product.colors.find((c)=> c === color));
        }

        if(price){
            tempProducts = tempProducts.filter((product)=>product.price <= price);
        }

        if(shipping){
            tempProducts = tempProducts.filter((product)=>product.shipping <= shipping);
        }

        return {
            ...state,
            filteredProducts : tempProducts,
        }
    }

    throw new Error(`No matching "${action.type}" - action`);
}