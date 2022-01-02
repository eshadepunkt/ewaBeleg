<template>
  <div class="shadow-1">
    <q-item clickable v-ripple dense>
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
        <q-item-label caption>{{ cartItem.item.price }} </q-item-label>
      </q-item-section>
    </q-item>
    <q-dialog v-model="icon">
      <q-card style="width: 600px; max-width: 70vw">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ cartItem.item.isbn13 }}</div>
          <q-space />
          <q-btn icon="close" flat round v-close-popup />
        </q-card-section>

        <div>
          <q-item-section style="max-width: 3rem">
            <q-input v-model="quantity" outlined dense borderless />
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
import { defineComponent, ref } from 'vue';
import { Order } from 'src/components/models';
export default defineComponent({
  name: 'ShoppingCart',
  data() {
    return {
      icon: false,
    };
  },
  computed: {
    quantity: function () {
      return this.cartItem.quantity;
    },
  },
  created() {
    console.log('Creating cart component: ', this.cartItem);
  },
  methods: {
    addOrder() {
      let order: Order = { ...this.cartItem };
      order.quantity++;
      console.log(order);
      void this.$store.dispatch('cart/updateOrder', order);
    },
    removeOrder() {
      if (this.quantity === 0) return;
      let order: Order = { ...this.cartItem };
      order.quantity--;
      void this.$store.dispatch('cart/updateOrder', order);
    },
    updateOrder() {
      console.log(this.quantity);
    },
  },
  components: {},
  props: { cartItem: { type: Order, required: true } },
});
</script>

<style></style>
