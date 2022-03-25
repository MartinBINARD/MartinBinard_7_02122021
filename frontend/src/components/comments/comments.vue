<template>
  <!-- start of comment bar -->
  <div class="comment">
    <div class="comment__bar">
      <div class="comment__bar__content">
        <div v-if="postInfo.user.avatar" class="avatar">
          <img :src="postInfo.user.avatar" alt="user avatar" />
        </div>
        <div v-else class="avatar"><i class="far fa-user"></i></div>
        <form>
          <input
            v-model="comment"
            :id="`comment_${postInfo.post_id}`"
            class="comment-input"
            type="text"
            placeholder="Add a comment..."
            required
          />
        </form>
      </div>
      <div class="comment__bar__footer">
        <div
          v-if="comment"
          @click="createComment(postInfo.post_id)"
          class="post-button"
        >
          Post
        </div>
      </div>
    </div>
    <!-- end of comment bar -->
    <!-- start of comment thread -->
    <div v-if="commentInfos" class="comment-area">
      <div
        v-for="commentInfo in commentInfos"
        :key="commentInfo.comment_id"
        class="comment__thread"
      >
        <div v-if="commentInfo.user.avatar" class="avatar">
          <img :src="commentInfo.user.avatar" alt="user avatar" />
        </div>
        <div v-else class="avatar"><i class="far fa-user"></i></div>
        <div class="container">
          <div class="container__content">
            <div class="user">
              <div class="user__name">
                {{ commentInfo.user.firstname }} {{ commentInfo.user.lastname }}
              </div>
              <div class="user__time-stamp">{{ commentInfo.createdAt }}</div>
            </div>
            <p class="text">{{ commentInfo.text }}</p>
          </div>
          <div class="container__footer">
            <div class="react">
              <div
                @click.prevent="likeComment(commentInfo.comment_id)"
                class="react__like-button"
              >
                <i class="far fa-thumbs-up foward"></i>
                <!-- <i class="far fa-thumbs-up backward"></i> -->
              </div>
              <div class="react__like-count">
                {{ commentInfo.comment_like }}
              </div>
            </div>
            <div class="react">
              <div
                @click.prevent="dislikeComment(commentInfo.comment_id)"
                class="react__dislike-button"
              >
                <i class="far fa-thumbs-down foward"></i>
                <!-- <i class="far fa-thumbs-up backward"></i> -->
              </div>
              <div class="react__dislike-count">
                {{ commentInfo.comment_dislike }}
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="isAllowedToCommentMenu(commentInfo.user_id)"
          class="menu-comment"
        >
          <div
            @click="toggleCommentMenu(commentInfo.comment_id)"
            class="menu-comment__button"
            :class="{
              'menu-comment__button--active': clicked(commentInfo.comment_id),
            }"
          >
            ...
          </div>
          <div
            v-if="clicked(commentInfo.comment_id)"
            @click="toggleCommentMenu(0)"
            class="overlay-menu"
          ></div>
          <ul v-if="clicked(commentInfo.comment_id)" class="menu-comment__list">
            <li class="menu-comment__select">
              <div @click="deleteComment(commentInfo.comment_id)" class="name">
                Delete
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- end of comment thread -->
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "Comments",
  props: ["postInfo", "post_id", "reloadComment"],
  data() {
    return {
      comment: "",
      commentInfos: null,
      visibleCommentMenu: false,
    };
  },
  async mounted() {
    try {
      let headers = {
        "content-type": "application/json",
        authorization: "bearer " + localStorage.getItem("token"),
      };

      let getCommentContent = await Axios.get(
        `http://localhost:3001/api/comment/${this.post_id}`,
        {
          headers,
        }
      );
      this.commentInfos = getCommentContent.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    toggleCommentMenu(comment_id) {
      this.visibleCommentMenu = comment_id;
    },
    clicked(comment_id) {
      if (this.visibleCommentMenu === comment_id) {
        return true;
      } else {
        return false;
      }
    },
    isAllowedToCommentMenu(user_id) {
      let userConnected = localStorage.getItem("userId");
      let adminUser = localStorage.getItem("admin");
      if (adminUser === "true" || userConnected == user_id) {
        console.log(adminUser + " - " + user_id + " - " + userConnected);
        return true;
      } else {
        return false;
      }
    },
    async createComment(post_id) {
      try {
        let data = {
          text: document.getElementById("comment_" + post_id).value,
        };

        let headers = {
          "content-type": "application/json",
          authorization: "bearer " + localStorage.getItem("token"),
        };

        if (this.comment != "") {
          await Axios.post(
            `http://localhost:3001/api/comment/${post_id}`,
            data,
            { headers }
          );
        }
        this.reloadComment();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteComment(comment_id) {
      try {
        let headers = {
          "content-type": "application/json",
          authorization: "bearer " + localStorage.getItem("token"),
        };

        await Axios.delete(`http://localhost:3001/api/comment/${comment_id}`, {
          headers,
        });
        this.reloadComment();
      } catch (error) {
        console.error(error);
      }
    },
    async likeComment(comment_id) {
      try {
        let headers = {
          "content-type": "application/json",
          authorization: "bearer " + localStorage.getItem("token"),
        };
        await Axios.put(
          `http://localhost:3001/api/comment/${comment_id}/like/1`,
          {},
          {
            headers,
          }
        );
        this.reloadComment();
      } catch (error) {
        console.error(error);
      }
    },
    async dislikeComment(comment_id) {
      try {
        let headers = {
          "content-type": "application/json",
          authorization: "bearer " + localStorage.getItem("token"),
        };
        await Axios.put(
          `http://localhost:3001/api/comment/${comment_id}/like/-1`,
          {},
          {
            headers,
          }
        );
        this.reloadComment();
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
$color-quinary: white;
$color-senary: #ffd7d7;
$border-card: 25px;

%shadow-card {
  box-shadow: 1px 5px 8px rgb(0, 0, 0, 0.1);
}

.comment {
  margin: 0 0.5rem;
}

.comment,
.comment__bar {
  display: flex;
  flex-direction: column;
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    .avatar {
      font-size: 40px;
      margin: 0 0.5rem;
      img {
        border-radius: 100px;
        border: 2px solid $color-secondary;
        width: 55px;
      }
    }
    form,
    input {
      width: 100%;
    }
    input {
      padding: 0.5rem 1rem;
      border-radius: 100px;
    }
  }
  &__footer {
    padding: 0.5rem 3.2rem;
    .post-button {
      background-color: $color-secondary;
      color: $color-tertiary;
      width: 4rem;
      padding: 0.35rem;
      font-weight: bold;
      border-radius: 100px;
      text-align: center;
      @extend %shadow-card;
      cursor: pointer;
      &:hover {
        filter: brightness(90%);
      }
    }
  }
}

.comment-area,
.comment__thread,
.container,
.user,
.container__footer {
  display: flex;
}

.comment-area {
  flex-direction: column-reverse;
  .comment__thread {
    margin: 1rem 0;
    .avatar {
      font-size: 30px;
      margin: 0 0.2rem 0 0;
      img {
        border-radius: 100px;
        border: 2px solid $color-secondary;
        width: 45px;
      }
    }
    .menu-comment {
      position: relative;
      &__button {
        font-size: 30px;
        font-weight: bold;
        height: 1.5rem;
        line-height: 0.1rem;
        padding: 0.2rem 0.5rem;
        margin: 0 0.3rem;
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
        top: 2rem;
        right: 1rem;
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
  }
}

.container,
.container__content {
  flex-direction: column;
  width: 100%;
}

.container__content {
  background-color: $color-senary;
  border-radius: $border-card;
  padding: 1rem;
  .user {
    justify-content: space-between;
    margin-bottom: 1rem;
  }
}

.container__footer {
  margin: 0.3rem 1rem;
  align-items: center;
  .react {
    display: flex;
    margin-right: 1rem;
    &__like-button,
    &__dislike-button {
      margin-right: 0.2rem;
      &:hover {
        cursor: pointer;
      }
    }
  }
}

.user {
  display: flex;
  flex-wrap: wrap;
}
</style>
