<template>
  <div id="submit">
    <Submit-logo />

    <div class="user__card">
      <h1 v-if="mode == 'createAccount'" class="user__card__title">Sign up now !</h1>
      <h1 v-else class="user__card__title">Log in</h1>
      <form class="submit-form">
        <div class="submit-form__field">
          <input
            v-if="mode == 'createAccount'"
            v-model="firstname"
            class="form-control"
            type="text"
            placeholder="Firstname"
            required
            autofocus
            autocomplete="false"
          />
          <div
            v-if="mode == 'createAccount' && error.firstname != null"
            class="error"
          >{{ error.firstname }}</div>
        </div>
        <div class="submit-form__field">
          <input
            v-if="mode == 'createAccount'"
            v-model="lastname"
            class="form-control"
            type="text"
            placeholder="Lastname"
            required
            autofocus
            autocomplete="false"
          />
          <div
            v-if="mode == 'createAccount' && error.lastname != null"
            class="error"
          >{{ error.lastname }}</div>
        </div>
        <div class="submit-form__field">
          <input
            v-model="email"
            class="form-control"
            type="email"
            placeholder="Email"
            required
            autofocus
            autocomplete="false"
          />
          <div v-if="mode == 'createAccount' && error.email != null" class="error">{{ error.email }}</div>
        </div>
        <div class="submit-form__field">
          <input
            v-model="password"
            class="form-control"
            type="password"
            placeholder="Password"
            required
            autofocus
            autocomplete="false"
          />
          <div
            v-if="mode != 'createAccount' && error.password != null"
            class="error"
          >{{ error.password }}</div>
          <div
            v-if="mode == 'createAccount' && error.database != null"
            class="error"
          >{{ error.database }}</div>
        </div>
        <div v-if="mode == 'createAccount'" class="submit-form__field">
          <input
            v-model="passwordCheck"
            class="form-control"
            type="password"
            placeholder="Confirm password"
            required
            autofocus
            autocomplete="false"
          />
          <div
            v-if="mode == 'createAccount' && error.passwordCheck != null"
            class="error"
          >{{ error.passwordCheck }}</div>
        </div>
        <div v-if="error.serverResponse != null" class="error">{{ error.serverResponse }}</div>
        <button
          v-if="mode == 'createAccount'"
          @click.prevent="signUp()"
          class="button"
          :class="{ 'button--disabled': !correctForm }"
          type="submit"
        >Sign up</button>
        <button
          v-else
          @click.prevent="login()"
          class="button"
          :class="{ 'button--disabled': !correctForm }"
          type="submit"
        >Log in</button>
      </form>
      <div
        v-if="mode == 'createAccount'"
        @click.prevent="switchToLogin()"
        class="link__button"
      >Log in</div>
      <div v-else @click.prevent="switchToSignup()" class="link__button">Create an account</div>
    </div>
  </div>
</template>

<script>
import SubmitLogo from "@/components/Submit-logo.vue";
import Axios from "axios";

export default {
  data() {
    return {
      mode: "createAccount",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordCheck: "",
      error: {
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        passwordCheck: null,
        serverResponse: null,
      },
      validForm: false,
    };
  },
  components: { SubmitLogo },
  computed: {
    correctForm() {
      if (this.mode == "createAccount") {
        if (
          this.firstname != "" &&
          this.lastname != "" &&
          this.email != "" &&
          this.password != "" &&
          this.passwordCheck != ""
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  methods: {
    switchToLogin() {
      this.mode = "login";
    },
    switchToSignup() {
      this.mode = "createAccount";
    },
    formCheck() {
      let firstnameRegexp = new RegExp("^[A-Za-zÀ-ú]{3,30}$");
      let lastnameRegexp = new RegExp("^[A-Za-zÀ-ú]{3,30}$");
      let emailRegexp = new RegExp(
        "^(([^<>()[].,;:s@]+(.[^<>()[].,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$"
      );
      let validFirstname = firstnameRegexp.test(this.firstname);
      let validLastname = lastnameRegexp.test(this.lastname);
      let validEmail = emailRegexp.test(this.email);

      if (this.mode == "createAccount") {
        if (!validFirstname) {
          this.error.firstname =
            "Invalid firstname, mininum 3 letters, accents are allowed !";
        }
        if (!validLastname) {
          this.error.lastname =
            "Invalid lastname, mininum 3 letters, accents are allowed !";
        }
        if (!validEmail) {
          this.error.email = "Invalid email !";
        }
        if (this.password != this.passwordCheck) {
          this.error.passwordCheck = "Password do not match !";
        }

        if (
          validFirstname &&
          validLastname &&
          validEmail &&
          // validPassword &&
          this.password == this.passwordCheck
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    async signUp() {
      try {
        const data = {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
        };
        this.error.firstname = null;
        this.error.lastname = null;
        this.error.email = null;
        this.error.password = null;
        this.error.passwordCheck = null;
        this.error.serverResponse = null;

        if (this.formCheck()) {
          await Axios.post(`http://localhost:${process.env.VUE_APP_API_PORT}/api/auth/signup`, data);
          this.switchToLogin();
        }
      } catch (error) {
        this.error.serverResponse = error.response.data.message;
      }
    },
    async login() {
      try {
        const data = {
          email: this.email,
          password: this.password,
        };

        const res = await Axios.post(
          `http://localhost:${process.env.VUE_APP_API_PORT}/api/auth/login`,
          data
        );
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("admin", res.data.admin);
        await this.$router.push("/");
      } catch (error) {
        this.error.serverResponse = error.response.data.message;
      }
    },
  },
};
</script>

<style scoped lang="scss">
$color-primary: #122542;
$color-tertiary: #f6f6f6;
$color-warning: #f44336;
%shadow-card {
  box-shadow: 1px 5px 8px rgb(0, 0, 0, 0.1);
}

#submit {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin: 5%;
}

.user__card {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: $color-tertiary;
  height: 42rem;
  margin: 1rem;
  border-radius: 1.5rem;
  padding: 1rem 0;
  @extend %shadow-card;
  &__title {
    text-align: center;
    margin-bottom: 1rem;
  }
}

.submit-form__field {
  padding: 10px 15px;
}

.error {
  font-weight: bold;
  color: white;
  background-color: $color-warning;
  border-radius: 5px;
  padding: 0.1rem 1rem;
  margin: 0.5rem auto;
  overflow-wrap: break-all;
  max-width: 17.2rem;
}

.link__button {
  background-color: $color-tertiary;
  color: $color-primary;
  width: 12rem;
  margin: 0.5rem 0 0 1rem;
  padding: 0.8rem;
  font-weight: bold;
  border: 2px black solid;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  &:hover {
    filter: brightness(90%);
  }
}

@media screen and (max-height: 770px) {
  #submit {
    margin: 0 5%;
    .submit__logo {
      padding: 0.25rem;
    }
    .user__card {
      margin: 0 1rem;
      .submit-form__field {
        padding: 4px 15px;
      }
    }
  }
}
</style>
