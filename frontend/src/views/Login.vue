<template>
  <div id="submit">
    <Submit-logo/>

    <div class="user__form">
      
      <form class="login__form">
        <div class="tabs__login">
          <div class="login__form__field">
            <input class="form-control" type="text" placeholder="Email" required/>
          </div>
          <div class="login__form__field">
            <input class="form-control" type="text" placeholder="Password" required/>
          </div>
          <button class="login__form__button" type="submit">Login</button>
        </div>
      </form>
      
      <router-link class="signup__form__button" to="/signup">Create an account</router-link>

    </div>
  </div>
</template>

<script>
import SubmitLogo from "@/components/Submit-logo.vue";

export default {
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

.login__form {
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

.signup__form__button {
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
