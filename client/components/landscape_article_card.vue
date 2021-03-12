<template>
  <div class="grid-card">
       <a :href="'/articole/' + article.slug"><img class="thumbnail-grid-card" :src="article.thumbnail" :alt="article.slug"></a>
      <div class="card-grid-content">
        <a class="small-text-grid-card component" :href="'/categorii/' + article.category"> {{article.category}}</a>
        <a :href="'/articole/' + article.slug" class="title-grid-card component"><b>{{article.title}}</b></a>
        <a :href="'/articole/' + article.slug" class="description-grid-card component">{{article.description}}</a>
        <br>
        <div class="component name-and-date-grid-card">
          <a class=" small-text-grid-card" :href="'/publishers/' + article.user.name">{{article.user.name}}</a>
          <time class=" small-text-grid-card" :datetime="article.createdAt">{{new Intl.DateTimeFormat('ro-RO').format(new Date(article.createdAt))}}</time>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    props: ['article'],
    //32.5201219512195;
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
.grid-card{

@include xl{


  @include flexbox();
  @include justify-content(flex-start);
  @include flex-direction(row);
  align-self: center;
  width: 100%;
  height: 25vw;
  background: $cBlackGray;
  .thumbnail-grid-card{
    height: 25vw;
    width: auto;
    padding: 10px;
  }
  .card-grid-content{
  width: auto;
  margin: 0.6vw;
  flex: 1 1 auto;
  @include flexbox();
  @include justify-content(space-between);
  @include flex-direction(column);
  .name-and-date-grid-card{
  @include flexbox();
  @include justify-content(space-between);
  @include flex-direction(row);

  }
  .small-text-grid-card{
    color: $cGhostWhite;
    font-size: 13px;
    opacity: 0.8;
  }
  .title-grid-card{
    font-size: 32px;
    color: $cGhostWhite;

    &:hover{
      text-decoration: none;
    }
  }
  .description-grid-card{
    font-size: 16px;
    opacity: 0.8;
    color: $cGhostWhite;
    &:hover{
      text-decoration: none;
    }
  }  
}
}


@include lg{  
  @include flexbox();
  @include justify-content(flex-start);
  @include flex-direction(row);
  align-self: center;
  width: 100%;
  height: 30vw;

  
  background: $cBlackGray;
  .thumbnail-grid-card{
    height: 30vw;
    width: auto;
    padding: 10px;
  }
  .card-grid-content{
  width: auto;
  margin: 0 0.6vw ;
  flex: 1 1 auto;
  @include flexbox();
  @include justify-content(space-between);
  @include flex-direction(column);
  .name-and-date-grid-card{
  @include flexbox();
  @include justify-content(space-between);
  @include flex-direction(row);

  }
  .small-text-grid-card{
    color: $cGhostWhite;
    font-size: 11px;
    opacity: 0.8;
  }
  .title-grid-card{
    font-size: 13px;
    color: $cGhostWhite;

    &:hover{
      text-decoration: none;
    }
  }
  .description-grid-card{
    display: none;
    font-size:11px;
    opacity: 0.8;
    color: $cGhostWhite;
    &:hover{
      text-decoration: none;
    }
  }  
}
}
}
</style>
