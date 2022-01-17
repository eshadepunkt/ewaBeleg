<template>
  <div class="q-pa-sm shadow-1">
    <q-item clickable dense>
      <q-item-section avatar>
        <q-avatar rounded size="100px">
          <img :src="cartItem.item.image" />
          <q-badge color="orange" floating>{{ cartItem.quantity }}</q-badge>
        </q-avatar>
      </q-item-section>

      <q-item-section @click="icon = true">
        <q-item-label>{{ cartItem.item.title }}</q-item-label>
        <q-item-label caption lines="2">{{
          cartItem.item.subtitle
        }}</q-item-label>
      </q-item-section>
      <q-item-section side middle>
        <q-item-label v-if="cartItem.item.price.charAt(0) === '$'" caption>
          ${{
            (
              parseFloat(cartItem.item.price.substring(1)) * cartItem.quantity
            ).toFixed(2)
          }}
        </q-item-label>
        <q-item-label v-else caption>
          ${{
            (parseFloat(cartItem.item.price) * cartItem.quantity).toFixed(2)
          }}
        </q-item-label>
        <q-item-label caption>{{ cartItem.item.isbn13 }} </q-item-label>
      </q-item-section>
      <q-separator vertical class="q-ma-sm q-ml-xl"></q-separator>
      <div class="">
        <!-- <q-item-section style="max-width: 3rem">
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
        /> -->

        <q-btn-group class="column" style="max-width: 3rem">
          <q-btn
            color="green"
            glossy
            text-color="black"
            label=""
            icon="add_circle"
            @click="addOrder()"
          />
          <div class="no-padding">
            <q-input
              v-model="quantity"
              input-class="text-center full-width"
              borderless
              @change="updateOrder()"
            />
          </div>
          <q-btn
            color="warning"
            glossy
            text-color="black"
            label=""
            icon="remove_circle"
            @click="removeOrder()"
          />
          <q-btn
            color="red"
            glossy
            text-color="black"
            label=""
            icon-right="clear"
            @click="confirm = true"
          />
        </q-btn-group>
      </div>
      <!-- <q-separator vertical class="q-ma-md"></q-separator>
      <q-item-section side>
        <q-btn color="negative" flat icon="clear" @click="confirm = true" />
      </q-item-section> -->
    </q-item>
    <!-- Open Item Dialog-->
    <q-dialog v-model="icon">
      <q-card style="width: 600px; max-width: 70vw">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ cartItem.item.isbn13 }}</div>
          <q-space />
          <q-btn v-close-popup icon="close" flat round />
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
    <!-- Open Confirmation-->
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="question_mark"
            color="primary"
            text-color="white"
          /><span class="q-ma-sm text-h6">{{ cartItem.item.title }}</span
          ><q-img :src="cartItem.item.image" style="max-width: 200px"></q-img>
          <p class="q-ma-sm">Do you really want remove this item?</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            label="Cancel"
            color="warning"
            @click="confirm = false"
          />
          <q-btn
            v-close-popup
            flat
            label="Delete"
            color="red"
            @click="deleteOrder()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
import { Order } from './models';
export default defineComponent({
  name: 'ShoppingCartItem',
  props: { cartItem: { type: Order, required: true } },
  data() {
    return {
      icon: false,
      confirm: ref(false),
      quantity: this.cartItem.quantity,
    };
  },

  computed: {
    ...mapGetters({
      items: 'cart/cartItems',
      total: 'cart/cartTotal',
      products: 'products/productItems',
    }),
  },
  methods: {
    addOrder() {
      let quantity: number = this.cartItem.quantity;
      quantity++;
      this.quantity++;
      let order: Order = { ...this.cartItem };

      order.quantity = quantity;
      void this.$store.dispatch('cart/updateOrder', order);
      console.log(order);
    },
    removeOrder() {
      if (this.quantity === 0) {
        this.confirm = true;
        return;
      }
      let quantity: number = this.cartItem.quantity;
      quantity--;
      this.quantity--;
      let order: Order = { ...this.cartItem };
      order.quantity = quantity;
      if (quantity === 0) {
        this.confirm = true;
      }
      void this.$store.dispatch('cart/updateOrder', order);
    },
    updateOrder() {
      const count = Number(this.quantity);
      if (isNaN(count) || count <= 0) {
        this.quantity = 0;
      }
      let quantity: number = parseInt(Number(this.quantity).toFixed(0));
      this.quantity = quantity;
      let order: Order = { ...this.cartItem };

      order.quantity = parseInt(Number(quantity).toFixed(0));

      void this.$store.dispatch('cart/updateOrder', order);
    },
    deleteOrder() {
      void this.$store.dispatch('cart/deleteOrder', this.cartItem.item.isbn13);
    },
  },
});
</script>

<style></style>
