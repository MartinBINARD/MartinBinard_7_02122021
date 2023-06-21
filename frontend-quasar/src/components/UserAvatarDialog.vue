<template>
  <q-btn
    color="primary"
    icon="camera_enhance"
    class="btn-dialog"
    @click="card = true"
  />

  <q-dialog v-model="card" class="q-pa-xl">
    <q-card class="my-card">
      <q-card-section class="row items-center q-pb-md">
        <div class="text-h6">Modify my avatar</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-img src="../assets/default-tux-avatar.png" />

      <q-separator />

      <q-form class="q-pa-md">
        <q-file
          name="poster_file"
          v-model="file"
          filled
          label="Select poster image"
          class="q-pb-md"
        />

        <div class="row justify-between">
          <q-btn type="submit" label="Save" color="secondary" v-close-popup />
          <q-btn
            flat
            type="reset"
            label="Cancel"
            color="primary"
            v-close-popup
          />
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "UserAvatarDialog",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      card: false,
      file: null,
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {},
};
</script>

<style scoped>
.btn-dialog {
  margin: 0 0 0 5rem;
}
</style>
