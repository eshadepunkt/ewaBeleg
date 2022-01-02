import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { IProduct } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const ProductModule: Module<IProduct, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default ProductModule;
