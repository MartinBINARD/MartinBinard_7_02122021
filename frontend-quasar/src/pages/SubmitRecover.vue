<template>
  <div class="row justify-center items-center submit-container">
    <q-card class="bg-accent my-card q-pa-xl">
      <q-card-section>
        <div class="text-h6">Send a new password to your email address :</div>
      </q-card-section>

      <q-card-section>
        <q-form
          @submit="onRecover"
          class="q-gutter-md"
        >
          <q-input
            filled
            type="text"
            v-model="email"
            label="Your email *"
            hint="example@email.fr"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type your email']"
          />

          <div class="row justify-between q-mb-md">
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn to="login" label="Cancel" type="reset" color="secondary" flat/>
          </div>

        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'SubmitRecover',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      email: null,
    };
  },
  computed: {},
  watch: {},
  created() {
  },
  methods: {
    onRecover(value) {
      console.log(value);
    },
  },
};
</script>

<style scoped>

</style>
