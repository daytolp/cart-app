import { useEffect, useReducer } from "react";
import { itemsReducer } from "../reducer/itemsReducer";
import { addProductCart, deleteProductCart, updateQuantityProductCart } from "../reducer/itemsActions";



const initialCardItems = JSON.parse(sessionStorage.getItem('cart')) || [];

export const useItemsCart = () => {
    const [cartItems, dispatch] = useReducer(itemsReducer, initialCardItems);

    useEffect(() => {        
        sessionStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const handlerAddProduct = (product) => {
        const hasItem = cartItems.find(i => i.product.id === product.id);
        if (hasItem) {
          dispatch({type: updateQuantityProductCart, payload: product}); 
        } else {
          dispatch({type: addProductCart, payload: product}); 
        } 
    }

    const handlerDeleteProductCart = (id) => {
        dispatch({type: deleteProductCart, payload: id}); 
    }

    return {
        cartItems,
        handlerAddProduct,
        handlerDeleteProductCart
    }
}