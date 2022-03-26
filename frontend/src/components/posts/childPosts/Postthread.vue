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
            <div v-if="postInfo.user.avatar" class="avatar">
              <img :src="postInfo.user.avatar" alt="user avatar" />
            </div>
            <div v-else class="avatar"><i class="far fa-user"></i></div>
            <div class="user">
              <div class="user__name">
                {{ postInfo.user.firstname }} {{ postInfo.user.lastname }}
              </div>
              <div class="user__time-stamp">{{ postInfo.createdAt }}</div>
              <div class="user__time-status" v-if="!postInfo.user.active">
                User deactivated
              </div>
            </div>
          </div>
          <!-- start of post menu -->
          <div v-if="isAdminOrOwner(postInfo.userUserId)" class="menu-post">
            <div
              @click="togglePostMenu(postInfo.post_id)"
              class="menu-post__button"
              :class="{
                'menu-post__button--active': clicked(postInfo.post_id),
              }"
            >
              =
            </div>
            <div
              v-if="clicked(postInfo.post_id)"
              @click="togglePostMenu(0)"
              class="overlay-menu"
            ></div>
            <ul v-if="clicked(postInfo.post_id)" class="menu-post__list">
              <li class="menu-post__list__select">
                <div @click="toggleModifyPost(postInfo.post_id)" class="name">
                  Modify
                </div>
              </li>
              <li class="menu-list__select">
                <div @click="deletePost(postInfo.post_id)" class="name">
                  Delete
                </div>
              </li>
            </ul>
          </div>
          <!-- end of post menu -->
        </div>
        <div class="thread__card__content">
          <h2 class="title">{{ postInfo.title }}</h2>
          <div v-if="postInfo.image" class="image">
            <img :src="postInfo.image" alt="post image" />
          </div>
          <div class="text">{{ postInfo.text }}</div>
        </div>
        <likedislikesposts
          :postInfo="postInfo"
          :post_id="postInfo.post_id"
          :key="reloadLikePostCounter"
          :reloadLikePost="reloadLikePost"
          class="thread__card__footer"
        >
        </likedislikesposts>
        <comments
          :postInfo="postInfo"
          :post_id="postInfo.post_id"
          :key="reloadCommentThread"
          :reloadComment="reloadComment"
        ></comments>
      </div>
    </div>
    <div v-if="postInfos == null || postInfos == false" class="message-thread">
      <h2>No posts available !</h2>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import Comments from "../../comments/comments.vue";
import Likedislikesposts from "../../likesdislikesposts/likedislikesposts.vue";

export default {
  components: { Comments, Likedislikesposts },
  name: "Postthread",
  props: ["reloadThread", "togglePost", "visiblePost", "toggleModifyPost"],
  data() {
    return {
      postInfos: null,
      visiblePostMenu: false,
      reloadCommentThread: 0,
      reloadLikePostCounter: 0,
    };
  },
  async mounted() {
    try {
      let headers = {
        "content-type": "application/json",
        authorization: "bearer " + localStorage.getItem("token"),
      };

      let getPostContent = await Axios.get(`http://localhost:3001/api/post/`, {
        headers,
      });
      this.postInfos = getPostContent.data;
    } catch (error) {
      console.error(error);
      this.postInfos = false;
    }
  },
  methods: {
    reloadComment() {
      this.reloadCommentThread++;
    },
    reloadLikePost() {
      this.reloadLikePostCounter++;
    },
    togglePostMenu(post_id) {
      this.visiblePostMenu = post_id;
    },
    clicked(post_id) {
      if (this.visiblePostMenu === post_id) {
        return true;
      } else {
        return false;
      }
    },
    isAdminOrOwner(userPost) {
      let userConnected = localStorage.getItem("userId");
      let adminUser = localStorage.getItem("admin");
      if (adminUser === "true" || userConnected == userPost) {
        console.log(adminUser + " - " + userPost + " - " + userConnected);
        return true;
      } else {
        return false;
      }
    },
    async deletePost(post_id) {
      try {
        let headers = {
          "content-type": "application/json",
          authorization: "bearer " + localStorage.getItem("token"),
        };

        await Axios.delete(`http://localhost:3001/api/post/${post_id}`, {
          headers,
        });
        this.reloadThread();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$color-primary: #122542;
$color-secondary: #d1515a;
$color-tertiary: #f6f6f6;
$border-card: 25px;

%shadow-card {
  box-shadow: 1px 5px 8px rgb(0, 0, 0, 0.4);
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
    background-color: $color-tertiary;
    padding: 1rem;
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
          img {
            border-radius: 100px;
            border: 2px solid $color-secondary;
            width: 60px;
          }
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
          background-color: $color-secondary;
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
        img {
          border-radius: $border-card;
        }
      }
    }
    &__footer {
      display: flex;
      border-top: 1px solid rgba(0, 0, 0, 0.2);
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      padding: 0.5rem 0 0.5rem;
      margin: 1.5rem 0;
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
  background-color: $color-tertiary;
  height: 10rem;
  width: 50%;
  margin: 1rem auto;
  border-radius: $border-card;
  @extend %shadow-card;
}

// Styling menu post
.menu-post {
  position: relative;
  &__button {
    font-size: 30px;
    font-weight: bold;
    height: 2rem;
    line-height: 1.5rem;
    padding: 0.2rem 0.3rem;
    border-radius: 5px;
    &:hover,
    &--active {
      background-color: $color-secondary;
      color: $color-tertiary;
      cursor: pointer;
    }
  }

  &__list {
    position: absolute;
    top: 2.5rem;
    right: 0;
    padding: 0.5rem;
    background-color: $color-tertiary;
    border-radius: 15px;
    @extend %shadow-card;
    .name {
      padding: 0.5rem;
      border-radius: 5px;
      &:hover {
        background-color: $color-secondary;
        color: $color-tertiary;
        cursor: pointer;
      }
    }
  }
}

@media screen and (max-width: 375px) {
  .thread__card {
    padding: 0.3rem;
  }
}

@media screen and (max-width: 768px) {
  .message-thread {
    width: 70%;
  }
}

@media screen and (max-width: 425px) {
  .message-thread {
    width: 93%;
  }
}
</style>
