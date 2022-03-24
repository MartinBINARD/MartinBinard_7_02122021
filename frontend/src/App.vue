<template>
    <router-view/>
</template>

<style lang="scss">
$color-primary: #122542;
$color-secondary: #d1515a;
$color-tertiary: #f6f6f6;

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: $color-primary;
  max-width: 100%;
}

a, li {
  font-size: 16px;
  font-weight: bold;
  list-style: none;
  color: initial;
  text-decoration: none;
}

img {
  max-width: 100%;
  object-fit: cover;
}

button, input {
  font-size: 20px;
}

input, textarea {
  border-radius: 10px;
  padding-left: 0.5rem;
  &:focus {
    outline: none !important;
    border: 3px solid $color-secondary;
  }
}

button {
  border-radius: 10px;
  cursor: pointer;
}

.button {
    padding: 0.8rem 2.5rem;
    margin-left: 1rem;
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
</style>
