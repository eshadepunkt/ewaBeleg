<template>
  <q-item class="text-h4 text-primary">{{ $route.name }}</q-item>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        {{ lorem }}
      </q-card-section>
    </q-card>

    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Der Client</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Das Projekt wurde vollständig typisiert in TypeScript geschrieben.
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        Auf Basis von Vue.js 3 wurde das Framework Quasar genutzt.
      </q-card-section>
    </q-card>
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Der Server</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Für das Backend wurde PHP benutzt.
      </q-card-section>

      <q-separator inset />

      <q-card-section> </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageHelp',
  setup() {
    return {
      lorem:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    };
  },
});
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
