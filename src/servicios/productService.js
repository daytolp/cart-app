import apiUrl from "../api/api";


export const getProducts = async() => {
    const products = await apiUrl.get('products');
    return products.data;
}

export const calculateTotal = (items) => {
    return items.reduce((accumulator, currentValue) => {
      accumulator += currentValue.product.price * currentValue.quantity;
      return accumulator;
    }, 0);
  }