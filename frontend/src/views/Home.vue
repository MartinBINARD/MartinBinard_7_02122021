<template>
  <div class="home">
    <Navbar/>
    <Postbar/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Postbar from '@/components/Postbar.vue';

export default {
  name: 'Home',
  components: {Navbar, Postbar}
}
</script>

<style scoped>

</style>