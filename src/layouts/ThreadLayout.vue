<template>
  <header-bar />

  <q-page-container>
    <router-view />
  </q-page-container>
</template>

<script>
import HeaderBar from "../components/HeaderBar.vue";

export default {
  name: "ThreadLayout",
  components: { HeaderBar },
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {},
};
</script>

<style scoped>
.logo {
  width: 3rem;
}
</style>
