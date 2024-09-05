import { addProductCart, deleteProductCart, updateQuantityProductCart } from "./itemsActions";

export const itemsReducer = (state = [], action) => {
    switch (action.type) {
        case addProductCart:            
            return [
                ...state,
                {
                    product: action.payload,
                    quantity: 1
                }
            ];
        case updateQuantityProductCart:            
            return state.map(i => {
                if (i.product.id === action.payload.id) 
                    return {
                        ...i,
                        quantity: i.quantity + 1
                    }
                return i;
            });
        case deleteProductCart:
            return state.filter(i => i.product.id !== action.payload);
        default:
            break;
    }
}