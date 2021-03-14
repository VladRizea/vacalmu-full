<template>
  

<li class="gcard" @click="flip()">

  <div class="gcard__side gcard__side--front" v-bind:class="{ 'active_side-front': isFlipped }">
      <img class="thumbnail-grid-gcard" loading="lazy" :src="article.thumbnailSquare" :alt="article.slug">
      <div class="gcard-grid-content">
          <b>{{article.title}}</b>
      </div>
  </div>

  <div class="gcard__side gcard__side--back"  v-bind:class="{ 'active_side-back': isFlipped }">
        
        <div class="back-and-category-grid-card">
          <b-icon class="icon"  icon="arrow-left-circle-fill" font-scale="2.5"></b-icon>
          
          <p class="small-text-grid-card">Categorie: <a class="small-text-grid-card" :href="'/categorii/' + article.category">{{article.category}}</a></p>
        </div>
        
        
        <a :href="'/expuneri/' + article.slug" class="description-grid-card ">{{truncate(article.description, 100)}}</a>

        <div class="name-and-date-grid-card">
          <a class=" small-text-grid-card" :href="'/publishers/' + article.user.name">{{article.user.name}}</a>
          
          <time class=" small-text-grid-card" :datetime="article.createdAt">{{new Intl.DateTimeFormat('ro-RO').format(new Date(article.createdAt))}}</time>
        </div>
  </div>

</li>



</template>

<script>
export default {

    data() {
      return {
        isFlipped : false,
      }
    },

    props: ['article'],
    //32.5201219512195;

    methods: {
      editProject(){
        this.$router.push({path: `/dashboard/my-articles/${this.article._id}`});
      },
       truncate(str, n){
        return (str.length > n) ? str.substr(0, n-1) + '...' : str;
      },
      flip(){
        this.isFlipped = !this.isFlipped;
      }
    }
}
</script>

<style lang="scss" scoped>

@import "../assets/screen-size";
@import "../assets/transition";
@import "../assets/flex";
@import "../assets/colors";



@include xl{

  .gcard {
    width: 30%;
    height: auto;
    perspective: 100vw;
    position: relative;
    
    &__side {
      font-weight: bold;
      @include flexbox();
      @include justify-content(space-between);
      @include flex-direction(column);
      position: relative;

      transition: all 700ms ease;
      backface-visibility: hidden;
      
      &--front {
        padding: 10px;
        flex: 1 1 30%;
        background: $cGhostWhite;
        .thumbnail-grid-gcard{
          width:100%;
          height:auto;
          border-left: 3px solid $cBlackGray;
          border-top: 3px solid $cBlackGray;
        }
        .gcard-grid-content{
          height: 110px;
          flex: 1 1 auto;
          font-size: 26px;
          color: $cBlackGray;
          &:hover{
            text-decoration: none;
          }
        }
      }
      
      &--back {
        padding: 10px;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: $cGhostWhite;
        .back-and-category-grid-card{
          @include flexbox();
          @include justify-content(space-between);
          @include align-content(center);
          @include flex-direction(row);
          
          .small-text-grid-card{
            align-self: center;
            color: $cBlackGray;
          }
        }
        .description-grid-card{
          color: $cBlackGray;
          font-size: 26px;
        }
        .name-and-date-grid-card{
          @include flexbox();
          @include justify-content(space-between);
          @include flex-direction(row);
        }
        .small-text-grid-card{
          color: $cBlackGray;
        }

        transform: rotateY(180deg);
      }
    }
    
    &:hover &__side--front {
      transform: rotateY(-180deg);
    }
    
    &:hover &__side--back {
      transform: rotateY(0);
    }


  }

}


@include lg{

  .gcard {
    width: 80%;
    height: auto;
    perspective: 100vw;
    position: relative;
    
    &__side {
      font-weight: bold;
      @include flexbox();
      @include justify-content(space-between);
      @include flex-direction(column);
      position: relative;

      transition: all 700ms ease;
      backface-visibility: hidden;
      
      &--front {
        padding: 10px;
        flex: 1 1 30%;
        background: $cGhostWhite;
        .thumbnail-grid-gcard{
          width:100%;
          height:auto;
          border-left: 3px solid $cBlackGray;
          border-top: 3px solid $cBlackGray;
        }
        .gcard-grid-content{
          height: 100px;
          flex: 1 1 auto;
          font-size: 25px;
          color: $cBlackGray;
          &:hover{
            text-decoration: none;
          }
        }
      }
      
      &--back {
        padding: 10px;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: $cGhostWhite;
        .back-and-category-grid-card{
          @include flexbox();
          @include justify-content(space-between);
          @include align-content(center);
          @include flex-direction(row);
          
          .small-text-grid-card{
            align-self: center;
            color: $cBlackGray;
          }
        }
        .description-grid-card{
          color: $cBlackGray;
          font-size: 25px;
        }
        .name-and-date-grid-card{
          @include flexbox();
          @include justify-content(space-between);
          @include flex-direction(row);
        }
        .small-text-grid-card{
          color: $cBlackGray;
        }

        transform: rotateY(180deg);
      }
    }
    
     .active_side-front {
      transform: rotateY(-180deg);



    }
    
    .active_side-back {
      transform: rotateY(0);
    }
  }

}

</style>
