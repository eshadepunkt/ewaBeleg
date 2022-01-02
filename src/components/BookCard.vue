<template>
  <div class="q-pa-sm shadow-1">
    <q-item clickable v-ripple dense>
      <q-item-section avatar>
        <q-avatar rounded>
          <img :src="productItem.image" />
        </q-avatar>
      </q-item-section>
      <q-item-section @click="icon = true">
        <q-item-label>{{ productItem.title }}</q-item-label>
        <q-item-label caption lines="2">{{
          productItem.subtitle
        }}</q-item-label>
      </q-item-section>
      <q-item-section side middle>
        <q-item-label caption>{{ productItem.price }} </q-item-label>
        <q-item-label caption>{{ productItem.isbn13 }} </q-item-label>
      </q-item-section>
      <q-separator vertical class="q-ma-md"></q-separator>
      <div>
        <q-item-section style="max-width: 3rem">
          <q-input outlined v-model="ordered" dense borderless />
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

      <q-item-section side>
        <q-btn
          color="accent"
          round
          dense
          flat
          icon="shopping_cart"
          @click="addOrderToCart()"
        />
      </q-item-section>
    </q-item>
    <q-dialog v-model="icon">
      <q-card style="width: 600px; max-width: 70vw">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ productItem.isbn13 }}</div>
          <q-space />
          <q-btn icon="close" flat round v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-img :src="productItem.image" sizes="100%">
            <div class="absolute-bottom text-subtitle1 text-center">
              <a :href="productItem.url">{{ productItem.title }}</a>
            </div>
          </q-img>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Guid } from 'guid-typescript';
import { defineComponent, ref } from 'vue';
import { IOrder, Book, Order } from './models';

export default defineComponent({
  name: 'BookCard',
  data() {
    return {
      icon: false,
      ordered: 0,
    };
  },
  props: ['productItem'],
  methods: {
    addOrder() {
      this.ordered++;
    },
    removeOrder() {
      if (this.ordered <= 0) return;
      this.ordered--;
    },
    addOrderToCart() {
      if (this.productItem === null) return;
      const count = Number(this.ordered);
      if (isNaN(count) || count === 0) return;
      const newOrder = new Order(this.productItem, count);

      void this.$store.dispatch('cart/addOrder', newOrder);
      this.ordered = 0;
    },
  },
});
</script>
