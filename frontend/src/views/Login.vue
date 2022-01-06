<template>
    <body>
        <div class="logo">
            <h1>Groupomania</h1>
            <!-- <img src="../assets/icon-left-font-monochrome-white.png" alt="groupomania-logo"> -->
        </div>
        <Login/>
    </body>
</template>

<script>
import Login from '@/components/Login.vue'

export default {
  name: 'Login',
  components: {
    Login
  }
}
</script>

<style scoped lang="scss">

</style>