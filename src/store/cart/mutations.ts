import { Order } from 'src/components/models';
import { MutationTree } from 'vuex';
import { ICart } from './state';

const mutation: MutationTree<ICart> = {
  ADD_CART_ORDER(state: ICart, payload: Order) {
    console.log('Cart payload: ', payload);
    if (
      state.cartItems.some((order) => order.item.isbn13 === payload.item.isbn13)
    )
      state.cartItems.map((order) => {
        if (order.item.isbn13 === payload.item.isbn13)
          order.quantity += payload.quantity;
        return order;
      });
    else state.cartItems.push(payload);
  },
  UPDATE_CART_ORDER(state: ICart, payload: Order) {
    console.log('Updating order:', payload);
    state.cartItems.map((order) => {
      if (order.item.isbn13 === payload.item.isbn13) {
        console.log('Update');
        return payload;
      }
      return order;
    });
  },
};

export default mutation;
