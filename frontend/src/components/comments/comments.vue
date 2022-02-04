<template>
    <div class="comment">
        <div v-if="commentthread" class="comment__thread">
            <div class="comment__thread__header">
                <div class="avatar"><i class="far fa-user"></i></div>
                <div class="user">
                    <div class="user__name">user name</div>
                    <div class="user__time-stamp">time stamp</div>
                </div>
            </div>
            <div class="comment__thread__content">
                <div class="text"></div>
            </div>
            <div class="comment__thread__footer">
                <div class="like">Like</div>
                <button class="like-button"></button>
            </div>
        </div>
        <div class="comment__bar">
            <input v-model="comment" class="comment__bar__input" type="text" placeholder="Add a comment..." required/>
            <buttton class="comment__bar__button"></buttton>
        </div>
    </div>    
</template>

<script>
export default {
    name: 'Comment'
}
</script>

<style lang="scss">

</style>