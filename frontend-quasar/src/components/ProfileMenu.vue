<template>
  <q-btn round>
    <q-avatar v-if="userData.avatar">
      <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
    </q-avatar>
    <q-avatar v-else>
      <img src="../assets/default-tux-avatar.png" />
    </q-avatar>

    <q-menu v-if="userData">
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md">User informations</div>
          <q-separator horizontal inset class="q-mx-lg" />
          <div class="q-my-md">
            <div v-if="userData.admin">Admin</div>
            <div v-if="!userData.active">Deactivated account</div>
            <div v-if="userData.createdAt">
              Registered since {{ formatDate }}
            </div>
          </div>
        </div>
        <q-separator vertical inset class="q-mx-lg" />
        <div class="column items-center">
          <q-avatar v-if="userData.avatar" class="avatar">
            <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
          </q-avatar>
          <q-avatar v-else>
            <img src="../assets/default-tux-avatar.png" />
          </q-avatar>
          <div class="text-subtitle1 q-mt-md q-mb-xs">
            {{ userData.firstName }} {{ userData.lastName }}
          </div>
          <q-btn
            color="secondary"
            label="Edit"
            class="q-ma-sm q-px-lg"
            :to="{ name: 'thread-user' }"
          />
          <q-btn
            color="primary"
            label="Logout"
            @click="singOut"
            v-close-popup
          />
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { date } from "quasar";

export default {
  name: "AccountSettings",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["user", "auth"]),
    userData() {
      return this.$store.state.user.user;
    },
    formatDate() {
      return date.formatDate(this.userData.createdAt, "MMMM d YYYY");
    },
  },
  watch: {},
  created() {
    console.log("store user", this.$store.state.user);
  },
  methods: {
    ...mapActions("user", ["disconnectUser"]),
    singOut() {
      this.disconnectUser().then((res) => {
        if (200 === res.status) {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Logout successful",
          });
        }
      });
      this.$router.push({ name: "submit-login" });
    },
  },
};
</script>

<style scoped>
.avatar {
  height: 4rem;
  width: 4rem;
}
</style>
