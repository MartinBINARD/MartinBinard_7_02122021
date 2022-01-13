<template>
  <body>
    <router-view/>
  </body>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: #1daba7;
  max-width: 100%;
  overflow: hidden;
}

a, li {
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

input {
  border-radius: 5px;
  &:focus {
    outline: none !important;
    border: 2px solid #1daba7;
  }
}

button {
  border-radius: 10px;
}

.button {
    padding: 0.8rem 2.5rem;
    margin-left: 1rem;
    background-color: #1daba7;
    color: white;
    font-weight: bold;
    &:hover {
      filter: brightness(90%);
    }
}

.button--disabled {
  filter: brightness(60%);
  &:hover {
    cursor: not-allowed;
    filter: brightness(60%);
  }
}
</style>
