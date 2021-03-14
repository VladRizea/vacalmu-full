<template>
  <div class="top-article">
    <div class="content-column-top-article">
      <a class="category-top-article component-top-article" :href="'/categorii/' + article.category"> {{article.category}}</a>
      <a :href="'/expuneri/' + article.slug" class="title-top-article component-top-article"><b>{{article.title}}</b></a>
      <a :href="'/expuneri/' + article.slug" class="description-top-article component-top-article">{{article.description  }}</a>
      <br>
      <div class="component-top-article name-and-date-top-article">
        <a class=" small-text-top-article" :href="'/publishers/' + article.user.name">{{article.user.name}}</a>
        <time class=" small-text-top-article" :datetime="article.createdAt">{{new Intl.DateTimeFormat('ro-RO').format(article.createdAt.month)}}</time>
      </div>
    </div>
    
    <div class="thumbnail-top-article-component">
      <a :href="'/expuneri/' + article.slug"><img class="thumbnail-top-article" :src="article.thumbnail" :alt="article.slug"></a>
      <a :href="'/expuneri/' + article.slug"><div class="thumbnail-top-article-overlay"></div></a>
    </div>
    

  </div>
</template>

<script>
export default {
    props: ['article'],
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
  background: $cBlackGray;
  align-self: center;
  max-width: 1600px;
  width: 100%;
  height: auto;
  .thumbnail-top-article-component{
    position: relative;
    justify-self: flex-end;
    .thumbnail-top-article{
      height: auto;
      width: 60vw;
      
    }
    .thumbnail-top-article-overlay{
      width: 60.2vw;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
   

     background: $cBlackGray;
     background: linear-gradient(90deg, $cBlackGray 2%, rgba(0,0,0,0) 66%), linear-gradient(0deg, $cBlackGray 2%, rgba(0,0,0,0) 66%);

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
      
      color: $cGhostWhite;
      font-size: 32px;
      &:hover{
          text-decoration: none;
        }      
    }
    .description-top-article{
      color: $cGhostWhite;
      font-size: 16px;
      opacity: 0.8;
      &:hover{
          text-decoration: none;
        }
    }
    .category-top-article{
      color: $cGhostWhite;
      font-size: 16px;
      opacity: 0.8;
    }
    .small-text-top-article{
        color: $cGhostWhite;
        font-size: 11px;
        opacity: 0.8;
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
  background: $cBlackGray;
  @include flexbox();
  @include justify-content(space-between);  
  @include align-content(center);  
  @include flex-direction(row);
  align-self: center;
  max-width: 1600px;
  width: 100%;
  height:auto;
  text-shadow: 2px 2px  3px $cBlackGray;
  .thumbnail-top-article-component{
    position: relative;
    justify-self: flex-end;
  .thumbnail-top-article{
    width: 100%;
    height: auto;
    padding: 10px;
    justify-self: flex-end;
  }
    .thumbnail-top-article-overlay{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
   

     background: $cBlackGray;
     background: linear-gradient(90deg, $cBlackGray 5%, rgba(0,0,0,0) 66%), linear-gradient(0deg, $cBlackGray 5%, rgba(0,0,0,0) 66%);

    }
  }


  .content-column-top-article{
    z-index: 3;
    position: absolute;
    top: 60px;
    left: 0;
    width: 300px;
    margin: 0.6vw 0.3vw 0.3vw 0.3vw;
    @include flexbox();
    @include justify-content(center);
    @include flex-direction(column);
    flex: 1 1 auto;
    .title-top-article{
      
      color: $cGhostWhite;
      font-size: 32px;
      &:hover{
          text-decoration: none;
        }      
    }
    .description-top-article{
      color: $cGhostWhite;
      font-size: 16px;
      opacity: 0.8;
      &:hover{
          text-decoration: none;
        }
    }
    .category-top-article{
      color: $cGhostWhite;
      font-size: 16px;
      opacity: 0.8;
    }
    .small-text-top-article{
        color: $cGhostWhite;
        font-size: 11px;
        opacity: 0.8;
    }
    .component-top-article{
        margin: 2vw;
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
  @include flex-direction(column);
  background: $cBlackGray;
  align-self: center;
  max-width: 1600px;
  width: 100%;
  height: auto;
  .thumbnail-top-article-component{
    position: relative;
    justify-self: flex-end;
    .thumbnail-top-article{
      height: auto;
      width: 100%;
      
    }
    .thumbnail-top-article-overlay{
      width: 100vw;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: none;
    }
  }

  .content-column-top-article{
    position: relative;
    width: auto;
    margin:  0.6vw;
    @include flexbox();
    @include justify-content(center);
    @include flex-direction(column);
    flex: 1 1 auto;
    .title-top-article{
      
      color: $cGhostWhite;
      font-size: 32px;
      &:hover{
          text-decoration: none;
        }      
    }
    .description-top-article{
      padding: 0 0 30px 0;
      color: $cGhostWhite;
      font-size: 16px;
      opacity: 0.8;
      &:hover{
          text-decoration: none;
        }
    }
    .category-top-article{
      color: $cGhostWhite;
      font-size: 16px;
      opacity: 0.8;

    }
    .small-text-top-article{
        color: $cGhostWhite;
        font-size: 11px;
        opacity: 0.8;
        display:none;
        
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
