import { products } from "../data/productos"

export const getProducts = () => {
    return products;
}

export const calculateTotal = (items) => {
    return items.reduce((accumulator, currentValue) => {
      accumulator += currentValue.product.price * currentValue.quantity;
      return accumulator;
    }, 0);
  }