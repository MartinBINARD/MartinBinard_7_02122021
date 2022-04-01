<template>
  <div class="container-react">
    <div class="react">
      <div @click.prevent="likePost(postInfo.post_id)" class="react__button-like">
        <i class="fas fa-thumbs-up"></i>
      </div>
      <div class="react__like-count">{{ postInfo.post_like }}</div>
    </div>
    <div class="react">
      <div @click.prevent="dislikePost(postInfo.post_id)" class="react__button-dislike">
        <i class="fas fa-thumbs-down"></i>
      </div>
      <div class="react__dislike-count">{{ postInfo.post_dislike }}</div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "Likesdislikesposts",
  props: ["postInfoData", "post_id"],
  data() {
    return {
      postInfo: this.postInfoData
    };
  },
  methods: {
    async likePost(post_id) {
      try {
        let headers = {
          "content-type": "application/json",
          authorization: "bearer " + localStorage.getItem("token"),
        };
        let postInfoDataLike = await Axios.put(
          `http://localhost:3001/api/post/${post_id}/like/1`,
          {},
          {
            headers,
          }
        );
        this.postInfo = postInfoDataLike.data;
      } catch (error) {
        console.error(error);
      }
    },
    async dislikePost(post_id) {
      try {
        let headers = {
          "content-type": "application/json",
          authorization: "bearer " + localStorage.getItem("token"),
        };
        let postInfoDataLike = await Axios.put(
          `http://localhost:3001/api/post/${post_id}/like/-1`,
          {},
          {
            headers,
          }
        );
        this.postInfo = postInfoDataLike.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$color-warning: #f44336;
$color-like: #3f51b5;

.react {
  display: flex;
  align-items: center;
  font-weight: bold;
  margin: 0 0.5rem;
  &__button-like,
  &__button-dislike {
    cursor: pointer;
    .fa-thumbs-up,
    .fa-thumbs-down {
      font-size: 25px;
      margin: 0 0.5rem;
    }
  }
}
</style>