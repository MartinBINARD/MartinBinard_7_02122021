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
        <q-item-label caption>
          <div>Complete your profile</div>
          <div>Created at : {{ formatDate(userData.createdAt) }}</div>
          <div>Update at : {{ formatDate(userData.updatedAt) }}</div>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section class="q-mx-md">
      <q-form>
        <div class="row items-center">
          <q-input
            v-model="userData.firstName"
            label="Firstname"
            class="q-pr-md"
          />
          <q-input
            v-model="userData.lastName"
            label="Lastname"
            class="q-pr-md"
          />
        </div>
        <q-input label="About" type="textarea"></q-input>

        <div>{{ userData }}</div>

        <div class="q-mt-md">
          <q-btn label="Save" type="submit" color="secondary"></q-btn>
          <q-btn
            label="Cancel"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
            :to="{ name: 'thread-posts' }"
          ></q-btn>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { userData } from "../mixins";

export default {
  name: "UserForm",
  components: {},
  mixins: [userData],
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
