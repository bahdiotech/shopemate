import { useReducer } from "react";
import { createContext, useContext } from "react"
import { cartReducer } from "../reducer/cartReducer";

const initialState = {
    cartList: [],
    total: 0,
}

const cartContext = createContext(initialState); 

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (product) => {
        const updatedCart = state.cartList.concat(product)
        updateTotal(updatedCart)
        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                products: updatedCart
            }
        })
    }

    const removeFromCart =(product) => {
        const updatedCart = state.cartList.filter(current => current.id !== product.id)
        updateTotal(updatedCart)
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: {
                products: updatedCart
            }
        })
    }

    const updateTotal = (products) => {
        let total = 0;
        products.forEach(product => total += product.price)

        dispatch({
            type: 'UPDATE_TOTAL',
            payload:{
                total
            }
        })
    }

    const value = {
        total : state.total,
        cartList: state.cartList,
        addToCart,
        removeFromCart,
    }

    return (
        <cartContext.Provider value={value}>
            {children}
        </cartContext.Provider>
    )
}

export const useCart = () => useContext(cartContext)