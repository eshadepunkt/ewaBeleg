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
import { defineComponent } from 'vue';
import { Order, SessionResponse } from 'src/components/models';
import ShoppingCartItem from 'src/components/ShoppingCartItem.vue';
import { mapGetters } from 'vuex';
import axios, { AxiosInstance } from 'axios';
import { loadStripe } from '@stripe/stripe-js/';

export default defineComponent({
  name: 'PageCart',
  components: { ShoppingCartItem },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      items: 'cart/cartItems',
      total: 'cart/cartTotal',
      quantity: 'cart/cartQuantity',
    }),
  },
  methods: {
    async handleCheck() {
      let array = this.items as Order[];
      let Checkout: {
        isbn: string;
        quantity: number;
      }[] = [];
      array.forEach((order: Order) =>
        Checkout.push({ isbn: order.item.isbn13, quantity: order.quantity })
      );

      const stripe = await loadStripe(
        'pk_test_51KDtIyET23jqW2iQaLFmxKgyt9evwqwh7ULN4ZhiOlW8Vbkc1a1uFCpqD2D8ZKXUeRrqrU4Qu1B5Ut59BFgDBodn001VVYoNTv'
      );

      if (stripe == null) {
        // window.location =      //TODO: REDIRECT TO THE FAILURE URL (CREATE SUCCESS AND FAILURE URL FIRST (SET THEM IN PHP-SCRIPT))
      }

      const apiClient: AxiosInstance = axios.create({
        baseURL: '/checkout',
        headers: {
          'Content-type': 'application/json',
        },
      });

      apiClient
        .post('create-checkout-session.php', {
          items: Checkout,
        })
        .then((r) => {
          let session = r.data as unknown as SessionResponse;
          if (session.id == undefined) {
            console.log("Error while creating Stripe Checkout session: ", r.data);   //TODO Maybe display this in an html element, since it is html code 
            return;
          }
          void stripe?.redirectToCheckout({
            sessionId: session.id,
          });
        })
        .catch((e) => console.log(e));
    },
  },
});
</script>
