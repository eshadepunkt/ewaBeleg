<template>
  <div class="shadow-1 column">
    <q-item clickable dense style="min-height: 75px" class="q-pa-md">
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
      <q-item-section side middle column>
        <q-chip
          :color="
            !(productItem.price == '0.00' || productItem.price == '$0.00')
              ? 'primary'
              : 'orange'
          "
          outline
          text-color="primary"
          style="min-width: min-content"
          icon="star"
        >
          <q-item-label
            v-if="
              !(productItem.price == '0.00' || productItem.price == '$0.00')
            "
            class="text-primary justify-end"
            caption
            >{{ total }}
          </q-item-label>
          <q-item-label v-else class="text-warning">FREE </q-item-label>
          <q-input
            v-model="ordered"
            borderless
            input-class="text-right"
            input-style="max-width: 35px"
            class="q-ml-sm q-mr-sm"
          >
            <template #append>
              <q-icon
                v-if="ordered !== 0"
                name="clear"
                color="red"
                class="cursor-pointer"
                @click="ordered = 0"
              />
              <q-icon
                v-if="ordered !== 0"
                name="remove_circle"
                class="cursor-pointer"
                color="orange"
                @click="removeOrder()"
              />

              <q-icon
                name="add_circle"
                color="green"
                class="q-ml-sm q-mr-sm"
                @click="addOrder()"
              />
            </template>
          </q-input>
        </q-chip>
      </q-item-section>
      <q-separator vertical class="q-ma-sm"></q-separator>
      <!--<div>
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
      </div>-->

      <q-item-section side :class="ordered > 0 ? 'q-mr-md' : 'q-mr-xl'">
        <q-btn
          v-if="ordered > 0"
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
      <q-card style="width: 600px; max-width: 70vw" class="bg-grey">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">ISBN: {{ productItem.isbn13 }}</div>
          <q-space />
          <q-btn v-close-popup icon="close" flat round />
        </q-card-section>

        <q-card-section>
          <q-img :src="productItem.image" sizes="100%">
            <div class="text-subtitle1 text-center no-padding">
              <q-btn
                v-if="productItem.url"
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

          <q-item v-if="productItem.desc" class="bg-white shadow-1">{{
            productItem.desc
          }}</q-item>

          <div v-if="stock == undefined" class="q-pa-md">
            <q-item-label class="text-warning bg-grey q-pa-md shadow-2 q-mb-md"
              >This is the Admin Panel for adding this Book to the
              Database</q-item-label
            >
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
      text: '',
      icon: false,
      ordered: 0,
      stock: this.productItem.stock!,
    };
  },

  computed: {
    total() {
      let orderCount = 1;
      if (this.ordered > 0) orderCount = this.ordered;
      let price = this.productItem.price;
      if (this.productItem.price.charAt(0) === '$') {
        price = this.productItem.price.substring(1);
      } else {
        price = this.productItem.price;
      }

      return '$' + (parseFloat(price) * orderCount).toFixed(2).toString();
    },
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
