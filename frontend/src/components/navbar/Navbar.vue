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
    <modal
      :visibleModal="visibleModal"
      :toggleModal="toggleModal"
      :logOut="logOut"
      :key="reloadModalUser"
      :reloadModal="reloadModal"
    ></modal>
  </header>
</template>

<script>
import Modal from "./Modal.vue";

export default {
  name: "Navbar",
  components: { Modal },
  props: ["reloadPosthread", "reloadThread"],
  data() {
    return {
      visibleMenu: false,
      visibleModal: false,
      reloadModalUser: 0,
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
    reloadModal() {
      this.reloadModalUser++;
    },
    toggleMenu() {
      this.visibleMenu = !this.visibleMenu;
    },
    toggleModal() {
      this.visibleModal = !this.visibleModal;
    },
    logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("admin");
      this.$router.push("/submit");
    },
  },
};
</script>

<style scoped lang="scss">
$color-primary: #122542;
$color-secondary: #d1515a;
$color-tertiary: #f6f6f6;
$color-quinary: white;
$border-card: 25px;

%shadow-card {
  box-shadow: 1px 5px 8px rgb(0, 0, 0, 0.4);
}

%shadow-button {
  box-shadow: 1px 5px 8px rgb(0, 0, 0, 0.5);
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  background-color: $color-quinary;
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
    background-color: $color-secondary;
    color: $color-tertiary;
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
  position: fixed;
  z-index: 3;
  top: 5rem;
  right: 0;
  background-color: $color-quinary;
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
      background-color: $color-secondary;
      border-radius: 5px;
      color: $color-tertiary;
      cursor: pointer;
    }
  }
}
</style>
