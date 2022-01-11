<template>
  <q-page class="column">
    <q-item class="text-h4 text-secondary">{{ $route.name }}</q-item>
    <div class="q-ma-sm">
      <q-item-section>
        <q-item v-for="item in items" :key="item.id">
          <shopping-cart-item class="q-pa-md full-width" :cart-item="item" />
        </q-item>
      </q-item-section>
      <q-item-label v-if="quantity > 0" header>
        Total: ${{ total }}
        <q-btn
          class="col-12"
          flat
          rounded
          color="secondary"
          label="Checkout"
          @click="handleCheck()"
        ></q-btn>
      </q-item-label>
      <q-item-label v-if="quantity == 0" header>
        <p>No items in Cart.</p>
        <p v-if="items.length == 0">
          You may find some <a href="#/catalogue">here</a>.
        </p>
      </q-item-label>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Order, SessionResponse } from 'src/components/models';
import ShoppingCartItem from 'src/components/ShoppingCartItem.vue';
import { mapGetters } from 'vuex';
import axios, { AxiosInstance } from 'axios';
import { loadStripe, Stripe } from '@stripe/stripe-js/';

export default defineComponent({
  name: 'PageCart',
  components: { ShoppingCartItem },
  data() {
    return {
      loading: false,
      stripe: ref<Stripe | null>(),
    };
  },
  computed: {
    ...mapGetters({
      items: 'cart/cartItems',
      total: 'cart/cartTotal',
      quantity: 'cart/cartQuantity',
    }),
  },
  async mounted() {
    if (!this.stripe) {
      this.stripe = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx'); //REPLACE THE KEY
    }
  },
  methods: {
    handleCheck() {
      let array = this.items as Order[];
      let Checkout: {
        isbn: string;
        quantity: number;
      }[] = [];
      array.forEach((order: Order) =>
        Checkout.push({ isbn: order.item.isbn13, quantity: order.quantity })
      );
      console.log(Checkout);
      const apiClient: AxiosInstance = axios.create({
        baseURL: '/checkout',
        headers: {
          'Content-type': 'application/json',
        },
      });
      //this.stripe = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
      // let response: Promise<unknown> = apiClient
      //   .post('create-checkout-session.php', {
      //     items: Checkout,
      //   })
      //   .then(() => {
      //     JSON.stringify({});
      //   });

      // let stripObject = stripe.then((phpresponse) => {
      //   phpresponse?.redirectToCheckout({
      //     name: response),
      //   console.log('stripeObj', phpresponse);
      //   });

      //todo
      const session = fetch('/create-checkout-session.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      }).then((r) => r.json());

      void this.stripe?.redirectToCheckout({
        sessionId: session.id,
      });
    },
  },
});
</script>
