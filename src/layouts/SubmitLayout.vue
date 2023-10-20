<template>
  <router-view/>

  <q-footer>
    <q-toolbar>
      <q-toolbar-title class="text-overline text-accent text-center">
        Powered by :
        <a class="text-secondary" href="https://martin-binard.com/" > Martin Binard</a>
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<script>
export default {
  name: 'SubmitLayout',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
  },
  methods: {},
};
</script>

<style>
.submit-container {
  height: 100vh;
}

.submit-logo {
  max-width: 30rem;
  max-height: 5rem;
}

.input-width {
  min-width: 17rem;
}
</style>
