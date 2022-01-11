import { MutationTree } from 'vuex';
import { IProduct } from './state';
import { ResponseData, ResponseLocal, Book } from 'src/components/models';

const mutation: MutationTree<IProduct> = {
  UPDATE_PRODUCT_ITEMS(state: IProduct, payload: ResponseData) {
    state.productItems = payload.books;
  },
  UPDATE_PRODUCT_ITEMS_LOCAL(state: IProduct, payload: ResponseLocal) {
    console.log('payload: ', payload);
    state.productLocalItems = payload.data;
    console.log(state.productLocalItems);
  },
  ADD_PRODUCT_ITEM_LOCAL(state: IProduct, payload: Book) {
    console.log(payload);
    state.productLocalItems.push(payload);
    console.log(state.productLocalItems);
  },
  UPDATE_PRODUCT_ITEM_LOCAL(state: IProduct, payload: Book) {
    console.log(payload);
    state.productLocalItems.map((book) => {
      if (book.isbn13 === payload.isbn13) {
        book.stock = payload.stock;
      }
      return book;
    });
    console.log(state.productLocalItems);
  },
};

export default mutation;
