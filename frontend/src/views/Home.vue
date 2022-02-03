<template>
  <div class="home">
    <Navbar/>
    <Postbar/>
  </div>
</template>

<script>
import Navbar from '@/components/navbar/Navbar.vue';
import Postbar from '@/components/posts/Postbar.vue';

export default {
  name: 'Home',
  components: {Navbar, Postbar}
}
</script>

<style scoped>

</style>