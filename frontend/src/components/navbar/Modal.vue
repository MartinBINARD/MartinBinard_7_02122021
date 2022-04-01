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
            <div v-else class="user-avatar__empty">
              <i class="far fa-user"></i>
            </div>
          </div>
          <div class="upload-avatar">
            <div class="upload-avatar__button">
              <input
                @change="onImageSelected()"
                id="file-input"
                type="file"
                ref="avatar"
              />
              <label for="file-input" class="attachment-avatar"
                >Choose a file...</label
              >
            </div>
            <span>
              <strong>Chosen file: </strong>
              <span v-if="avatar">{{ avatar.name }}</span>
              <span v-else>None</span>
            </span>
          </div>
          <div>
            <p>Firstname:</p>
            <span class="user-feild">{{ userInfo.firstname }}</span>
          </div>
          <div>
            <p>Lastname:</p>
            <span class="user-feild">{{ userInfo.lastname }}</span>
          </div>
          <div>
            <p>Created at:</p>
            <span class="user-feild">{{ userInfo.createdAt }}</span>
          </div>
          <div>
            <p>Updated at:</p>
            <span class="user-feild">{{ userInfo.updatedAt }}</span>
          </div>
          <div>
            <span v-if="userInfo.admin" class="user-feild">Administrator</span>
            <span v-else class="user-feild">Standard user</span>
          </div>
          <div>
            <span v-if="userInfo.active" class="user-feild">User active</span>
            <span v-else class="user-feild">User inactive</span>
          </div>
        </div>
        <div v-else class="message-user-info">
          <h3>Sorry, server must be shutdown ! Try it later !</h3>
        </div>
        <div class="button__user">
          <button
            @click.prevent="uploadAvatar(userInfo.user_id)"
            class="button__user__save"
            :class="{ 'button--disabled': !avatar }"
          >
            Save avatar
          </button>
          <button
            @click.prevent="deleteAccount(userInfo.user_id)"
            class="button__user__delete"
          >
            Delete account
          </button>
        </div>
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
      avatar: null,
    };
  },
  props: [
    "visibleModal",
    "toggleModal",
    "logOut",
    "reloadModal",
    "reloadModalUser"
  ],
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
    onImageSelected() {
      this.avatar = this.$refs.avatar.files[0];
    },
    async uploadAvatar(user_id) {
      try {
        let data = new FormData();
        data.append("image", this.avatar);

        let headers = {
          "content-type": "application/json",
          authorization: "bearer " + localStorage.getItem("token"),
        };

        if (this.avatar) {
          await Axios.put(`http://localhost:3001/api/user/${user_id}`, data, {
            headers,
          });
        }
        location.reload();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteAccount(user_id) {
      try {
        let headers = {
          "content-type": "application/json",
          authorization: "bearer " + localStorage.getItem("token"),
        };
        await Axios.put(
          `http://localhost:3001/api/user/deactivate/${user_id}`,
          { active: false },
          {
            headers,
          }
        );
        this.logOut();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss">
// setting modal & post modal style
$color-primary: #122542;
$color-secondary: #d1515a;
$color-tertiary: #f6f6f6;
$color-senary: #ffd7d7;
$color-warning: #f44336;
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

.modal {
  z-index: 3;
}

.modal,
.post-window {
  display: flex;
  justify-content: center;
  align-items: center;
  &__card {
    position: relative;
    background-color: $color-tertiary;
    padding: 1rem 0.8rem;
    margin: 0.5rem;
    border-radius: $border-card;
    .message-user-info{
      background-color: $color-senary;
      margin: 1rem 0;
      padding: 2rem;
      border-radius: $border-card;
    }
    @extend %shadow-card;
    &__button {
      position: absolute;
      right: 0.8rem;
      top: 0.8rem;
      padding: 0.5rem;
      background-color: $color-secondary;
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
    align-items: center;
    margin: 0.2rem 0;
    .user-feild {
      font-weight: bold;
    }
  }
  .upload-avatar {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin: 0.5rem 0;
    input {
      display: none;
    }
  }

  .attachment-avatar {
    font-weight: bold;
    cursor: pointer;
    padding: 0.5rem;
    border: 2px solid #252525;
    border-radius: 7px;
    background-color: $color-secondary;
    color: $color-tertiary;
    &:hover {
      filter: brightness(90%);
    }
  }

  .user-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    &__own img {
      border-radius: 100px;
      border: 2px solid $color-secondary;
      width: 125px;
    }
    &__empty {
      margin: 0.5rem;
      .fa-user {
        font-size: 48px;
        padding: 0.7rem 1rem;
        border-radius: 1000px;
        border: 1px solid black;
      }
    }
  }
}

.button__user {
  display: flex;
  flex-direction: column;
  &__save,
  &__delete {
    margin: 1rem 0 0 0;
    padding: 0.5rem;
    &:hover {
      filter: brightness(90%);
    }
  }
  &__save {
    background-color: $color-primary;
    color: $color-tertiary;
  }
  &__delete {
    background-color: $color-warning;
    color: $color-tertiary;
  }
}

@media screen and (max-height: 730px) {
  .modal__card {
    top: 6.5%;
  }
}
</style>