<template>
  <div class="stream">
    <div v-if="postInfo" class="stream__card">
      <div class="stream__card__header">
        <div class="avatar"><i class="far fa-user"></i></div>
        <div class="user">
          <div class="user__name">user name</div>
          <div class="user__time-stamp">time stamp</div>
        </div>
      </div>
      <div class="stream__card__content">
        <div class="title">title</div>
        <div class="image"></div>
        <div class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam quia, sapiente officiis vero numquam illum ducimus consectetur reprehenderit eveniet aliquid non in ipsam exercitationem voluptate, cumque tempora molestiae et. Soluta.</div>
      </div>
      <div class="stream__card__footer">
        <div class="react"><i class="far fa-thumbs-up"></i></div>
        <div class="comment"></div>
      </div>
    </div>
    <div v-else class="message-stream">
      <h2>No posts available !</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Postflow',
  data () {
    return {
      postInfo: null,
      title: '',
      image: '',
      text: ''
    }
  }
}
</script>

<style lang="scss">
$color-secondary: #f6f6f6;
$border-card: 25px;

%shadow-card {
    box-shadow: 1px 5px 8px rgb(0, 0, 0, 0.1);
}

.stream__card {
  flex-direction: column;
  margin: 1rem 0.5rem;
  &__header {
    display: flex;
    align-items: center;
    .avatar {
      font-size: 25px;
      width: 31px;
      height: 31px;
    }
    .user__name {
      font-weight: bold;
    }
  }
  &__content {
    margin: 0 0.5rem;
    .text {
        margin: 0.5rem 0;
    }
  }
  &__footer {
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 0.5rem 0 0.5rem;
    .fa-thumbs-up {
        font-size: 30px;
        margin: 0 1rem;
    }
  }
}

.title, .text {
    font-size: 20px;
}

.message-stream {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $color-secondary;
  height: 10rem;
  width: 50%;
  margin: 1rem 0;
  border-radius: $border-card;
  @extend %shadow-card;
}
</style>