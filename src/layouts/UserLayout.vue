<template>
  <header-bar />

  <q-page-container>
    <user-form />
  </q-page-container>
</template>

<script>
import UserForm from "../components/UserForm.vue";

export default {
  name: "UserLayout",
  components: { UserForm },
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

<style scoped></style>
