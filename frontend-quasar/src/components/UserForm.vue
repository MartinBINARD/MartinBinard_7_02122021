<template>
  <q-card class="q-ma-sm q-pa-sm secondary" flat bordered>
    <div class="row wrap">
      <q-item-section class="q-my-sm q-ml-md" avatar>
        <!-- <q-avatar v-if="userData.avatar" class="avatar">
          <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
        </q-avatar> -->
        <q-avatar class="avatar" rounded-borders>
          <q-img src="../assets/default-tux-avatar.png" />
        </q-avatar>
        <user-avatar-dialog />
      </q-item-section>

      <q-item-section>
        <q-item-label
          >My Profile : {{ userData.firstName }}
          {{ userData.lastName }}</q-item-label
        >
        <q-item-label caption>
          <div>Created at : {{ formatDate(userData.createdAt) }}</div>
          <div>Update at : {{ formatDate(userData.updatedAt) }}</div>
        </q-item-label>

        <q-item-label>
          <div v-if="!userData.bio" class="q-my-md">Complete your profile</div>
        </q-item-label>
      </q-item-section>
    </div>

    <q-separator />

    <q-card-section class="q-mx-md">
      <div class="q-my-md text-h5" v-if="userData.bio">About me :</div>
      <div class="q-my-md text-h6">{{ userData.bio }}</div>

      <q-separator />

      <q-form ref="userform" @submit.stop="onUpdateProfile" @reset="onReset">
        <div class="row items-center">
          <q-input
            v-model="form.firstName"
            type="text"
            label="Firstname"
            :rules="rules.checkName"
            lazy-rules
            class="q-pr-md"
          />
          <q-input
            v-model="form.lastName"
            type="text"
            label="Lastname"
            :rules="rules.checkName"
            lazy-rules
            class="q-pr-md"
          />
        </div>
        <q-input
          v-model="form.bio"
          label="About"
          type="textarea"
          lazy-rules
          :rules="rules.checkBio"
        />

        <div>{{ userData }}</div>

        <div class="q-mt-md">
          <q-btn
            label="Update"
            type="submit"
            :loading="loading"
            color="secondary"
          />
          <q-btn
            label="Cancel"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
            :to="{ name: 'thread-posts' }"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import UserAvatarDialog from "./UserAvatarDialog";
import { mapActions } from "vuex";
import { formValidation } from "../mixins/index";
import { userData } from "../mixins";

export default {
  name: "UserForm",
  components: { UserAvatarDialog },
  mixins: [userData, formValidation],
  props: {},
  data() {
    return {
      form: {
        firstName: null,
        lastName: null,
        bio: null,
      },
      loading: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    ...mapActions("user", ["updateUser"]),
    onUpdateProfile() {
      this.loading = true;
      this.updateUser(this.form).then((res) => {
        if (201 === res.status) {
          this.loading = false;
          this.$q.notify({
            position: "top",
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Updated sucessfully",
          });
        }
      });
    },
    onReset() {
      this.form.firstName = null;
      this.form.lastName = null;
      this.form.bio = null;
    },
  },
};
</script>

<style scoped>
.avatar {
  height: 7rem;
  width: 7rem;
  border: 1px solid black;
}
</style>
