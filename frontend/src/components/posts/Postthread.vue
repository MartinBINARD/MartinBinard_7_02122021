<template>
  <div class="thread">
    <div v-if="postInfos != null" class="container">
      <div
        v-for="postInfo in postInfos"
        :key="postInfo.post_id"
        class="thread__card"
      >
        <div class="thread__card__header">
          <div class="id-card">
            <div class="avatar"><i class="far fa-user"></i></div>
            <div class="user">
              <div class="user__name">
                {{ postInfo.user.firstname }} {{ postInfo.user.lastname }}
              </div>
              <div class="user__time-stamp">{{ postInfo.createdAt }}</div>
            </div>
          </div>
          <div @click="deletePost()" class="delete-post">Delete</div>
        </div>
        <div class="thread__card__content">
          <h2 class="title">{{ postInfo.title }}</h2>
          <div v-if="postInfo.image" class="image">
            <img :src="postInfo.image" alt="post image" />
          </div>
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
import Comments from "../comments/comments.vue";

export default {
  components: { Comments },
  name: "Postthread",
  props: ["userInfo"],
  data() {
    return {
      postInfos: null,
    };
  },
  async mounted() {
    try {
      let headers = {
        "content-type": "application/json",
        authorization: "bearer " + localStorage.getItem("token"),
      };

      let getPostContent = await Axios.get(`http://localhost:3001/api/post`, {
        headers,
      });
      this.postInfos = getPostContent.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async deletePost() {
      try {
        let headers = {
          "content-type": "application/json",
          authorization: "bearer " + localStorage.getItem("token"),
        };

        let getPostContent = await Axios.get(`http://localhost:3001/api/post`, {
          headers,
        });
        this.postInfos = getPostContent.data;

        // await Axios.delete(
        //   `http://localhost:3001/api/post/${this.postInfos.post_id}`,
        //   { headers }
        // );
        console.log(this.postInfos);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss">
$color-primary: #1daba7;
$color-secondary: #f6f6f6;
$color-tertiary: white;
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
      justify-content: space-between;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      padding: 0.5rem 0 0.5rem;
      .id-card {
        display: flex;
        align-items: center;
        .avatar {
          font-size: 48px;
          margin: 0 0.5rem;
        }
        .user__name {
          font-weight: bold;
        }
      }
      .delete-post {
        font-size: 16px;
        font-weight: bold;
        height: 2rem;
        padding: 0.5rem;
        line-height: 1rem;
        color: black;
        &:hover {
          background-color: $color-primary;
          border-radius: 5px;
          color: $color-tertiary;
          cursor: pointer;
        }
      }
    }
    &__content {
      margin: 1rem 0.5rem;
      .text {
        margin: 0.5rem 0;
      }
      .image {
        display: flex;
        justify-content: center;
        margin: 1rem 0;
        border-radius: $border-card;
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
