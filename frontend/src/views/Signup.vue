<template>
  <body id="login">
    <div class="login__logo">
      <img
        src="../assets/icon-left-font-monochrome-white.svg"
        alt="groupomania-logo"
      />
    </div>

    <div class="user__form">
      
        <form class="signup__form">
            <div class="signup__form__field">
              <input class="form-control" type="text" placeholder="Firstname" required/>
            </div>
            <div class="signup__form__field">
              <input class="form-control" type="text" placeholder="Lastname" required/>
            </div>
            <div class="signup__form__field">
              <input class="form-control" type="text" placeholder="Email" required/>
            </div>
            <div class="signup__form__field">
              <input class="form-control" type="text" placeholder="Password" required/>
            </div>
            <button class="signup__form__button" type="submit">Signup</button>
        </form>
        <button class="login__form__button">Login</button>

    </div>
  </body>
</template>

<script></script>

<style scoped lang="scss">

#login {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 10%;
}

.login__logo {
  padding-bottom: 1rem;
}

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
  width: 15rem;
  margin: 1rem;
  padding: 0.8rem;
  font-weight: bold;
  &:hover {
    filter: brightness(85%);
  }
} 

</style>
