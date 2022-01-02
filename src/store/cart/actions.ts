import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ICart } from './state';
import { Order } from 'src/components/models';

const actions = <ActionTree<ICart, StateInterface>>{
  addOrder({ commit }, order: Order) {
    commit('ADD_CART_ORDER', order);
  },
  updateOrder({ commit }, order: Order) {
    commit('UPDATE_CART_ORDER', order);
  },
  deleteOrder({ commit }, isbn13: string) {
    commit('REMOVE_CART_ORDER', isbn13);
  }
};

export default actions;
