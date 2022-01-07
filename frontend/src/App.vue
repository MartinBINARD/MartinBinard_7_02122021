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

input:focus {
  outline: none !important;
  border: 2px solid #1daba7;
}

button {
  border-radius: 10px;
}
</style>
