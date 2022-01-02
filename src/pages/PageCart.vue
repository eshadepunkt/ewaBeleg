<template>
  <q-list>
    <q-item class="text-h4 text-secondary">{{ $route.name }}</q-item>

    <q-item v-for="(item, index) in items" :key="index">
      <shopping-cart class="q-pa-md" :cartItem="item" />
    </q-item>
    <q-item-label header v-if="quantity > 0">
      Total: ${{ total }}
    </q-item-label>
    <q-item-label header v-if="quantity == 0"
      ><p>No items in Cart.</p>
      <p>You may find some <a href="#/catalogue">here</a>.</p></q-item-label
    >
  </q-list>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Order } from 'src/components/models';
import ShoppingCart from 'src/components/ShoppingCart.vue';
import { mapGetters } from 'vuex';
export default defineComponent({
  name: 'PageCart',
  data() {
    return {
      icon: false,
    };
  },

  components: { ShoppingCart },
  computed: {
    ...mapGetters({
      items: 'cart/cartItems',
      total: 'cart/cartTotal',
      quantity: 'cart/cartQuantity',
    }),
  },
});
</script>

<style></style>
