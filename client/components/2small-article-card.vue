<template>
  <div class="small-article-card">

    <div class="image-wrapper">
      <a :href="'/expuneri/' + article.slug"><img :src="article.thumbnail" :alt="article.slug"></a>
    </div>

    <div class="small-article-card-content">
      <a :href="'/categorii/' + article.category"><div class="small-card-label">{{article.category}}</div></a>
       <a :href="'/expuneri/' + article.slug"><div class="card-title">{{article.title}}</div></a>
    </div>

  </div>
</template>

<script>
export default{
  props: ['article'],
}
</script>

<style scoped lang='scss'>


@import "../assets/screen-size";
@import "../assets/transition";
@import "../assets/flex";
@import "../assets/colors";

.small-article-card{
  margin: 5px 10px;
      @include flexbox();
      @include justify-content(flex-start);
      @include flex-direction(row);
      .image-wrapper{
        display: block;
      @include flexbox();
      @include justify-content(center);
      @include flex-direction(row);
          border-radius:  5px 0 0 5px ;

          height: 250px;
          width: 250px;

          @include lg{
            height: 200px;
            width: 200px;
          }
          @include sm{
            height: 150px;
            width: 150px;
          }
          overflow: hidden;
        img{
          user-select: none;
            -moz-user-select: none;
            -webkit-user-drag: none;
            -webkit-user-select: none;
            -ms-user-select: none;
          display: block;
          border-radius:  5px 0 0 5px ;
          height: 250px;


          @include lg{
            height: 200px;

          }
          @include sm{
            height: 150px;

          }
          width: auto;

          object-fit: fit;
          text-align: center;
        }
      }

      .small-article-card-content{
        text-decoration: none;
        height: 250px;
          @include lg{
            height: 200px;
          }
          @include sm{
            height: 150px;
          }
        width: 70%;
        border-radius: 0 5px 5px 0;
        background-color: $cGhostWhite;
        .small-card-label{
          margin: .45rem;
          position: absolute;
          height: auto;
          background: $cBetterBlack;
          text-transform: uppercase;
          font-weight: 300;
          font-size: 0.7em;
          color: $cGhostWhite;
          padding: 0.5em;
        }
        .card-title{
          text-decoration: none;
          color: $cBetterBlack;
          margin: 4rem .45rem .45rem .45rem;
          font-weight: bold;
          font-size: 30px;
          @include lg{
            font-size: 20px;
          }
          @include sm{
            font-size: 15px;
            margin: 3rem .45rem .45rem .45rem;
          }
          &:hover{
            cursor: pointer;
            color: $cBetterBlackFaded;
            text-decoration: underline;
          }
        }
      }
}

</style>
