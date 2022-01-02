import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { ICart } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const CartModule: Module<ICart, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default CartModule;
