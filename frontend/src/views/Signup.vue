<template>
  <div id="submit">
    <Submit-logo/>

    <div class="user__form">
      
        <form class="signup__form">
            <div class="signup__form__field">
              <input v-model="firstname" class="form-control" type="text" placeholder="Firstname" required/>
            </div>
            <div class="signup__form__field">
              <input v-model="lastname" class="form-control" type="text" placeholder="Lastname" required/>
            </div>
            <div class="signup__form__field">
              <input v-model="email" class="form-control" type="text" placeholder="Email" required/>
            </div>
            <div class="signup__form__field">
              <input v-model="password" class="form-control" type="text" placeholder="Password" required/>
            </div>
            <button @click="signUp()" class="signup__form__button" type="submit">Signup</button>
        </form>
        
        <router-link class="login__form__button" to="/login">Login</router-link>

    </div>
  </div>
</template>

<script>
import SubmitLogo from "@/components/Submit-logo.vue";

export default {
  name: 'Signup',
  data : function() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signUp: function () {
      this.$store.dispatch('singUp', {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password
      })
    }
  },
  components: {SubmitLogo}
}
</script>

<style scoped lang="scss">
.user__form {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: #f6f6f6;
  border-radius: 1.5rem;
  width: 40rem;
  height: 28rem;
  padding: 2rem;
}

.signup__form {
    &__field {
    padding: 15px;
  }

  &__button {
    padding: 0.8rem 2.5rem;
    margin-left: 1rem;
    background-color: #1daba7;
    color: white;
    font-weight: bold;
    &:hover {
      filter: brightness(90%);
    }
  }
}

.login__form__button {
  background-color: white;
  color: #1daba7;
  height: 3rem;
  width: 10rem;
  margin: 1rem;
  padding: 0.8rem;
  font-weight: bold;
  border: 2px black solid;
  border-radius: 10px;
  text-align: center;
  &:hover {
    filter: brightness(85%);
  }
} 

</style>
