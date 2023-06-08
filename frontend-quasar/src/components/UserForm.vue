<template>
  <q-card class="q-ma-sm q-pa-xl secondary" flat bordered>
    <q-item>
      <q-item-section avatar>
        <!-- <q-avatar v-if="userData.avatar" class="avatar">
          <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
        </q-avatar> -->
        <q-avatar class="avatar-size">
          <img src="../assets/default-tux-avatar.png" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>My Profile</q-item-label>
        <q-item-label caption> Subhead </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section horizontal>
      <q-card-section>
        {{ lorem }}
      </q-card-section>

      <q-separator vertical></q-separator>

      <q-card-section class="col-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "UserForm",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {},
};
</script>

<style scoped>
.avatar-size {
  height: 100px;
  width: auto;
}
</style>
