<template>
  <div class="shadow-1">
    <q-item dense clickable to="/cart" exact-active-class="mytest">
      <q-item-section avatar>
        <q-avatar rounded>
          <img :src="cartItem.item.image" />
          <q-badge color="orange" floating>{{ quantity }}</q-badge>
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ cartItem.item.title }}</q-item-label>
        <q-item-label caption lines="2">{{
          cartItem.item.subtitle
        }}</q-item-label>
      </q-item-section>
      <q-item-section side middle>
        <q-item-label caption>${{ total }} </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Order } from './models';
export default defineComponent({
  name: 'SideCartItem',
  data() {
    return {
      //quantity: this.cartItem.quantity,
    };
  },
  computed: {
    quantity() {
      return this.cartItem.quantity;
    },
    total() {
      return (
        parseFloat(this.cartItem.item.price.substring(1)) *
        this.cartItem.quantity
      ).toFixed(2);
    },
  },
  props: { cartItem: { type: Order, required: true } },
});
</script>

<style></style>
