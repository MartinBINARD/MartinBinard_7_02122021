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
              <input v-model="email" class="form-control" type="email" placeholder="Email" required/>
            </div>
            <div class="signup__form__field">
              <input v-model="password" class="form-control" type="password" placeholder="Password" required/>
            </div>
            <button @click="signUp()" class="button" :class="{'button--disabled' : !correctForm}" type="submit">Signup</button>
        </form>
        
        <router-link class="link__button" to="/login">Login</router-link>

    </div>
  </div>
</template>

<script>
import SubmitLogo from '@/components/Submit-logo.vue';
// import axios from 'axios';

export default {
  data () {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    }
  },
  computed: {
    correctForm: function () {
      if (this.firstname!='' && this.lastname!='' && this.email!='' && this.password!='') {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    // async signUp () {
    //   const data = {
    //     firstname: this.firstname,
    //     lastname: this.lastname,
    //     email: this.email,
    //     password: this.password
    //   };
    
    //   await axios.post('http://localhost:3001/api/auth/signup', data)
    //     .then(response => {
    //       console.log(response);
    //     })
    //     .catch(error => {
    //     console.log(error);
    //     })
    // }
    signUp: function () {
      this.$store.dispatch('signUp', {
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

.signup__form__field {
    padding: 15px;
}

.link__button {
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
