<template>
  <router-view />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Ubuntu&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@1,300&display=swap");

$color-primary: #122542;
$color-secondary: #d1515a;
$color-tertiary: #f6f6f6;
$color-senary: #ffd7d7;

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: "Ubuntu", sans-serif, Arial, Helvetica, sans-serif;
  background-color: $color-primary;
  max-width: 100%;
}

a,
li {
  font-size: 16px;
  font-weight: bold;
  list-style: none;
  color: initial;
  text-decoration: none;
}

img {
  width: 100%;
  object-fit: cover;
}

button,
input {
  font-size: 20px;
}

input,
textarea {
  border-radius: 10px;
  padding-left: 0.5rem;
  outline: none;
  border: 2px solid black;
  background-color: transparent;
  transition: background-color ease 0.3s;
  &:focus {
    border: 2px solid $color-secondary;
    background-color: $color-senary;
  }
}

input:focus::placeholder,
textarea:focus::placeholder {
  color: transparent;
}

input::placeholder,
textarea::placeholder {
  color: grey;
  transition: color ease 0.3s;
}

button {
  border-radius: 10px;
  cursor: pointer;
}

.button {
  padding: 0.8rem 2.5rem;
  margin: 0.5rem 0 0 1rem;
  background-color: $color-secondary;
  color: $color-tertiary;
  font-weight: bold;
  &:hover {
    filter: brightness(90%);
  }
}

.button--disabled {
  filter: brightness(80%);
  background-color: $color-secondary;
  &:hover {
    cursor: not-allowed;
    filter: brightness(70%);
  }
}

.user__time-stamp,
.user__time-status {
  font-style: italic;
}

.user__time-status {
  background-color: $color-senary;
  padding: 0.2rem 0.4rem;
  width: max-content;
  border-radius: 5px;
}
</style>
