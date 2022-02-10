<template>
  <header>
    <nav class="navbar">
      <ul class="navbar__list">
        <li class="groupomania-style">
          <img
            class="groupomania-style__icon"
            src="../../assets/icon.svg"
            alt="Orinoco logo"
          />
        </li>
        <li>
          <button
            @click="toggleMenu"
            class="setting-button"
            :class="{ 'setting-button--active': clicked }"
          >
            <i class="far fa-user"></i>
          </button>
        </li>
      </ul>
    </nav>
    <div v-if="visibleMenu" @click="toggleMenu" class="overlay-menu"></div>
    <ul v-if="visibleMenu" class="menu-list">
      <li @click="toggleModal" class="menu-list__select">
        <i class="fas fa-cog"></i>
        <div class="menu-list__select__name">Profile</div>
      </li>
      <li @click.prevent="logOut" class="menu-list__select">
        <i class="fas fa-sign-out-alt"></i>
        <div class="menu-list__select__name">Log out</div>
      </li>
    </ul>
    <modal :visibleModal="visibleModal" :toggleModal="toggleModal"></modal>
  </header>
</template>

<script>
import Modal from "./Modal.vue";

export default {
  name: "Navbar",
  components: { Modal },
  data() {
    return {
      visibleMenu: false,
      visibleModal: false,
    };
  },
  computed: {
    clicked() {
      if (this.visibleMenu == true) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    toggleMenu() {
      this.visibleMenu = !this.visibleMenu;
    },
    toggleModal() {
      this.visibleModal = !this.visibleModal;
    },
    async logOut() {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        await this.$router.push("/submit");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
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

.navbar {
  background-color: $color-tertiary;
  margin: 0.5rem;
  border-radius: 25px;
  @extend %shadow-card;
  &__list {
    display: flex;
    justify-content: space-between;
  }
}

.groupomania-style {
  display: flex;
  align-items: center;
  &__icon {
    margin-left: 5px;
    border-radius: $border-card;
    height: 4rem;
    width: 4rem;
  }
}

.setting-button {
  width: 40px;
  margin: 10px 15px 0 0;
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  &:hover,
  &--active {
    background-color: $color-primary;
    color: $color-secondary;
    @extend %shadow-button;
  }
}

.fa-user {
  font-size: 35px;
}

.fa-cog,
.fa-sign-out-alt {
  font-size: 20px;
}

.menu-list {
  z-index: 3;
  position: absolute;
  top: 4.5rem;
  right: 0;
  background-color: $color-tertiary;
  height: 5rem;
  width: 10rem;
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: $border-card;
  @extend %shadow-card;
  text-align: center;
  &__select {
    display: flex;
    justify-content: space-around;
    height: 50%;
    padding-top: 5%;
    &:hover {
      background-color: $color-primary;
      border-radius: 5px;
      color: $color-tertiary;
      cursor: pointer;
    }
  }
}
</style>
