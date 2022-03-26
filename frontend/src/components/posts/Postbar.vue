<template>
  <section>
    <!-- Start of post bar -->
    <div class="postbar">
      <div class="postbar__card">
        <div class="postbar__card__content">
          <p @click="togglePost()">Start your post...</p>
        </div>
      </div>
    </div>
    <!-- End of post bar -->
    <postthread
      :key="reloadPostThread"
      :reloadThread="reloadThread"
      :visiblePost="visiblePost"
      :toggleModifyPost="toggleModifyPost"
      :mode="mode"
    ></postthread>
    <postwindow
      :key="resetPostForm"
      :postId="postId"
      :resetForm="resetForm"
      :reloadThread="reloadThread"
      :visiblePost="visiblePost"
      :togglePost="togglePost"
      :mode="mode"
    ></postwindow>
  </section>
</template>

<script>
import Postthread from "./childPosts/Postthread.vue";
import Postwindow from "./childPosts/Postwindow.vue";

export default {
  name: "Postbar",
  components: { Postwindow, Postthread },
  data() {
    return {
      visiblePost: false,
      reloadPostThread: 0,
      resetPostForm: 0,
      mode: "postToCreate",
      postId: "0",
    };
  },
  methods: {
    togglePost() {
      this.visiblePost = !this.visiblePost;
      this.mode = "postToCreate";
    },
    toggleModifyPost(postId) {
      this.visiblePost = !this.visiblePost;
      this.mode = "postToModify";
      this.postId = postId;
    },
    reloadThread() {
      this.reloadPostThread++;
    },
    resetForm() {
      this.resetPostForm++;
    },
  },
};
</script>

<style lang="scss">
$color-primary: #122542;
$color-tertiary: #f6f6f6;
$color-senary: #ffd7d7;
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
    background-color: $color-tertiary;
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
        background: $color-tertiary;
        &:hover {
          background-color: $color-senary;
          cursor: pointer;
        }
      }
    }
  }
}

.postbar__card__content {
  display: flex;
  align-items: center;
}
// End of styling post bar

@media screen and (min-width: 768px) {
  .postbar__card,
  .thread__card {
    width: 50%;
  }
}

@media screen and (max-width: 768px) {
  .postbar__card,
  .thread__card {
    width: 70%;
  }
}

@media screen and (max-width: 425px) {
  .postbar__card,
  .thread__card {
    width: 93%;
  }
}
</style>