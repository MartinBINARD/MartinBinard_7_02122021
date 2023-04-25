<template>
  <q-layout view="lHh Lpr lFf" class="bg-primary">
    <router-view/>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  components: {},
  mixins: [],
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {},
})
</script>
