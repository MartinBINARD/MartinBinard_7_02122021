<template>
  <div>
    <div class="post">
      <div class="post__card">
        <div class="post__card__avatar"><i class="far fa-user"></i></div>
        <div class="post__card__content">
          <p>Insert your post...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Post"
};
</script>

<style lang="scss" scoped>
$color-primary: #1daba7;
$color-secondary: #f6f6f6;
$color-quaternary: #dadada;
$border-card: 25px;

.post {
  z-index: 1;
  display: flex;
  justify-content: center;
  align-content: center;
  &__card {
    display: flex;
    justify-content: center;
    background-color: $color-secondary;
    padding: 0 1rem;
    height: 4rem;
    width: 50%;
    border-radius: $border-card;
    &__content {
      width: 100%;
      display: flex;
      align-items: center;
      p {
        width: 100%;
        padding: 0.7rem 1rem;
        border-radius: 100px;
        border: 2px solid black;
        display: table-cell;
        vertical-align: middle;
        &:hover {
          background-color: $color-quaternary;
          cursor: pointer;
        }
      }
    }
    &__avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 35px;
      width: 50px;
      height: 50px;
      margin: 0.4rem;
      display: flex;
      align-items: center;
      border-radius: 1000px;
      border: 1px solid black;
    }
  }
}
</style>
