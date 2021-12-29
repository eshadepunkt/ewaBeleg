<template>
  <div class="q-pa-sm shadow-1">
    <q-item clickable v-ripple dense>
      <q-item-section avatar>
        <q-avatar rounded>
          <img :src="image" />
        </q-avatar>
      </q-item-section>
      <q-item-section @click="icon = true">
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption lines="2">{{ subtitle }}</q-item-label>
      </q-item-section>
      <q-item-section side middle>
        <q-item-label caption>{{ price }} </q-item-label>
        <q-item-label caption>{{ isbn13 }} </q-item-label>
      </q-item-section>
      <q-separator vertical class="q-ma-md"></q-separator>
      <div>
        <q-item-section style="max-width: 4rem">
          <q-input outlined v-model="ordered" dense item-aligned />
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
          @click="removeOrder()"
        />
      </q-item-section>
    </q-item>
    <q-dialog v-model="icon">
      <q-card style="width: 600px; max-width: 70vw">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ isbn13 }}</div>
          <q-space />
          <q-btn icon="close" flat round v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-img :src="image" sizes="100%">
            <div class="absolute-bottom text-subtitle1 text-center">
              <a :href="url">{{ title }}</a>
            </div>
          </q-img>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BookCard',
  data() {
    return {
      icon: false,
      ordered: 0,
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
    price: {
      type: String,
      required: true,
    },
    isbn13: {
      type: String,
    },
    image: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  methods: {
    addOrder() {
      this.ordered++;
      console.log('ordered: ', this.ordered);
    },
    removeOrder() {
      if (this.ordered <= 0) return;
      this.ordered--;
      console.log('ordered: ', this.ordered);
    },
  },
});
</script>
