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
import { Order } from 'src/components/models';
import ShoppingCartItem from 'src/components/ShoppingCartItem.vue';
import { mapGetters } from 'vuex';
import axios, { AxiosInstance } from 'axios';

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
        baseURL: 'https://iws107.informatik.htw-dresden.de/ewa/g08/php/',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const response: Promise<unknown> = apiClient.post(
        'create-checkout-session.php',
        {
          items: Checkout,
        }
      );

      // void response.then((response: unknown) => {
      //   window.location.href =
      //     (response as Response).headers.get('Location') || '';
      // });
      console.log(response);
      // const location = new Location();
      // location.href =
      //   'https://iws107.informatik.htw-dresden.de/ewa/g08/php/create-checkout-session.php';
      // window.location = location;
    },
  },
});
</script>
