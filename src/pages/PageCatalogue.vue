<template>
  <q-page class="column">
    <q-item
      ><h5>{{ $route.name }}</h5></q-item
    >
    <div class="q-ma-xl">
      <q-input
        bottom-slots
        v-model="newBookTitle"
        placeholder="Add new Book here."
        counter
        maxlength="280"
      >
        <template v-slot:before>
          <q-icon name="local_library" />
        </template>

        <template v-slot:append>
          <q-btn
            round
            dense
            flat
            icon="add"
            :disable="!newBookTitle"
            @click="addBook(newBookTitle)"
          />
        </template>
      </q-input>
      <bookcard title="Books" :books="books" active></bookcard>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Bookcard from 'components/BookCard.vue';
import { Book } from 'components/models';

export default defineComponent({
  name: 'PageIndex',

  components: { Bookcard },
  data() {
    return {
      newBookTitle: '',
    };
  },
  setup() {
    const books = ref<Book[]>([
      {
        id: 0,
        title: 'Mein erstes Buch',
        author: 'Mein erster Autor',
        content:
          'Hier steht eine Kurze Beschreibung des Buches das angezeigt wird',
      },
      {
        id: 1,
        title: 'Mein zweites Buch',
        author: 'Mein zweites Autor',
        content:
          'Hier steht eine Kurze Beschreibung des Buches das angezeigt wird (2)',
      },
    ]);
    console.log(books);

    return { books };
  },

  methods: {
    addBook(_title: string) {
      var index: number = this.books.length;
      var book = ref<Book>({
        id: index,
        title: _title,
        author: 'authorAdd',
        content: 'lorem ipsum dolor',
      });
      this.books.push(book.value);
    },
  },
});
</script>
