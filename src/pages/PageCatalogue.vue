<template>
  <q-page class="column">
    <q-item class="text-h4 text-secondary">{{ $route.name }}</q-item>
    <div class="q-ma-xl">
      <q-input
        v-model="lookingForBookTitle"
        bottom-slots
        placeholder="Search for Booktitle or IBAN"
        counter
        maxlength="280"
      >
        <template #before>
          <q-icon name="search" />
        </template>

        <template #append>
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
        :key="index"
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
  name: ' PageCatalogue',

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
  computed: {
    ...mapGetters({ products: 'products/productItems' }),
  },
  created() {
    this.retrieveNewBooks();
  },

  methods: {
    retrieveNewBooks() {
      void this.$store.dispatch('products/getNewProductItems');
      console.log(this.products);
    },
    retrieveBooksByTitle() {
      void this.$store.dispatch(
        'products/getProductItemsByTitle',
        this.lookingForBookTitle
      );
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
  },
});
</script>
