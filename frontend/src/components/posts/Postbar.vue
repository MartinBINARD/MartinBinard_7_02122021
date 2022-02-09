<template>
  <section>
    <!-- Start of post bar -->
    <div class="postbar">
      <div class="postbar__card">
        <div class="postbar__card__avatar"><i class="far fa-user"></i></div>
        <div class="postbar__card__content">
          <p @click="togglePost()">Start your post...</p>
        </div>
      </div>
    </div>
    <!-- End of post bar -->
    <postthread :key="reloadPostThread"></postthread>
    <postwindow :reloadThread="reloadThread" :visiblePost="visiblePost" :togglePost="togglePost"></postwindow>
  </section>
</template>

<script>
import Postthread from './Postthread.vue';
import Postwindow from './Postwindow.vue';

export default {
  name: 'Postbar',
  components: { Postwindow, Postthread },
  data () {
    return {
      visiblePost: false,
      reloadPostThread: 0
    }
  },
  methods: {
    togglePost () {
      this.visiblePost = !this.visiblePost;
    },
    reloadThread () {
      this.reloadPostThread++;
    }
  }
};
</script>

<style lang="scss">
$color-primary: #1daba7;
$color-secondary: #f6f6f6;
$color-quaternary: #dadada;
$border-card: 25px;

%shadow-card {
    box-shadow: 1px 5px 8px rgb(0, 0, 0, 0.1);
}

// start of styling post bar
.postbar {
  z-index: 1;
  display: flex;
  justify-content: center;
  padding-top: 5rem;
  &__card {
    display: flex;
    justify-content: center;
    background-color: $color-secondary;
    padding: 1rem;
    width: 50%;
    border-radius: $border-card;
    @extend %shadow-card;
    &__content {
      width: 100%;
      p {
        width: 100%;
        padding: 1.3rem;
        font-size: 20px;
        border-radius: 100px;
        border: 2px solid black;
        background: white;
        &:hover {
          background-color: $color-quaternary;
          cursor: pointer;
        }
      }
    }
    &__avatar, .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 48px;
      width: 4.4rem;
      height: 4rem;
      margin: 0.4rem;
      border-radius: 1000px;
      border: 1px solid black;
    }
  }
}

.postbar__card__content {
  display: flex;
  align-items: center;
}
// End of styling post bar

@media screen and (max-width: 768px) {
  .postbar__card, .thread__card, .message-thread {
    width: 65%;
  }
}

@media screen and (max-width: 425px) {
  .postbar__card, .thread__card, .message-thread {
    width: 93%;
  }
}

</style>