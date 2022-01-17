<template>
  <div id="submit">
    <Submit-logo/>

    <div class="user__form">
      
      <form class="login__form">
        <div class="tabs__login">
          <div class="login__form__field">
            <input v-model="email" class="form-control" type="email" placeholder="Email" required/>
          </div>
          <div class="login__form__field">
            <input v-model="password" class="form-control" type="password" placeholder="Password" required/>
          </div>
          <button @click="login()" class="button" :class="{'button--disabled' : !correctForm}" type="submit">Login</button>
        </div>
      </form>
      
      <router-link class="link__button" to="/signup">Create an account</router-link>

    </div>
  </div>
</template>

<script>
import SubmitLogo from "@/components/Submit-logo.vue";
import axios from 'axios';

export default {
    data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    correctForm: function () {
      if (this.email!='' && this.password!='') {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    async login () {
      const data = {
        email: this.email,
        password: this.password,
        token: this.token
      };
    
      await axios.post('http://localhost:3001/api/auth/login', data)
        .then(response => {
          console.log(response);
          localStorage.setItem('token', JSON.stringify(response.data));
        })
        .catch(error => {
        console.log(error);
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
  height: 22rem;
  padding: 2rem;
  margin: 2rem;
}

.login__form__field {
    padding: 15px;
}

.link__button {
  background-color: white;
  color: #1daba7;
  height: 3rem;
  width: 12rem;
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
