<template>
  <div class="container-react">
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
</template>

<script>
import Axios from "axios";

export default {
  name: "LikesDislikescomments",
  props: ["commentInfoData", "comment_id"],
  data() {
    return {
      commentInfo: this.commentInfoData,
    };
  },
  methods: {
    async likeComment(comment_id) {
      try {
        let headers = {
          "content-type": "application/json",
          authorization: "bearer " + localStorage.getItem("token"),
        };
        let commentInfoDataLike = await Axios.put(
          `http://localhost:3001/api/comment/${comment_id}/like/1`,
          {},
          {
            headers,
          }
        );
        this.commentInfo = commentInfoDataLike.data;
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
        let commentInfoDataLike = await Axios.put(
          `http://localhost:3001/api/comment/${comment_id}/like/-1`,
          {},
          {
            headers,
          }
        );
        this.commentInfo = commentInfoDataLike.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container-react, .react {
  display: flex;
}

.react {
  margin-right: 1rem;
  &__like-button,
  &__dislike-button {
    margin-right: 0.2rem;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>