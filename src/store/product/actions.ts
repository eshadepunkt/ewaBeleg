import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { IProduct } from './state';
import BookDataService from 'src/services/BookDataService';
import { Response, Book } from 'src/components/models';

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
  getLocalProductItems({ commit }) {
    console.log('query db');
    BookDataService.getFromDB()
      .then((response: unknown) => {
        console.log('repsonse: ', response);
        commit('UPDATE_PRODUCT_ITEMS_LOCAL', response);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  },
  addLocalProductItem({ commit, state }, book: Book) {
    const existingBook = state.productLocalItems.find((bookLocal) => {
      return book.isbn13 === bookLocal.isbn13;
    });

    if (existingBook != undefined) {
      book.stock! += existingBook.stock!;
      BookDataService.updateDB(book)
        .then((phpresponse) => {
          console.log('PHP-Update', phpresponse);
          commit('UPDATE_PRODUCT_ITEM_LOCAL', book);
        })
        .catch((e) => console.log(e));
      return;
    }

    console.log('adding book to local bookshop');
    let bookDetails: Book;
    let foundBook = false;
    BookDataService.getByIsbn13(book.isbn13)
      .then((response) => {
        bookDetails = response.data;
        foundBook = true;
        console.log(bookDetails);
        bookDetails.stock = book.stock;

        BookDataService.addToDB(bookDetails)
          .then((phpresponse) => {
            console.log('PHP-Reponse:', phpresponse);
            commit('ADD_PRODUCT_ITEM_LOCAL', bookDetails);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });

    if (!foundBook) return;
  },
};
export default actions;
