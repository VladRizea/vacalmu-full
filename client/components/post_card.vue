<template>
  <div class="post-card">
    <img class="thumbnail" :src="article.thumbnail" alt="article thumbnail">
    <div class="content-column">
      <p class="title">{{article.title}}</p>
      <p class="description">{{article.description}}</p>
      <div class="buttons">
        <a :href="'/dashboard/my-articles/' +  this.article._id"><button class="button">Edit project</button></a>
        <div v-if="article.state === 'ready'" class="button">Published!</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['article'],
}
</script>

<style lang="scss" scoped>

@import "../assets/screen-size";
@import "../assets/transition";
@import "../assets/flex";
@import "../assets/colors";

.post-card{
  margin: 20px;
  background: $cBlackGray;
  @include flexbox();
  @include justify-content(flex-left);
  @include flex-direction(row);
  height: 300px;
  min-width: 950px;
  width: 80vw;
  .thumbnail{
          user-select: none;
            -moz-user-select: none;
            -webkit-user-drag: none;
            -webkit-user-select: none;
            -ms-user-select: none;
    height: 300px;
    width: auto;
  }
  .content-column{
    @include flexbox();
    @include justify-content(space-between);
    @include flex-direction(column);
    .title{
      color: $cGhostWhite;
      font-size: 150% ;
      padding: 20px 20px 0 20px;

    }
    .description{
      color: $cGhostWhite;
      font-size: 100%;
      padding: 20px;  }
    .buttons{
      @include flexbox();
      @include justify-content(flex-left);
      @include flex-direction(row);
      .button {
        width: 200px;
        background-color: $cGhostWhite;
        border: none;
        color: $cBlackGray ;
        padding: 10px 26px;
        text-align: center;
        text-decoration: none;
        font-size: 15px;
        margin: 10px;
        border: solid 0.5px $cGhostWhite;
        @include transition(all, 0.3s, linear);

        cursor: pointer;
        &:hover{
            background-color: $cBlackGray ;
            color: $cGhostWhite;
        }
      }
    }
  }
}

</style>
