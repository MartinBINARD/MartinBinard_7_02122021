<template>
  <div v-if="visibleModal" class="modal">
    <div @click="toggleModal()" class="overlay"></div>

    <div class="modal__card">
      <div @click="toggleModal()" class="modal__card__button">X</div>
      <div class="modal__card__content">
        <h2>User profile</h2>
        <div v-if="userInfo" class="user-info">
          <div class="user-avatar">
            <div v-if="userInfo.avatar" class="user-avatar__own">
              <img :src="userInfo.avatar" alt="user avatar" />
            </div>
            <div v-if="!userInfo.avatar" class="user-avatar__empty">
              <i class="far fa-user"></i>
            </div>
          </div>
          <label for="file-image" class="attachment-avatar">
            <div class="change-avatar">Modify</div>
            <input
              @change="onAvatarSelected()"
              id="file-image"
              type="file"
              ref="avatar"
            />
          </label>
          <div>
            <p>Firstname:</p>
            <span>{{ userInfo.firstname }}</span>
          </div>
          <div>
            <p>Lastname:</p>
            <span>{{ userInfo.lastname }}</span>
          </div>
          <div>
            <p>Created at:</p>
            <span>{{ userInfo.createdAt }}</span>
          </div>
          <div>
            <p>Updated at:</p>
            <span>{{ userInfo.updatedAt }}</span>
          </div>
          <div>
            <p>Admin:</p>
            <span>{{ userInfo.admin }}</span>
          </div>
          <div>
            <p>Active:</p>
            <span>{{ userInfo.active }}</span>
          </div>
        </div>
        <button
          @click.prevent="uploadAvatar(userInfo.user_id)"
          class="button"
          :class="{ 'button--disabled': !avatar }"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "Modal",
  data() {
    return {
      userInfo: null,
      avatar: "",
    };
  },
  props: ["visibleModal", "toggleModal"],
  async mounted() {
    try {
      let userId = localStorage.getItem("userId");
      let headers = {
        "content-type": "application/json",
        authorization: "bearer " + localStorage.getItem("token"),
      };

      let getOneUserInfo = await Axios.get(
        `http://localhost:3001/api/user/${userId}`,
        { headers }
      );
      this.userInfo = getOneUserInfo.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    onAvatarSelected() {
      this.avatar = this.$refs.avatar.files[0];
    },
    async uploadAvatar(user_id) {
      try {
        let data = new FormData();
        data.append("avatar", this.avatar);

        let headers = {
          "content-type": "application/json",
          authorization: "bearer " + localStorage.getItem("token"),
        };

        if (this.avatar) {
          await Axios.put(`http://localhost:3001/api/user/${user_id}`, data, {
            headers,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss">
// setting modal & post modal style
$color-primary: #1daba7;
$color-secondary: #f6f6f6;
$color-tertiary: white;
$border-card: 25px;

%shadow-card {
  box-shadow: 1px 5px 8px rgb(0, 0, 0, 0.1);
}

%shadow-button {
  box-shadow: 1px 5px 8px rgb(0, 0, 0, 0.5);
}

.modal,
.post-window,
.overlay,
.overlay-menu {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.overlay {
  background: rgba(0, 0, 0, 0.3);
}

.modal,
.post-window {
  display: flex;
  justify-content: center;
  align-items: center;
  &__card {
    background-color: $color-secondary;
    padding: 2rem;
    margin: 0.5rem;
    border-radius: $border-card;
    @extend %shadow-card;
    position: relative;
    &__button {
      position: absolute;
      right: 0.8rem;
      top: 0.8rem;
      padding: 0.5rem;
      background-color: $color-primary;
      border-radius: 5px;
      font-weight: bold;
      &:hover {
        color: $color-tertiary;
        cursor: pointer;
        filter: brightness(90%);
      }
    }
    &__content {
      margin: 0.5rem 0.5rem 0 0;
    }
  }
}

.user-info {
  margin: 0.5rem 0;
  position: relative;
  div {
    display: flex;
    justify-content: space-between;
    margin: 0.2rem 0;
    span {
      font-weight: bold;
    }
  }

  .attachment-avatar {
    input {
      display: none;
    }
    .change-avatar {
      font-weight: bold;
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.3rem;
      border-radius: 5px;
      &:hover {
        color: $color-tertiary;
        background-color: $color-primary;
      }
    }
  }

  .user-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    &__empty {
      .fa-user {
        font-size: 48px;
        padding: 0.7rem 1rem;
        border-radius: 1000px;
        border: 1px solid black;
      }
    }
  }
}
</style>