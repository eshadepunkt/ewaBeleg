<template>
  <q-layout view="hHh lpR lFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer">
          <q-badge
            v-if="!leftDrawerOpen && quantity > 0"
            color="orange"
            floating
            >{{ quantity }}</q-badge
          ></q-btn
        >

        <q-toolbar-title class="q-ma-sm">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          EWA-Beleg - Buchshop der HTW-Dresden
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left" class="column">
        <q-route-tab to="/bookshop" label="Bookshop" />
        <q-route-tab to="/catalogue" label="Catalogue" />

        <q-route-tab to="/cart" label="Shopping Cart">
          <q-badge v-if="quantity > 0" color="orange" floating>
            {{ quantity }}
          </q-badge>
        </q-route-tab>
        <q-route-tab to="/help" label="Help" />
        <q-space />
        <q-input
          v-model="lookingForBookTitle"
          label="Search for Booktitle or IBAN"
          maxlength="280"
          color="white"
          label-color="white"
          style="max-width: 580px"
          class="full-width q-pr-xl text-white"
        >
          <template #append>
            <q-btn
              round
              color="white"
              dense
              flat
              icon="search"
              :disable="!lookingForBookTitle"
              to="/search"
              @click="retrieveBooksByTitle()"
            />
          </template>
        </q-input>
      </q-tabs>
    </q-header>

    <q-drawer
      v-if="quantity > 0"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-expansion-item
        model-value="expansion"
        expand-separator
        icon="shopping_cart"
        label="Shopping Cart"
        header-class="text-secondary"
        :caption="
          quantity > 0
            ? quantity + (quantity > 1 ? ' items' : ' item') + ' in cart'
            : 'no items in cart'
        "
      >
        <q-card>
          <q-list>
            <q-item-label header> Total: ${{ total }} </q-item-label>
            <q-item
              v-for="(item, index) in items"
              :key="index"
              class="q-mb-sm no-padding"
            >
              <side-cart-item :cart-item="item" class="full-width" />
            </q-item>
          </q-list>
        </q-card>
      </q-expansion-item>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import { ref } from 'vue';
import SideCartItem from '../components/SideCartItem.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  components: { SideCartItem },
  setup() {
    const leftDrawerOpen = ref(false);
    const expansion = ref(false);
    return {
      leftDrawerOpen,
      expansion,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  data() {
    return {
      lookingForBookTitle: '',
    };
  },
  computed: {
    ...mapGetters({
      items: 'cart/cartItems',
      total: 'cart/cartTotal',
      quantity: 'cart/cartQuantity',
      products: 'products/productItems',
    }),
  },
  methods: {
    retrieveNewBooks() {
      void this.$store.dispatch('products/getNewProductItems');
      void this.$store.dispatch('products/getLocalProductItems');
      console.log(this.products);
    },
    retrieveBooksByTitle() {
      void this.$store.dispatch(
        'products/getProductItemsByTitle',
        this.lookingForBookTitle
      );
    },
  },
});
</script>
