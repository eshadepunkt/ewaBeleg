<template>
  <q-page class="column">
    <q-item class="text-h4 text-primary">{{ $route.name }}</q-item>
    <div class="q-ma-xl items-center">
      <bookcard
        v-for="(book, index) in products"
        :key="index"
        :product-item="book"
        class="q-mb-sm"
      ></bookcard>
    </div>
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[18, 18]"
    >
      <q-btn fab icon="keyboard_arrow_up" color="accent" />
    </q-page-scroller>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import Bookcard from 'components/BookCard.vue';

export default defineComponent({
  name: 'PageCatalogue',

  components: { Bookcard },
  data() {
    return {
      responseAvailable: false,
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
      void this.$store.dispatch('products/getLocalProductItems');
      console.log(this.products);
    },
  },
});
</script>
