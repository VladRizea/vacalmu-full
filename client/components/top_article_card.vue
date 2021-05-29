<template>
  <div class="top-article">
    <div class="content-column-top-article">
      <a class="category-top-article component-top-article" :href="'/categorii/' + article.category"> {{article.category}}</a>
      <a :href="'/expuneri/' + article.slug" class="title-top-article component-top-article"><b>{{article.title}}</b></a>
      <a :href="'/expuneri/' + article.slug" class="description-top-article component-top-article">{{article.description  }}</a>
      <br>
      <div class="component-top-article name-and-date-top-article">
        <a class=" small-text-top-article" :href="'/publishers/' + article.publisher.name"><b>{{article.publisher.name}}</b></a>
        <time class=" small-text-top-article" :datetime="article.createdAt"><b>{{new Intl.DateTimeFormat('ro-RO').format(article.createdAt.month)}}</b></time>
      </div>
    </div>


      <a :href="'/expuneri/' + article.slug">

      <picture class="thumbnail-top-article-component">
          <source :srcset="article.thumbnail" media="(min-width: 1019px)">
          <source :srcset="article.thumbnail" media="(min-width: 821px)">
          <img class="thumbnail-top-article" :src=" article.thumbnail" :alt="article.slug">
      </picture>

      </a>

  </div>
</template>

<script>
export default {
    props: ['article'],
    data() {
      return {
        articleThumbnail: '',
      }
    },
    methods: {
      editProject(){
        this.$router.push({path: `/dashboard/my-articles/${this.article._id}`});
      }
    }
}
</script>

<style lang="scss" scoped>

@import "../assets/screen-size";
@import "../assets/transition";
@import "../assets/flex";
@import "../assets/colors";

.top-article{

@include xl{

  @include flexbox();
  @include justify-content(space-between);
  @include align-content(center);
  @include flex-direction(row);
  background: $cGhostWhite;
  align-self: center;
  max-width: 1600px;
  width: 100%;
  height: auto;
  .thumbnail-top-article-component{
  user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    position: relative;
    justify-self: flex-end;
    .thumbnail-top-article{
    user-select: none;
      -moz-user-select: none;
      -webkit-user-drag: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      height: auto;
      width: 55vw;
      max-width: 1100px;
    }
  }

  .content-column-top-article{
    width: auto;
    margin:  0.6vw;
    @include flexbox();
    @include justify-content(center);
    @include flex-direction(column);
    flex: 1 1 auto;
    .title-top-article{

      color: $cBlackGray;
      font-size: 32px;
      &:hover{
          text-decoration: none;
        }
    }
    .description-top-article{
      color: $cBlackGray;
      font-size: 16px;
      opacity: 1;
      font-weight: 1000;
      &:hover{
          text-decoration: none;
        }
    }
    .category-top-article{
      color: $cBlackGray;
      font-size: 16px;
      opacity: 1;
      font-weight: 1000;
    }
    .small-text-top-article{
        color: $cBlackGray;
        font-size: 13px;
        font-weight: 1000;
        opacity: 1;
    }
    .component-top-article{
        margin-left: 10px;
    }
    .name-and-date-top-article{
        @include flexbox();
        @include justify-content(space-between);
        @include flex-direction(row);

    }
  }
}

@include lg{

  @include flexbox();
  @include justify-content(space-between);
  @include align-content(center);
  @include flex-direction(row);
  background: $cGhostWhite;
  align-self: center;
  max-width: 1600px;
  width: 100%;
  height: auto;
  margin: 10px;
  .thumbnail-top-article-component{
  user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    position: relative;
    justify-self: flex-end;
    .thumbnail-top-article{
      height: auto;
      width: 55vw;
    user-select: none;
      -moz-user-select: none;
      -webkit-user-drag: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }
  }

  .content-column-top-article{
    width: auto;
    margin:  0.6vw;
    @include flexbox();
    @include justify-content(center);
    @include flex-direction(column);
    flex: 1 1 auto;
    .title-top-article{

      color: $cBlackGray;
      font-size: 28px;
      &:hover{
          text-decoration: none;
        }
    }
    .description-top-article{
      color: $cBlackGray;
      font-size: 16px;
      opacity: 1;
      font-weight: 1000;
      &:hover{
          text-decoration: none;
        }
    }
    .category-top-article{
      color: $cBlackGray;
      font-size: 16px;
      opacity: 1;
      font-weight: 1000;
    }
    .small-text-top-article{
        color: $cBlackGray;
        font-size: 13px;
        font-weight: 1000;
        opacity: 1;
    }
    .component-top-article{
        margin-left: 10px;
    }
    .name-and-date-top-article{
        @include flexbox();
        @include justify-content(space-between);
        @include flex-direction(row);

    }
  }


}

@include md {

  @include flexbox();
  @include justify-content(space-between);
  @include align-content(center);
  @include flex-direction(row);
  background: $cGhostWhite;
  align-self: center;
  max-width: 1600px;
  width: 100%;
  height: auto;
  margin: 10px;

  .thumbnail-top-article-component{
  user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    height: auto;
    position: relative;
    justify-self: flex-end;
    .thumbnail-top-article{
  user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
      padding: 0;
      height: auto;
      width: 350px;
      position: absolute;
      top: 0;
      right: -76.5px;
    -moz-transform: rotate(-90deg) translateX(-76.5px);
    -webkit-transform: rotate(-90deg) translateX(-76.5px);
    -o-transform: rotate(-90deg) translateX(-76.5px);
    -ms-transform: rotate(-90deg) translateX(-76.5px);
    transform: rotate(-90deg) translateX( -76.5px);
    }
  }






  .content-column-top-article{
    width: auto;
    height: 350px;
    margin:  0 200px 0  0;
    @include flexbox();
    @include justify-content(center);
    @include flex-direction(column);
    flex: 1 1 auto;
    .title-top-article{

      color: $cBlackGray;
      font-size: 16px;
      &:hover{
          text-decoration: none;
        }
    }
    .description-top-article{
      display: none;
      color: $cBlackGray;
      font-size: 16px;
      opacity: 1;
      font-weight: 1000;
      &:hover{
          text-decoration: none;
        }
    }
    .category-top-article{
      color: $cBlackGray;
      font-size: 16px;
      opacity: 1;
      font-weight: 1000;
      display: none;
    }
    .small-text-top-article{
        color: $cBlackGray;
        font-size: 13px;
        font-weight: 1000;
        opacity: 1;

    }
    .component-top-article{
        margin-left: 10px;
    }
    .name-and-date-top-article{
        @include flexbox();
        @include justify-content(space-between);
        @include flex-direction(row);

    }
  }

}

}

</style>
