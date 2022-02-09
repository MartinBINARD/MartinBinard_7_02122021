<template>
  <div id="submit">
    <Submit-logo/>

    <div class="user__card">
      <h1 v-if="mode == 'createAccount'" class="user__card__title">Sign up now !</h1>
      <h1 v-else class="user__card__title">Log in</h1>
      <form class="submit-form">
        <div class="submit-form__field">
          <input v-if="mode == 'createAccount'" v-model="firstname" class="form-control" type="text" placeholder="Firstname" required/>
        </div>
        <div class="submit-form__field">
          <input v-if="mode == 'createAccount'" v-model="lastname" class="form-control" type="text" placeholder="Lastname" required/>
        </div>
        <div class="submit-form__field">
          <input v-model="email" class="form-control" type="email" placeholder="Email" required/>
        </div>
        <div class="submit-form__field">
          <input v-model="password" class="form-control" type="password" placeholder="Password" required/>
        </div>
        <button v-if="mode == 'createAccount'" @click.prevent="signUp()" class="button" :class="{'button--disabled' : !correctForm}" type="submit">Sign up</button>
        <button v-else  @click.prevent="login()" class="button" :class="{'button--disabled' : !correctForm}" type="submit">Log in</button>
      </form>
      <div v-if="mode == 'createAccount'" @click.prevent="switchToLogin" class="link__button">Log in</div>
      <div v-else @click.prevent="switchToSignup()" class="link__button">Create an account</div>
    </div>

  </div>
</template>

<script>
import SubmitLogo from '@/components/Submit-logo.vue';
import Axios from 'axios';

export default {
  data () {
    return {
      mode: 'createAccount',
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    }
  },
  components: {SubmitLogo},
  computed: {
    correctForm () {
      if(this.mode == 'createAccount') {
        if (this.firstname!='' && this.lastname!='' && this.email!='' && this.password!='') {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email!='' && this.password!='') {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  methods: {
    switchToLogin () {
      this.mode = 'login'
    },
    switchToSignup () {
      this.mode = 'createAccount'
    },
    async signUp () {
      
      const data = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password
      };
      
      if (this.firstname!='' && this.lastname!='' && this.email!='' && this.password!='') {        
        await Axios.post('http://localhost:3001/api/auth/signup', data);
        this.switchToLogin();
      }
    },
    async login () {
      try {
        const data = {
          email: this.email,
          password: this.password
        };

        const res = await Axios.post('http://localhost:3001/api/auth/login', data);
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('userId', res.data.userId)
        await this.$router.push('/');
      } catch (error) {
        console.error(error);
      }

      }
  }
}
</script>

<style scoped lang="scss">
$color-primary: #1daba7;
$color-secondary: #f6f6f6;
%shadow-card {
    box-shadow: 1px 5px 8px rgb(0, 0, 0, 0.1);
};

.user__card {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: $color-secondary;
  margin: 1rem;
  border-radius: 1.5rem;
  padding: 1rem 0;
  @extend %shadow-card;
  &__title {
  text-align: center;
  }
}

.submit-form__field {
  padding: 15px;
}

.link__button {
  background-color: white;
  color: $color-primary;
  width: 12rem;
  margin: 1rem;
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

</style>