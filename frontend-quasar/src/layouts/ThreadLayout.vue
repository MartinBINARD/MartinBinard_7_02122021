<template>
  <q-layout view="lHh Lpr lFf">
    <q-header color="$accent" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-img
          src="favicon.ico"
          srcset="icons/favicon-128x128.png 128w,
                  icons/favicon-96x96.png 128w,
                  icons/favicon-32x32.png 32w,
                  icons/favicon-16x16.png, 16w"
          class="logo"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

export default {
  name: 'ThreadLayout',
  components: { EssentialLink },
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
  // setup () {
  //   const leftDrawerOpen = ref(false)
  //
  //   return {
  //     essentialLinks: linksList,
  //     leftDrawerOpen,
  //     toggleLeftDrawer () {
  //       leftDrawerOpen.value = !leftDrawerOpen.value
  //     }
  //   }
  // }
};
</script>

<style scoped>
.logo {
  width: 2rem;
}
</style>
