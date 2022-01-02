import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { IProduct } from './state';

const getters: GetterTree<IProduct, StateInterface> = {
  productItems: (state) => state.productItems,
};

export default getters;
