<template>
  <div class="comment">
    <div class="comment__bar">
      <div class="comment__bar__content">
        <div class="avatar"><i class="far fa-user"></i></div>
        <form>
          <input
            class="comment-input"
            type="text"
            placeholder="Add a comment..."
            required
          />
        </form>
      </div>
      <div class="comment__bar__footer">
        <div class="post-button">Post</div>
      </div>
    </div>

    <div class="comment__thread">
      <div class="avatar"><i class="far fa-user"></i></div>
      <div class="container">
        <div class="container__content">
          <div class="user">
            <div class="user__name">user name</div>
            <div class="user__time-stamp">time stamp</div>
          </div>
          <p class="text">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia
            eveniet voluptate ex blanditiis sequi laudantium cum assumenda!
            Quod, ducimus? Numquam incidunt commodi quia tempora! Odio soluta
            iste consectetur minus facilis.
          </p>
        </div>
        <div class="container__footer">
          <div class="like-button">Like</div>
          <div class="like"><i class="far fa-thumbs-up"></i>0</div>
          <div class="dislike"><i class="far fa-thumbs-down"></i>0</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comments",
};
</script>

<style lang="scss" scoped>
$color-primary: #1daba7;
$color-secondary: #f6f6f6;
$color-quinary: #e3e3e3;
$border-card: 25px;

%shadow-card {
  box-shadow: 1px 5px 8px rgb(0, 0, 0, 0.1);
}

.comment {
  margin: 0 0.5rem;
}

.comment,
.comment__bar {
  display: flex;
  flex-direction: column;
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    .avatar {
      font-size: 40px;
      margin: 0 0.5rem;
    }
    form,
    input {
      width: 100%;
    }
    input {
      padding: 0.5rem 1rem;
      border-radius: 100px;
    }
  }
  &__footer {
    padding: 0.5rem 3.2rem;
    .post-button {
      background-color: $color-primary;
      color: $color-secondary;
      width: 4rem;
      padding: 0.35rem;
      font-weight: bold;
      border-radius: 100px;
      text-align: center;
      @extend %shadow-card;
      cursor: pointer;
      &:hover {
        filter: brightness(90%);
      }
    }
  }
}

.comment__thread,
.container,
.user,
.container__footer {
  display: flex;
}

.comment__thread {
  margin: 1rem 0;
  .avatar {
    font-size: 30px;
    margin: 0.5rem;
  }
}
.container,
.container__content {
  flex-direction: column;
}
.container__content {
  background-color: $color-quinary;
  border-radius: $border-card;
  padding: 1rem;
  .user {
    justify-content: space-between;
    margin-bottom: 1rem;
  }
}

.container__footer {
  margin: 0.5rem 1rem;
  align-items: center;
  .like-button,
  .like,
  .dislike {
    margin-right: 1rem;
    .fa-thumbs-up,
    .fa-thumbs-down {
      padding-right: 0.2rem;
    }
  }
  .like-button {
    padding: 0.2rem;
    border-radius: 5px;
    &:hover {
      background-color: $color-quinary;
      cursor: pointer;
    }
  }
}
</style>
