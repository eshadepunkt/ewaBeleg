<template>
  <q-page class="column">
    <q-item class="text-h4 text-secondary">{{ $route.name }}</q-item>
    <div class="q-ma-xl">
      <bookcard
        v-for="(book, index) in productsLocal"
        :key="index"
        :product-item="book"
      ></bookcard>
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
