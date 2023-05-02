<template>
  <q-btn round>
    <q-avatar>
      <img src="https://cdn.quasar.dev/img/avatar4.jpg"/>
    </q-avatar>

    <q-menu>
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md">Settings</div>
          <div>{{ userData }}</div>
        </div>
        <q-separator vertical inset class="q-mx-lg"></q-separator>
        <div class="column items-center">
          <q-avatar class="avatar">
            <img src="https://cdn.quasar.dev/img/avatar4.jpg">
          </q-avatar>
          <div class="text-subtitle1 q-mt-md q-mb-xs">{{ userData.firstName }} {{ userData.lastName }}</div>
          <q-btn
            color="primary"
            label="Logout"
            @click="singOut"
            v-close-popup
          ></q-btn>
        </div>
      </div>
    </q-menu>
    </q-btn>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'AccountSettings',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState('user', ['user', 'auth']),
    userData() {
      return this.$store.state.user.user;
    }, 
  },
  watch: {},
  created() {
    console.log('store user', this.$store.state.user);
  },
  methods: {
    ...mapActions('user', ['disconnectUser']),
    singOut() {
      this.disconnectUser()
        .then((res) => {
          if(200 === res.status) {
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Logout successful',
            });
          }
        });
      this.$router.push({ name: 'submit-login' });
    },
  },
}
</script>

<style scoped>
.avatar {
  height: 4rem;
  width: 4rem;
}
</style>
