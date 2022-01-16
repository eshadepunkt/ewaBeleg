<template>
  <q-page class="column">
    <q-item class="text-h4 text-primary">{{ $route.name }}</q-item>
    <div class="q-ma-xl">
      <bookcard
        v-for="(book, index) in products"
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
  name: 'PageSearch',

  components: { Bookcard },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ products: 'products/productItems' }),
  },
});
</script>
