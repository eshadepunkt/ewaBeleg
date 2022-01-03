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
            icon="search"
            :disable="!lookingForBookTitle"
            @click="retrieveBooksByTitle(lookingForBookTitle)"
          />
        </template>
      </q-input>

      <bookcard
        v-for="(book, index) in products"
        v-bind:key="index"
        :product-item="book"
      ></bookcard>
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
import { mapGetters } from 'vuex';
import { Response, ResponseData } from 'components/models';
import BookDataService from 'src/services/BookDataService';
import Bookcard from 'components/BookCard.vue';

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
    this.retrieveNewBooks();
  },

  computed: {
    ...mapGetters({ products: 'products/productItems' }),
  },
  methods: {
    retrieveNewBooks() {
      void this.$store.dispatch('products/getNewProductItems');
      console.log(this.products);
    },
    retrievePage() {
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
          this.total = Math.floor(
            parseInt(this.bookResponse.total) / this.bookResponse.books.length
          );
          console.log('books: ', response.data.books);
          console.log('response', response);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
});
</script>
