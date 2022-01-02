import { Order } from 'src/components/models';
import { MutationTree } from 'vuex';
import { ICart } from './state';

const mutation: MutationTree<ICart> = {
  ADD_CART_ORDER(state: ICart, payload: Order) {
    if (
      state.cartItems.some((order) => order.item.isbn13 === payload.item.isbn13)
    )
      state.cartItems = state.cartItems.map((order) => {
        if (order.item.isbn13 === payload.item.isbn13)
          order.quantity += payload.quantity;
        return order;
      });
    else state.cartItems.push(payload);
  },
  UPDATE_CART_ORDER(state: ICart, payload: Order) {
    state.cartItems = state.cartItems.map((order) => {
      if (order.item.isbn13 === payload.item.isbn13) {
        return payload;
      }
      return order;
    });
  },
  REMOVE_CART_ORDER(state: ICart, isbn13: string) {
    state.cartItems = state.cartItems.filter((order) => {return order.item.isbn13 !== isbn13;})
  }
};

export default mutation;
