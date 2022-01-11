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
            @click="retrieveBooksByTitle()"
          />
        </template>
      </q-input>

      <bookcard
        v-for="(book, index) in productsLocal"
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
        @click="retrievePage()"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import Bookcard from 'components/BookCard.vue';

export default defineComponent({
  name: 'PageBookShop',

  components: { Bookcard },
  data() {
    return {
      lookingForBookTitle: '',

      page: 1,
      total: 1,
    };
  },

  computed: {
    ...mapGetters({
      productsLocal: 'products/productLocalItems',
    }),
  },
  created() {
    this.retrieveBooks();
  },

  methods: {
    retrieveBooks() {
      void this.$store.dispatch('products/getLocalProductItems');
    },
    retrieveBooksByTitle() {
      void this.$store.dispatch(
        'products/getProductItemsByTitle',
        this.lookingForBookTitle
      );
    },
  },
});
</script>
