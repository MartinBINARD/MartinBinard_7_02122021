<template>
  <div v-if="visiblePost" class="post-window">
    <div @click="togglePost()" class="overlay"></div>

    <div class="post-window__card">
      <div @click="togglePost()" class="post-window__card__button">X</div>
      <div class="post-window__card__content">
        <h2 v-if="mode == 'postToCreate'">Create a post</h2>
        <h2 v-else>Modify a post</h2>
        <form class="post-form">
          <input
            v-model="title"
            class="post-form__title"
            type="text"
            placeholder="Title"
            required
            autofocus
            autocomplete="false"
          />
          <textarea
            v-model="text"
            class="post-form__text"
            type="text"
            placeholder="What do you want to talk about ?"
            required
            autofocus
            autocomplete="false"
          />
          <div class="upload-image">
            <div class="upload-image__button">
              <input @change="onImageSelected()" id="file-image" type="file" ref="image" autofocus />
              <label for="file-image" class="attachment-button">
                <i class="fas fa-paperclip"></i>
              </label>
            </div>
            <span>
              <strong>Chosen file : </strong>
              <span v-if="image">{{ image.name }}</span>
              <span v-else>None</span>
            </span>
          </div>
        </form>
        <div class="footer">
          <button
            v-if="mode == 'postToCreate'"
            @click.prevent="createPost()"
            class="button"
            :class="{ 'button--disabled': !correctForm }"
            type="submit"
          >Post</button>
          <button
            v-else
            @click.prevent="modifyPost(postId)"
            class="button"
            :class="{ 'button--disabled': !correctForm }"
            type="submit"
          >Modify</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "Postwindow",
  props: [
    "visiblePost",
    "togglePost",
    "reloadThread",
    "resetForm",
    "mode",
    "postId",
  ],
  data() {
    return {
      title: "",
      text: "",
      image: null,
    };
  },
  computed: {
    correctForm() {
      if (this.title != "" && this.text != "") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    onImageSelected() {
      this.image = this.$refs.image.files[0];
    },
    async createPost() {
      try {
        let data = new FormData();

        data.append("userUserId", localStorage.getItem("userId"));
        data.append("title", this.title);
        data.append("text", this.text);
        data.append("image", this.image);

        let headers = {
          "content-type": "application/json",
          authorization: "bearer " + localStorage.getItem("token"),
        };

        if (this.title != "" && this.text != "" && this.user_id != "") {
          await Axios.post(`http://localhost:${process.env.VUE_APP_API_PORT}/api/post`, data, { headers });
          this.togglePost();
          this.reloadThread();
          this.resetForm();
        }
      } catch (error) {
        console.error(error);
      }
    },
    async modifyPost(post_id) {
      try {
        let data = new FormData();
        console.log("POST_ID: " + post_id);
        data.append("userUserId", localStorage.getItem("userId"));
        data.append("title", this.title);
        data.append("text", this.text);
        data.append("image", this.image);

        let headers = {
          "content-type": "application/json",
          authorization: "bearer " + localStorage.getItem("token"),
        };

        if (this.title != "" && this.text != "" && this.user_id != "") {
          await Axios.put(`http://localhost:${process.env.VUE_APP_API_PORT}/api/post/${post_id}`, data, {
            headers,
          });
          this.togglePost();
          this.reloadThread();
          this.resetForm();
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss">
$color-secondary: #d1515a;
$color-tertiary: #f6f6f6;

.post-form {
  margin: 1rem 0;
  position: relative;
  &__title,
  textarea {
    font-size: 20px;
    width: 100%;
  }
  textarea {
    height: 10rem;
    margin-top: 1rem;
  }
  .upload-image {
    &__button {
      margin-right: 0.5rem;
    }
    display: flex;
    align-items: center;
    margin: 0.5rem 0;
    input {
      display: none;
    }
    .attachment-button {
      display: flex;
      justify-content: center;
      align-items: center;
      right: 1rem;
      height: 2.3rem;
      width: 2.3rem;
      border-radius: 500px;
      font-size: 30px;
      cursor: pointer;
      &:hover {
        background-color: $color-secondary;
        color: $color-tertiary;
      }
      .fa-paperclip {
        font-size: 25px;
      }
    }
  }
}

@media screen and (max-width: 425px) {
  .post-window__card {
    width: 98%;
  }
}
</style>
