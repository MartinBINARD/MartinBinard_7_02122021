<template>
  <div class="row justify-evenly items-center submit-container">
    <q-img
      src="../assets/icon-left-font-monochrome-white.png"
      spinner-color="white"
      class="submit-logo q-ma-xl"
      contain
    ></q-img>
    <q-card class="bg-accent my-card q-pa-xl">
      <q-card-section>
        <div class="text-h6">Log in</div>
      </q-card-section>

      <q-card-section>
        <q-form
          @submit="onLogin"
          class="q-gutter-md"
        >
          <q-input
            filled
            type="text"
            v-model="email"
            label="Your email *"
            hint="example@email.fr"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            filled
            type="text"
            v-model="password"
            label="Your password *"
            lazy-rules
            :rules="[
          val => val !== null && val !== '' || 'Please type your email',
          val => val !== null && val !== '' || 'Please type your password'
        ]"
          />

          <div>
            <q-btn label="Login" type="submit" color="primary"/>
            <q-btn label="Sign in" color="secondary"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'user-login',
  components: {},
  mixins: [],
  props: {},
  data () {
    return {
      email: null,
      password: null,
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  methods: {
    onLogin () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      }
      else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Logged sucessfully'
        })
      }
    },
  },
};
</script>

<style scoped>
.submit-logo {
  max-width: 30rem;
  max-height: 5rem;
}

.submit-container {
  height: 100vh;
}
</style>
