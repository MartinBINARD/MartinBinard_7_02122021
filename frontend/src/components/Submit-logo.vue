<template>
  <div class="submit__logo">
    <img
      src="../assets/icon-left-font-monochrome-white.svg"
      alt="groupomania-logo"
    />
  </div>
</template>

<script>
export default {
    name: "SubmitLogo"
}
</script>

<style lang="scss">
#submit {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 10%;
}

.submit__logo {
  padding-bottom: 1rem;
}
</style>