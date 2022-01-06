import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { IProduct } from './state';
import BookDataService from 'src/services/BookDataService';
import { Response } from 'src/components/models';

const actions = <ActionTree<IProduct, StateInterface>>{
  getNewProductItems({ commit }) {
    console.log('actionNew');
    BookDataService.getNew()
      .then((response: Response) => {
        console.log(response);
        commit('UPDATE_PRODUCT_ITEMS', response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  },
  getProductItemsByTitle({ commit }, productTitle) {
    console.log('actionSearch');
    BookDataService.searchByTitle(productTitle)
      .then((response: Response) => {
        console.log(response);
        commit('UPDATE_PRODUCT_ITEMS', response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  },
};

export default actions;
