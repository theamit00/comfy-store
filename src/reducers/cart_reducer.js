import {
    ADD_TO_CART,
    CLEAR_CART,
    COUNT_CART_TOTALS,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {

    if (action.type === ADD_TO_CART) {
        const { id, color, amount, product } = action.payload;
        const tempItem = state.cart.find((item) => item.id === id + color);

        if (tempItem) {

            const tempCart = state.cart.map((item)=>{
                if(item.id === tempItem.id){
                    let new_amount = item.amount + amount;
                    if(new_amount > product.stock){
                        new_amount = product.stock;
                    }
                    return {...item, amount : new_amount};
                }
                return item;
            })

            return {
                ...state,
                cart: tempCart
            }
        }
        else {
            const newItem = {
                id: id + color, // becz same product can be more than one but of different color
                name: product.name,
                color,
                amount, // quantity of same product
                image: product.images[0].url,
                price: product.price,
                stock: product.stock
            }
            return {
                ...state,
                cart: [...state.cart, newItem]
            }
        }
    }

    if(action.type === REMOVE_CART_ITEM){
        const{id} = action.payload;
        const{cart} = state;

        let tempCart = cart.filter((item)=> item.id !== id);

        return {...state, cart: tempCart};
    }

    if(action.type === TOGGLE_CART_ITEM_AMOUNT){
        const {id, typeOfChange} = action.payload;
        let tempCart = state.cart;
        tempCart = state.cart.map((item)=>{
            if(item.id === id){
                let new_amount = item.amount;
                if(typeOfChange === 'decrease'){
                    new_amount = new_amount - 1;
                    if(new_amount < 1){
                        new_amount = 1;
                    }
                }
                if(typeOfChange === 'increase'){
                    new_amount = new_amount + 1;
                    if(new_amount > item.stock){
                        new_amount = item.stock;
                    }
                }
                return {...item, amount : new_amount};
            }
            return {...item} ;
        })
        return {...state, cart: tempCart};
    }

    if(action.type === COUNT_CART_TOTALS){
        let {total_amount,total_items} = state.cart.reduce((totals, cartItem)=>{
            const {amount, price} = cartItem

            totals.total_amount += price * amount;
            totals.total_items += amount;
            return totals
        },{
            total_items : 0,
            total_amount : 0
        })

        return {...state, total_amount, total_items};
    }

    if(action.type === CLEAR_CART){
        return{...state, cart : []}
    }

    throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer;  