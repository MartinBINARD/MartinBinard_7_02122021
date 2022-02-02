<template>
  <section>
    <!-- Start of post bar -->
    <div class="postbar">
      <div class="postbar__card">
        <div class="postbar__card__avatar"><i class="far fa-user"></i></div>
        <div class="postbar__card__content">
          <p @click="togglePost">Insert your post...</p>
        </div>
      </div>
    </div>
    <!-- End of post bar -->
    <postwindow :visiblePost="visiblePost" :togglePost="togglePost"></postwindow>
    <postflow></postflow>
  </section>
</template>

<script>
import Postflow from './Postflow.vue';
import Postwindow from './Postwindow.vue';

export default {
  name: 'Postbar',
  components: { Postwindow, Postflow },
  data () {
    return {
      visiblePost: false
    }
  },
  methods: {
    togglePost () {
      this.visiblePost = !this.visiblePost;
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
.postbar, .stream {
  z-index: 1;
  display: flex;
  justify-content: center;
  align-content: center;
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
        padding: 0.7rem 1rem;
        border-radius: 100px;
        border: 2px solid black;
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
      font-size: 35px;
      width: 50px;
      height: 50px;
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
  .postbar__card, .stream__card, .message-stream {
    width: 65%;
  }
}

@media screen and (max-width: 425px) {
  .postbar__card, .stream__card, .message-stream {
    width: 93%;
  }
}

</style>