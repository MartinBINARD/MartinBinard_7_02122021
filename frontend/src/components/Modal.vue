<template>
  <div v-if="visibleModal" class="modal">
    <div @click="toggleModal" class="overlay"></div>

    <div class="modal__card">
      <div @click="toggleModal" class="modal__card__button">X</div>
      <div class="modal__card__content">
        <h2>User profile</h2>
        <div v-if="userInfo" class="user-info">
          <div><p>Firstname:</p><span>{{ userInfo.firstname }}</span></div>
          <div><p>Lastname:</p> <span>{{ userInfo.lastname }}</span></div>
          <div><p>Created at:</p><span>{{ userInfo.createdAt }}</span></div>
          <div><p>Updated at:</p><span>{{ userInfo.updatedAt }}</span></div>
          <div><p>Admin:</p><span>{{ userInfo.admin }}</span></div>
          <div><p>Active:</p><span>{{ userInfo.active }}</span></div>
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
  mounted () {
    let userId = localStorage.getItem('userId');
    let headers = {
      'content-type': 'application/json',
      'authorization': 'bearer ' + localStorage.getItem('token')
    };

    Axios.get(`http://localhost:3001/api/user/${userId}`, { headers })
      .then(res => (this.userInfo = res.data))
      .catch(error => console.log(error.message))
  }
}
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

.modal, .post-window, .overlay, .overlay-menu {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.overlay {
  background: rgba(0, 0, 0, 0.3);
}

.modal, .post-window {
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
          filter: brightness(85%);
        }
    }
    &__content {
      margin: 0.5rem 0.5rem 0 0;
    }
  }
}

.user-info {
  margin: 0.5rem 0;
  div {
    display: flex;
    justify-content: space-between;
    margin: 0.2rem 0;
    span {
    font-weight: bold;
    }
  }
};
</style>