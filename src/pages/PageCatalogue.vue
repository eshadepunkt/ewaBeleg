<template>
  <q-page class="column">
    <q-item class="text-h4 text-secondary">{{ $route.name }}</q-item>
    <div class="q-ma-xl">
      <q-input
        bottom-slots
        v-model="lookingForBookTitle"
        placeholder="Search for Booktitle or IBAN"
        counter
        maxlength="280"
      >
        <template v-slot:before>
          <q-icon name="search" />
        </template>

        <template v-slot:append>
          <q-btn
            round
            dense
            flat
            icon="add"
            :disable="!lookingForBookTitle"
            @click="retrieveBooksByTitle(lookingForBookTitle)"
          />
        </template>
      </q-input>
      <div v-if="bookResponse !== undefined" class="q-ma-md">
        <bookcard
          v-for="(book, index) in bookResponse.books"
          v-bind:key="index"
          :title="book.title"
          :subtitle="book.subtitle"
          :isbn13="book.isbn13"
          :price="book.price"
          :image="book.image"
        ></bookcard>
      </div>
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="page"
        color="purple"
        :max="total"
        :max-pages="5"
        boundary-numbers
        @click="retrievePage(page.toString())"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Bookcard from 'components/BookCard.vue';
import { Response, ResponseData } from 'components/models';
import BookDataService from 'src/services/BookDataService';

export default defineComponent({
  name: ' PageCatalog',

  components: { Bookcard },
  data() {
    return {
      lookingForBookTitle: '',
      responseAvailable: false,
      bookResponse: ref<ResponseData>(),
      page: 1,
      total: 1,
    };
  },
  created() {
    // fetch('https://api.itbook.store/1.0/new', {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' },
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     } else {
    //       console.log(response);
    //     }
    //   })
    //   .then((response: ResponseData) => {
    //     this.books = response.data;
    //     //this.responseAvailable = true;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
  setup() {
    // function getNewBooks(): Promise<Book[]> {
    //   return fetch('https://api.itbook.store/1.0/new')
    //     .then((res) => res.json())
    //     .then((res) => {
    //       return res as Book[];
    //     });
    // }
    // const books = ref<Book[]>([
    //   {
    //     id: 0,
    //     title: 'Mein erstes Buch',
    //     author: 'Mein erster Autor',
    //     content:
    //       'Hier steht eine Kurze Beschreibung des Buches das angezeigt wird',
    //   },
    //   {
    //     id: 1,
    //     title: 'Mein zweites Buch',
    //     author: 'Mein zweites Autor',
    //     content:
    //       'Hier steht eine Kurze Beschreibung des Buches das angezeigt wird (2)',
    //   },
    // ]);
    // console.log(books);
    // return { books };
  },

  methods: {
    retrieveNewBooks() {
      BookDataService.getNew()
        .then((response: Response) => {
          this.bookResponse = response.data;
          this.page = parseInt(this.bookResponse.page);
          this.total =
            parseInt(this.bookResponse.total) / this.bookResponse.books.length;
          console.log('totals', response.data.total);
          console.log('array-length', response.data.books.length);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    retrieveAllBooks() {
      BookDataService.getAll()
        .then((response: Response) => {
          this.bookResponse = response.data;
          this.page = parseInt(this.bookResponse.page);

          console.log('totals', response.data.total);
          console.log('array-length', response.data.books.length);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    retrievePage(page: string) {
      BookDataService.searchByTitleAndPage(this.lookingForBookTitle, this.page)
        .then((response: Response) => {
          this.bookResponse = response.data;
          this.page = parseInt(this.bookResponse.page);
          console.log('books: ', response.data.books);
          console.log('response', response);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    retrieveBooksByTitle(title: string) {
      BookDataService.searchByTitle(title)
        .then((response: Response) => {
          this.bookResponse = response.data;
          this.page = parseInt(this.bookResponse.page);
          this.total =
            parseInt(this.bookResponse.total) / this.bookResponse.books.length;
          console.log('books: ', response.data.books);
          console.log('response', response);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveNewBooks();
  },
});
</script>
