import { MutationTree } from 'vuex';
import { IProduct } from './state';
import { ResponseData } from 'src/components/models';

const mutation: MutationTree<IProduct> = {
  UPDATE_PRODUCT_ITEMS(state: IProduct, payload: ResponseData) {
    state.productItems = payload.books;
  },
};

export default mutation;
