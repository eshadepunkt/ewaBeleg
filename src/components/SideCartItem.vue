<template>
  <div class="">
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
  props: { cartItem: { type: Order, required: true } },
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
      let price = null;
      if (this.cartItem.item.price.charAt(0) === '$') {
        price = this.cartItem.item.price.substring(1);
      } else {
        price = this.cartItem.item.price;
      }

      return (parseFloat(price) * this.cartItem.quantity).toFixed(2);
    },
  },
});
</script>

<style></style>
