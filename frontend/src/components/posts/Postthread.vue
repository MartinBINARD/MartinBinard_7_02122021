<template>
  <div class="thread">
    <div v-if="postInfos" class="container">
      <div v-for="postInfo in postInfos" :key="postInfo.post_id" class="thread__card">
        <div class="thread__card__header">
          <div class="avatar"><i class="far fa-user"></i></div>
          <div class="user">
            <div class="user__name">user name</div>
            <div class="user__time-stamp">time stamp</div>
          </div>
        </div>
        <div class="thread__card__content">
          <h2 class="title">{{ postInfo.title }}</h2>
          <div class="image">{{ postInfo.image }}</div>
          <div class="text">{{ postInfo.text }}</div>
        </div>
        <div class="thread__card__footer">
          <div class="react"><i class="far fa-thumbs-up"></i></div>
        </div>
          <comments></comments>
      </div>
    </div>
    <div v-else class="message-thread">
      <h2>No posts available !</h2>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import Comments from '../comments/comments.vue';

export default {
  components: { Comments },
  name: "Postthread",
  data() {
    return {
      postInfos: null
    };
  },
  props: ['userInfo'],
  async mounted() {
    try {
      let headers = {
        "content-type": "application/json",
        authorization: "bearer " + localStorage.getItem("token"),
      };
      
      let getPostContent = await Axios.get(`http://localhost:3001/api/post`, { headers });
      this.postInfos = getPostContent.data;
    } catch(error) {
      console.error(error);
    }
  }
};
</script>

<style lang="scss">
$color-secondary: #f6f6f6;
$border-card: 25px;

%shadow-card {
  box-shadow: 1px 5px 8px rgb(0, 0, 0, 0.1);
}

.container {
  display: flex;
  flex-direction: column-reverse;
}

.thread {
  display: flex;
  justify-content: center;
  flex-direction: column;
  &__card {
    margin: 0.5rem auto;
    background-color: $color-secondary;
    padding: 1rem;
    width: 50%;
    border-radius: $border-card;
    @extend %shadow-card;
    &__header {
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      padding: 0.5rem 0 0.5rem;
      .avatar {
        font-size: 48px;
        margin: 0 0.5rem;
      }
      .user__name {
        font-weight: bold;
      }
    }
    &__content {
      margin: 1rem 0.5rem;
      .text {
        margin: 0.5rem 0;
      }
    }
    &__footer {
      border-top: 1px solid rgba(0, 0, 0, 0.2);
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      padding: 0.5rem 0 0.5rem;
      margin: 1.5rem 0;
      .fa-thumbs-up {
        font-size: 30px;
        margin: 0 1.5rem;
      }
    }
  }
}

.text {
  font-size: 20px;
}

.message-thread {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $color-secondary;
  height: 10rem;
  width: 50%;
  margin: 1rem auto;
  border-radius: $border-card;
  @extend %shadow-card;
}
</style>
