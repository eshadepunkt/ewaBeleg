<template>
  <div class="q-pa-sm">
    <q-item clickable v-ripple dense @click="icon = true">
      <q-item-section avatar>
        <q-avatar rounded>
          <img :src="image" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption lines="2">{{ subtitle }}</q-item-label>
      </q-item-section>

      <q-item-section side top>
        <q-item-label caption>{{ price }} </q-item-label>
        <q-item-label caption>{{ isbn13 }} </q-item-label>
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
    return { icon: false };
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
});
</script>
