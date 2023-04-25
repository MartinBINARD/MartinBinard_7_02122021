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

        <account-settings/>
        </div>
      
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
</template>

<script>
import AccountSettings from '../components/AccountSettings.vue'

export default {
  name: 'ThreadLayout',
  components: { AccountSettings },
  mixins: [],
  props: {},
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: null,
    };
  },
  computed: {},
  watch: {},
  created() {
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    }
  },
};
</script>

<style scoped>
.logo {
  width: 3rem;
}
</style>
