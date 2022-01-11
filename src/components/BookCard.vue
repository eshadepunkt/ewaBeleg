<template>
  <div class="q-pa-sm shadow-1">
    <q-item clickable dense>
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
          <q-input v-model="ordered" outlined dense borderless />
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
          <div class="text-h6">ISBN: {{ productItem.isbn13 }}</div>
          <q-space />
          <q-btn v-close-popup icon="close" flat round />
        </q-card-section>

        <q-card-section>
          <q-img :src="productItem.image" sizes="100%">
            <div class="absolute-bottom text-subtitle1 text-center">
              <q-btn
                align="between"
                class="btn-fixed-width"
                color="accent"
                :label="productItem.title"
                icon="public"
                target="_blank"
                :href="productItem.url"
              />
            </div>
          </q-img>

          <div v-if="stock == undefined" class="q-pa-md">
            <q-badge transparent color="accent">
              quantity: {{ quantity }}
            </q-badge>

            <q-slider
              v-model="quantity"
              :min="0"
              :max="100"
              :step="1"
              label
              color="primary"
            ></q-slider
            ><q-btn
              v-if="quantity > 0"
              class="glossy"
              color="primary"
              icon="add"
              @click="addToLocalBookStore()"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Notify } from 'quasar';
import { defineComponent, PropType } from 'vue';
import { Order, Book } from './models';

export default defineComponent({
  name: 'BookCard',
  props: { productItem: { type: Object as PropType<Book>, required: true } },
  data() {
    return {
      quantity: 0,
      icon: false,
      ordered: 0,
      stock: this.productItem.stock!,
    };
  },
  methods: {
    addOrder() {
      this.ordered++;
    },
    removeOrder() {
      this.ordered--;
    },
    addOrderToCart() {
      let count = Number(this.ordered);

      if (count > this.stock) {
        Notify.create({
          icon: 'cancel',
          color: 'warning',
          message: `You tried to order more than books are in stock. We added the maximum of ${this.stock} for you.`,
        });
        count = this.stock;
      } else {
        Notify.create({
          icon: 'check',
          color: 'primary',
          message: 'Book added.',
        });
      }

      if (this.productItem === null) return;

      if (isNaN(count) || count <= 0) return;
      const newOrder = new Order(this.productItem, count);

      void this.$store.dispatch('cart/addOrder', newOrder);
      this.ordered = 0;
    },
    addToLocalBookStore() {
      console.log();

      let productItem: Book = { ...this.productItem };
      productItem.stock = this.quantity;
      void this.$store.dispatch('products/addLocalProductItem', productItem);
    },
  },
});
</script>
