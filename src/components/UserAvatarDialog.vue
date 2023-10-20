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
        <div class="text-h6">Upload my avatar</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-separator />

      <q-card-section class="text-subitle2">
        <q-uploader
          :factory="upload"
          label="Max total upload size (4 Mb)"
          max-total-size="4194304"
          max-files="1"
          accept=".png, .jpeg, .jpg, image/*"
          @rejected="onRejected"
          class="uploader"
        />
      </q-card-section>
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
      mapErrors: {
        accept: "Only images with jpg and png format please !",
        "max-total-size": "Exceeded max file size of 4 Mb",
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    upload() {},
    onRejected(rejectedEntries) {
      rejectedEntries.forEach((entry) => {
        this.$q.notify({
          type: "negative",
          position: "top",
          message: this.mapErrors[entry.failedPropValidation],
        });
      });
    },
  },
};
</script>

<style scoped>
.btn-dialog {
  margin: 0 0 0 5rem;
}
</style>
