<template>
  <div class="row justify-evenly items-center submit-container">
    <q-img
      src="../../assets/icon-left-font-monochrome-white.svg"
      spinner-color="white"
      class="submit-logo q-ma-xl"
      contain
    ></q-img>
    <q-card class="bg-accent my-card q-pa-xl rounded-borders">
      <q-card-section>
        <div class="text-h4 text-center">Register</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onRegister" class="q-gutter-md">
          <div class="row justify-between items-center">
            <q-input
              filled
              v-model="form.firstname"
              type="text"
              label="Your firstname *"
              lazy-rules
              :rules="rules.firstname"
              class="q-mr-md"
            />

            <q-input
              filled
              type="text"
              v-model="form.lastname"
              label="Your lastname *"
              lazy-rules
              :rules="rules.lastname"
            />
          </div>

          <q-input
            filled
            type="text"
            v-model="form.email"
            label="Your email *"
            hint="example@email.fr"
            lazy-rules
            :rules="rules.email"
            class="input-width"
          />

          <q-input
            filled
            type="password"
            v-model="form.password"
            label="Your password *"
            lazy-rules
            :rules="rules.password"
            class="input-width q-mb-xl"
          />

          <q-input
            filled
            type="password"
            v-model="checkPassword"
            label="Your password again *"
            lazy-rules
            :rules="rules.checkPassword"
            class="input-width"
          />

          <div class="row items-center">
            <q-toggle
              v-model="accept"
              label="I accept the license and terms"
              class="q-mr-sm"
            />
            <a
              href="https://en.wikipedia.org/wiki/General_Data_Protection_Regulation"
              >GDPR</a
            >
          </div>

          <div class="row justify-between q-mb-md">
            <q-btn label="Register" type="submit" color="secondary" />
          </div>
          <router-link class="text-primary" to="login"
            >Already registered ?</router-link
          >
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { formValidation } from "../../mixins/index";
import { mapActions } from "vuex";
export default {
  name: "SubmitRegister",
  components: {},
  mixins: [formValidation],
  props: {},
  data() {
    return {
      form: {
        firstname: null,
        lastname: null,
        email: null,
        password: null,
      },
      checkPassword: null,
      accept: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    ...mapActions("user", ["registerUser"]),
    onRegister() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to accept the license and terms first !",
        });
      } else {
        this.registerUser(this.form).then((res) => {
          if (201 === res.status) {
            this.$q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Successful registration",
            });
            this.$router.push("login");
          }
        });
      }
    },
  },
};
</script>

<style scoped></style>
