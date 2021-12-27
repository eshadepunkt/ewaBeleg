<template>
  <q-page class="column">
    <q-item
      ><h5>{{ $route.name }}</h5></q-item
    >
    <div class="q-ma-xl">
      <q-input
        bottom-slots
        v-model="newBookTitle"
        placeholder="Add new Book here."
        counter
        maxlength="280"
      >
        <template v-slot:before>
          <q-icon name="local_library" />
        </template>

        <template v-slot:append>
          <q-btn
            round
            dense
            flat
            icon="add"
            :disable="!newBookTitle"
            @click="addBook(newBookTitle)"
          />
        </template>
      </q-input>
      <bookcard
        v-for="(book, index) in books.books"
        v-bind:key="index"
        :title="book.title"
        :subtitle="book.subtitle"
        :isbn13="book.isbn13"
        :price="book.price"
        :image="book.image"
      ></bookcard>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Bookcard from 'components/BookCard.vue';
import ResponseData, { Book } from 'components/models';
import BookDataService from 'src/services/BookDataService';

export default defineComponent({
  name: ' PageCatalog',

  components: { Bookcard },
  data() {
    return {
      newBookTitle: '',
      responseAvailable: false,
      books: [] as Book[],
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
        .then((response: ResponseData) => {
          this.books = response.data;
          console.log(response.data);
          console.log(this.books);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    //TODO fix this method!
    addBook(_title: string) {
      var book = ref<Book>({
        title: _title,
        subtitle: 'subtitle',
        isbn13: '1234567891234',
        price: '10.99',
        image: 'image',
        url: 'img',
      });
      this.books.push(book.value);
    },
  },
  mounted() {
    this.retrieveNewBooks();
  },
});
</script>
