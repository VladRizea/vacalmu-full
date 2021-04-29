<template>
<div>

  <div v-if="articles[0][0]" class="index-container">


      <div class="article-top">
        <topArticleCard   :article="articles[0][0]" ></topArticleCard>
      </div>
     <adsbygoogle />
    <h1>Ultimele articole VACALMU</h1>

      <div class="wrapper-article-grid">

        <div class="article-grid-placeholder"></div>

        <client-only>
            <carousel class="article-grid"  :responsive="{0:{items:1,nav:false},600:{items:2,nav:false},1020:{items:3,nav:false}}" >
                <gridArticleCard  class="grid-component" v-for="article of articles[0].length -1 " :key="article"  :article="articles[0][article]" ></gridArticleCard>
            </carousel>
        </client-only>

      </div>

<br>

    <div v-for="category of articles[1].length" :key="category">
      <h2>Articole din categoria {{articles[1][category - 1].name}}</h2>


      <div class="wrapper-article-grid">

      <div class="article-grid-placeholder"></div>

      <client-only>
          <carousel class="article-grid"  :responsive="{0:{items:1,nav:false},600:{items:2,nav:false},1020:{items:3,nav:false}}">
            <gridArticleCard  class="grid-component"  v-for="categoryArticle of 3 " :key="categoryArticle"  :article="articles[1][category - 1].articles[articles[1][category - 1].articles.length - categoryArticle]" ></gridArticleCard>
          </carousel>
      </client-only>

      </div>
      <a  :href="'/categorii/' + articles[1][category-1].name"><div class="load-more-newest-articles" ><b>Mai mult</b></div></a>
    </div>

  </div>

  <div  v-if="!articles[0][0]">
    There are no articles
  </div>


</div>
</template>

<script>
import axios from 'axios';


import topArticleCard from '../components/top_article_card';
import gridArticleCard from '../components/grid_article_card';


export default {
    components:{
      topArticleCard,
      gridArticleCard,

    },
    data() {
      return {
        newArticles: 3,
        showMoreArticlesButtons: true,
      }
    },
    async asyncData({$axios}) {
      let articles = [];
      //articles based on their category logic
      await $axios.$get(`/api/v1/feed`)
      .then(response => {articles = response.content;});

    return { articles }; // equivalent to { products: products }
  },
    methods:{
      loadMoreArticlesNewest(){
        if(this.newArticles + 3 < this.articles[0].length)this.newArticles +=3;
        else if(this.newArticles + 3 >= this.articles[0].length)this.newArticles = this.articles[0].length - 1;
        else this.newArticles = this.articles[0].length - 1 ;

        if(this.newArticles == this.articles[0].length - 1 ) this.showMoreArticlesButtons = false;
      },

      refresh() {
        this.$nuxt.refresh()
      }
  },



    head() {
    return {
      title: 'VACALMU',
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'VACALMU'
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'Articole originale despre subiecte originale-ish'
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://i.ibb.co/QktgbyZ/default.png'
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: 'VACALMU'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'VACALMU'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Articole originale despre subiecte originale-ish'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://i.ibb.co/QktgbyZ/default.png'
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: 'https://i.ibb.co/QktgbyZ/default.png'
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: 'VACALMU'
        }
      ]
    }
  }
}
</script>



<style lang='scss'>

@import "../assets/flex";
@import "../assets/colors";
@import "../assets/screen-size";
@import "../assets/transition";

body{
  background: $cBlackGray;
}

a:hover{
  text-decoration: none;
}

.index-container {
  margin: 50px auto  10px auto;
  width: 100%;
  max-width: 1620px;
  min-height: 100vh;
  transition: height 1s;
  @include flexbox();
  @include justify-content(flex-start);
  @include align-content(center);
  @include flex-direction(column);
  .advetisment{
    max-width: 1620px;
    max-height: 400px;
  }
  .article-top{
    @include flexbox();
    @include align-items(center);
    @include justify-content(center);
    @include xl{
     margin:15px;
    }
    margin:10px 5px 5px 5px;
  }

  h1{
    color: $cGhostWhite;
    margin: 50px 10px 50px 10px;
  }
  h2{
    color: $cGhostWhite;
    margin: 50px 10px 50px 10px;
  }
  @include xl{
.wrapper-article-grid{
  position: relative;

    .article-grid{

    @include flexbox();
    @include align-items(center);
    @include justify-content(center);
    align-self: center;

    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    top: 0;

    height: 600px;
    width: 95%;
}

  }
 .article-grid-placeholder{
    width: 100%;
    height: 600px;
  }

 }

  }
  @include lg{

    .wrapper-article-grid{
  position: relative;


   .article-grid{

    @include flexbox();
    @include align-items(center);
    @include justify-content(center);
    align-self: center;

    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    top: 0;
    position: absolute;

    height: 600px;
    width: 95%;

  }
  .article-grid-placeholder{
    width: 100%;
    height: 600px;
  }
}

}

.owl-carousel span {
    width:10px;
    height:10px;
    margin:5px 7px;
    background: gray !important;
    opacity: 40;
    display:block;
    -webkit-transition:opacity 200ms ease;
    -moz-transition:opacity 200ms ease;
    -ms-transition:opacity 200ms ease;
    -o-transition:opacity 200ms ease;
    transition:opacity 200ms ease;
    -webkit-border-radius:30px;
    -moz-border-radius:30px;
    border-radius:30px;
}

.owl-carousel .active span {
    width:10px;
    height:10px;
    margin:5px 7px;
    background: $cGhostWhite !important;
    display:block;
    -webkit-transition:opacity 200ms ease;
    -moz-transition:opacity 200ms ease;
    -ms-transition:opacity 200ms ease;
    -o-transition:opacity 200ms ease;
    transition:opacity 200ms ease;
    -webkit-border-radius:30px;
    -moz-border-radius:30px;
    border-radius:30px;
}

.owl-stage {
  margin: 50px auto;
  align-self: center;
}



div{
@include xl{
.wrapper-article-grid{
  position: relative;

    .article-grid{

    @include flexbox();
    @include align-items(center);
    @include justify-content(center);
    align-self: center;

    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    top: 0;

    height: 600px;
    width: 95%;

  }
 .article-grid-placeholder{
    width: 100%;
    height: 600px;
  }

 }

  }
  @include lg{

    .wrapper-article-grid{
  position: relative;


   .article-grid{

    @include flexbox();
    @include align-items(center);
    @include justify-content(center);
    align-self: center;

    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    top: 0;
    position: absolute;

    height: 600px;
    width: 95%;

  }
  .article-grid-placeholder{
    width: 100%;
    height: 600px;
  }
}

}

}

  .load-more-newest-articles {
    width: 200px;
    background-color: $cGhostWhite;
    border: none;
    color: $cBlackGray ;
    padding: 10px 26px;
    text-align: center;
    text-decoration: none;
    font-size: 15px;
    margin: 55px auto;
    border: solid 0.5px $cGhostWhite;
    @include transition(all, 0.3s, linear);

    cursor: pointer;
    &:hover{
        background-color: $cBlackGray ;
        color: $cGhostWhite;
        text-decoration: none;
        b{
          text-decoration: none;
        }
    }
    &:active{
        background-color: $cBlackGray ;
        color: $cGhostWhite;
        text-decoration: none;

    }
  }



</style>
