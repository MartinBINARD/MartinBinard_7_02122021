<template>
  <q-btn round>
    <q-avatar>
      <img src="https://cdn.quasar.dev/img/avatar4.jpg"/>
    </q-avatar>

    <q-menu>
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md">Settings</div>
          <q-toggle v-model="mobileData" label="Use Mobile Data"></q-toggle>
          <q-toggle v-model="bluetooth" label="Bluetooth"></q-toggle>
        </div>
        <q-separator vertical inset class="q-mx-lg"></q-separator>
        <div class="column items-center">
          <q-avatar class="avatar">
            <img src="https://cdn.quasar.dev/img/avatar4.jpg">
          </q-avatar>
          <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>
          <q-btn
            color="primary"
            label="Logout"
            @click="signOut"
            v-close-popup
          ></q-btn>
        </div>
      </div>
    </q-menu>
    </q-btn>
</template>

<script>
import { mapMutations } from 'vuex';


export default {
  name: 'AccountSettings',
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
  methods: {
    ...mapMutations('user', ['setUser']),
    signOut() {}
  },
}
</script>

<style scoped>
.avatar {
  height: 4rem;
  width: 4rem;
}
</style>
