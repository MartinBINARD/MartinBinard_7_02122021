<template>
  <div v-if="visiblePost" class="post-window">
    <div @click="togglePost" class="overlay"></div>

    <div class="post-window__card">
      <div @click="togglePost" class="post-window__card__button" >X</div>
      <div class="post-window__card__content">
        <h2>Create a post</h2>
        <form class="post-form">
          <input v-model="title" class="post-form__title" type="text" placeholder="Title">
          <textarea v-model="text" class="post-form__text" type="text" placeholder="What do you want to talk about ?" required />
        </form>
        <div class="footer">
          <button class="button" :class="{'button--disabled' : !correctForm}" type="submit">Post</button>
          <button class="attachment-button"><i class="fas fa-paperclip"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Postwindow',
    props: ['visiblePost', 'togglePost'],
    data () {
      return {
        title: '',
        text: ''
      }
    },
    computed: {
      correctForm () {
        if(this.title!='' && this.text!=''){
          return true;
        } else {
          return false
        }
      }
    }
}
</script>

<style lang="scss">
$color-primary: #1daba7;
$color-tertiary: white;

.post-form {
  margin: 1rem 0;
  &__title, textarea {
    font-size: 20px;
    width: 100%;
  }
  textarea {
    height: 10rem;
    margin-top: 1rem;
  }
}

.footer {
  position: relative;
  .attachment-button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 1rem;
    height: 2.3rem;
    width: 2.3rem;
    border-radius: 500px;
    font-size: 30px;
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    &:hover {
      background-color: $color-primary;
      color: $color-tertiary;
    }
    .fa-paperclip {
      font-size: 25px;
    }
  }
}

@media screen and (max-width: 425px) {
  .post-window__card {
    width: 98%;
  }
}
</style>