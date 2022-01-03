<template>
  <q-page class="column">
    <q-item class="text-h4 text-secondary">{{ $route.name }}</q-item>
    <div class="q-ma-sm">
      <q-item-section>
        <q-item v-for="item in items" :key="item.id">
          <shopping-cart-item class="q-pa-md" :cartItem="item" />
        </q-item>
      </q-item-section>

      <q-item-label header v-if="quantity > 0">
        Total: ${{ total }}
      </q-item-label>
      <q-item-label header v-if="quantity == 0">
        <p>No items in Cart.</p>
        <p v-if="items.length == 0">
          You may find some <a href="#/catalogue">here</a>.
        </p>
      </q-item-label>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ShoppingCartItem from 'src/components/ShoppingCartItem.vue';
import { mapGetters } from 'vuex';
export default defineComponent({
  name: 'PageCart',
  components: { ShoppingCartItem },
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
