import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ICart } from './state';
import { Response, Order } from 'src/components/models';

const actions = <ActionTree<ICart, StateInterface>>{
  addOrder({ commit }, order: Order) {
    console.log('order added');
    commit('ADD_CART_ORDER', order);
  },
  updateOrder({ commit }, order: Order) {
    commit('UPDATE_CART_ORDER', order);
  },
};

export default actions;
