import { invoice } from "../data/invoice"

export const getInvoice = () => {
  const total = calculateTotal(invoice.items);
  return {...invoice, total};
}

export const calculateTotal = (items) => {
  return items.reduce((accumulator, currentValue) => {
    accumulator += currentValue.price * currentValue.quantity;
    return accumulator;
  }, 0);
}
