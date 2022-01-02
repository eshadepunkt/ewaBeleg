<template>
  <div class="q-pa-sm shadow-1">
    <q-item clickable>
      <q-item-section avatar>
        <q-avatar rounded>
          <img :src="cartItem.item.image" />
          <q-badge color="orange" floating>{{ quantity }}</q-badge>
        </q-avatar>
      </q-item-section>

      <q-item-section @click="icon = true">
        <q-item-label>{{ cartItem.item.title }}</q-item-label>
        <q-item-label caption lines="2">{{
          cartItem.item.subtitle
        }}</q-item-label>
      </q-item-section>
      <q-item-section side middle>
        <q-item-label caption>
          {{ (parseFloat(cartItem.item.price.substring(1)) * cartItem.quantity).toFixed(2) }}
        </q-item-label>
        <q-item-label caption>{{ cartItem.item.isbn13 }} </q-item-label>
      </q-item-section>
      <q-separator vertical class="q-ma-md"></q-separator>
      <div>
        <q-item-section style="max-width: 3rem">
          <q-input
            v-model="quantity"
            outlined
            dense
            borderless
            @change="updateOrder()"
          />
        </q-item-section>
        <q-btn
          color="positive"
          round
          dense
          flat
          icon="add_circle"
          @click="addOrder()"
        />

        <q-btn
          color="negative"
          round
          dense
          flat
          icon="remove_circle"
          @click="removeOrder()"
        />
      </div>
      <q-separator vertical class="q-ma-md"></q-separator>
      <q-item-section side>
        <q-btn
          color="negative"
          flat
          icon="clear"
          @click="deleteOrder()"
        />
      </q-item-section>
    </q-item>

    <q-dialog v-model="icon">
      <q-card style="width: 600px; max-width: 70vw">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ cartItem.item.isbn13 }}</div>
          <q-space />
          <q-btn icon="close" flat round v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-img :src="cartItem.item.image" sizes="100%">
            <div class="absolute-bottom text-subtitle1 text-center">
              <a :href="cartItem.item.url">{{ cartItem.item.title }}</a>
            </div>
          </q-img>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Order } from './models';
export default defineComponent({
  name: 'ShoppingCartItem',
  data() {
    return {
      icon: false,
      quantity: this.cartItem.quantity,
    };
  },
  methods: {
    addOrder() {
      this.quantity++;
      let order: Order = { ...this.cartItem };
      order.quantity = this.quantity;
      void this.$store.dispatch('cart/updateOrder', order);
    },
    removeOrder() {
      if (this.quantity === 0) return;
      this.quantity--;
      let order: Order = { ...this.cartItem };
      order.quantity = this.quantity;
      void this.$store.dispatch('cart/updateOrder', order);
    },
    updateOrder() {
      const count = Number(this.quantity);
      if (isNaN(count) || count === 0) {
        this.quantity = 0;
        return;
      }
      let order: Order = { ...this.cartItem };
      order.quantity = count;
      void this.$store.dispatch('cart/updateOrder', order);
    },
    deleteOrder() {
      void this.$store.dispatch('cart/deleteOrder', this.cartItem.item.isbn13);
    },
  },
  props: { cartItem: { type: Order, required: true } },
});
</script>

<style></style>
