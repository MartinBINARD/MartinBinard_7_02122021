<template>
  <div class="row justify-evenly items-center submit-container">
    <q-img
      src="../assets/icon-left-font-monochrome-white.svg"
      spinner-color="white"
      class="submit-logo q-ma-xl"
      contain
    ></q-img>
    <q-card class="bg-accent my-card q-pa-xl">
      <q-card-section>
        <div class="text-h4 text-center">Log in</div>
      </q-card-section>

      <q-card-section>
        <q-form
          @submit="onLogin"
          class="q-gutter-md"
        >
          <q-input
            filled
            type="text"
            v-model="user.email"
            label="Your email *"
            hint="example@email.fr"
            lazy-rules
            :rules= "[val => val !== null && val !== '' || 'Please type your email']"
            class="input-width"
          />

          <q-input
            filled
            type="password"
            v-model="user.password"
            label="Your password *"
            lazy-rules
            :rules="[val => val !== null && val !== '' || 'Please type your password']"
            class="input-width"
          />

          <div class="row justify-between q-mb-md">
            <q-btn label="Login" type="submit" color="primary" :loading="loading"/>
            <q-btn to="register" label="Register" color="secondary"/>
          </div>
          <router-link class="text-primary" to="recover">Forgot password ?</router-link>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import formValidation from 'src/mixins/formValidation';
import { mapActions } from 'vuex';

export default {
  name: 'user-login',
  components: {},
  mixins: [formValidation],
  props: {},
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      loading: false,
      token: false,
    }
  },
  computed: {},
  watch: {},
  created() {
    if (document.cookie.match(/^(Token=)/g)) {
      console.log(document.cookie.match(/[^Token=](\S+)/g).toString());
    }
  },
  methods: {
    ...mapActions('user', ['connectUser']),
    onLogin() {
      this.loading = true;
      this.connectUser(this.user).then((res) => {
        if (201 === res.status) {
          this.loading= false;
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Logged sucessfully',
          });
          this.$router.push({ name: 'thread-posts'});
        }
      });
    },
  },
};
</script>

<style scoped>

</style>
