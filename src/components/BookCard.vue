<template>
  <div class="q-pa-md">
    <q-list bordered separator>
      <q-item
        clickable
        v-ripple
        v-for="book in books"
        :key="book.id"
        @click="icon = true"
      >
        <q-item-section>
          <q-item-label overline>{{ book.title }}</q-item-label>
          <q-item-label>{{ book.author }} - {{ book.content }}</q-item-label>
          <q-dialog v-model="icon">
            <q-card>
              <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">{{ book.title }}</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>

              <q-card-section>
                {{ book.content }}
              </q-card-section>
            </q-card>
          </q-dialog>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Book } from './models';

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
    books: {
      type: Array as PropType<Book[]>,
      default: () => [],
    },

    active: {
      type: Boolean,
    },
  },
});
</script>
