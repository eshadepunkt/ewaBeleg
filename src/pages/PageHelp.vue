<template>
  <q-page class="column"
    ><q-item
      ><h5>{{ $route.name }}</h5></q-item
    >
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageHelp',
});
</script>
