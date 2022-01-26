<template>
  <div class="modal" v-if="visibleModal">
    <div class="overlay" @click="toggleModal"></div>

    <div class="modal__card">
      <div @click="toggleModal" class="modal__card__button">X</div>
      <div class="modal__card__content">
        <h2>User profile</h2>
        <div v-if="userInfo">
          <p>Firstname: </p><p>{{ userInfo.firstname }}</p>
          <p>Lastname: </p><p>{{ userInfo.lastname }}</p>
          <p>Created at: </p><p>{{ userInfo.createdAt }}</p>
          <p>Updated at: </p><p>{{ userInfo.updatedAt }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';

export default {
  name: 'Modal',
  data () {
    return {
      userInfo: null
    }
  },
  props: ['visibleModal', 'toggleModal'],
  methods: {
    async getUserProfile () {
      try {
        let userInfo = this.userInfo;

        let userId = localStorage.getItem(JSON.parse('userId'));
        console.log(userId);
        const res = await Axios.get(`http://localhost:3001/api/user/${userId}`);
        userInfo = JSON.parse(res.data);
        console.log(userInfo);

      } catch(error) {
        console.error(error);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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

.modal, .overlay {
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
  display: flex;
  justify-content: center;
  align-items: center;
  &__card {
    background-color: $color-secondary;
    padding: 2rem;
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
          filter: brightness(85%);
        }
    }
    &__content {
      margin: 0.5rem 1.5rem 0 0;
    }
  }
}
</style>