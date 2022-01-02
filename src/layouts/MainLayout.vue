<template>
  <q-layout view="hHh lpR lFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer">
          <q-badge v-if="!leftDrawerOpen" color="orange" floating>{{
            quantity
          }}</q-badge></q-btn
        >

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          EWA-Beleg
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/home" label="Home" />
        <q-route-tab to="/catalogue" label="Catalogue" />

        <q-route-tab to="/cart" label="Shopping Cart">
          <q-badge v-if="quantity > 0" color="orange" floating>
            {{ quantity }}
          </q-badge>
        </q-route-tab>
        <q-route-tab to="/help" label="Help" />
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-expansion-item
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
            <q-item v-for="(item, index) in items" :key="index">
              <side-cart-item :cartItem="item" />
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

export default {
  name: 'MainLayout',
  components: { SideCartItem },
  computed: {
    ...mapGetters({
      items: 'cart/cartItems',
      total: 'cart/cartTotal',
      quantity: 'cart/cartQuantity',
    }),
  },
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
