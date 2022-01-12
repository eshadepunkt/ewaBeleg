import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ICart } from './state';

const getters: GetterTree<ICart, StateInterface> = {
  cartItems: (state) => state.cartItems,
  cartTotal: (state) => {
    return state.cartItems
      .reduce((acc, cartItem) => {
        let price = null;
        if (cartItem.item.price.charAt(0) === '$') {
          price = cartItem.item.price.substring(1);
        } else {
          price = cartItem.item.price;
        }
        return cartItem.quantity * parseFloat(price) + acc;
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
