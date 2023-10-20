<template>
  <q-header elevated>
    <div class="row justify-between q-pa-sm bg-accent">
      <q-img
        src="favicon.ico"
        srcset="icons/favicon-128x128.png 128w,
                    icons/favicon-96x96.png 128w,
                    icons/favicon-32x32.png 32w,
                    icons/favicon-16x16.png, 16w"
        class="logo"
      />

      <profile-menu />
    </div>
  </q-header>
</template>

<script>
import ProfileMenu from "./ProfileMenu.vue";

export default {
  name: "HeaderBar",
  components: { ProfileMenu },
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
