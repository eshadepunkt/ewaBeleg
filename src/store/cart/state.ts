import { Order } from 'src/components/models';

export interface ICart {
  cartItems: Order[];
}

function state(): ICart {
  return {
    cartItems: [],
  };
}

export default state;
