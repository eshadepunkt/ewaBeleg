import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ICart } from './state';
import { Order } from 'src/components/models';

const getters: GetterTree<ICart, StateInterface> = {
  cartItems: (state) => state.cartItems,
  cartTotal: (state) => {
    return state.cartItems
      .reduce((acc, cartItem) => {
        return (
          cartItem.quantity * parseFloat(cartItem.item.price.substring(1)) + acc
        );
      }, 0)
      .toFixed(2);
  },
  cartQuantity: (state) => {
    return state.cartItems.reduce((acc, cartItem) => {
      return cartItem.quantity + acc;
    }, 0);
  },
};

export default getters;
