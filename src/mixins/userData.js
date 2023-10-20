import { date } from "quasar";

const userData = {
  data() {
    return {
      user: this.$store.state.user.user,
    };
  },
  computed: {
    userData() {
      return this.$store.state.user.user;
    },
  },
  methods: {
    formatDate(value) {
      return date.formatDate(value, "MMMM Do YYYY");
    },
  },
};

export default userData;
