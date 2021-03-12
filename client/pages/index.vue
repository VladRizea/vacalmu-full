<template>
<div>

  <div v-if="articles[0][0]" class="index-container">
   
   
      <div class="article-top">
        <topArticleCard   :article="articles[0][0]" ></topArticleCard>
      </div>
  

    <h1>Ultimele articole VACALMU</h1>

    <div class="article-grid">
      
        <gridArticleCard  class="grid-component"  v-for="article of newArticles " :key="article"  :article="articles[0][article]" ></gridArticleCard>
      
    </div>

    <div v-if="showMoreArticlesButtons" class="load-more-newest-articles" @click="loadMoreArticlesNewest()"><b>Încarcă mai mult</b></div>
    <div v-if="!showMoreArticlesButtons" class="load-more-newest-articles" @click="newArticles = 3; showMoreArticlesButtons=true;"><b>Compactează</b></div>
    
    <div v-for="category of articles[1].length" :key="category">
      <h2>Articole din categoria {{articles[1][category - 1].name}}</h2> 
      <div class="article-grid">
        
          <gridArticleCard  class="grid-component"  v-for="categoryArticle of 3 " :key="categoryArticle"  :article="articles[1][category - 1].articles[articles[1][category - 1].articles.length - categoryArticle]" ></gridArticleCard>
       
      </div>
      <a  :href="'/categorii/' + articles[1][category-1].name"><div class="load-more-newest-articles" ><b>Alte articole</b></div></a>
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
import landscapeArticleCard from '../components/landscape_article_card';


export default {
    components:{
      topArticleCard,
      gridArticleCard,
      landscapeArticleCard,
  
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
          content: 'https://i.ibb.co/KXd2MJD/thumbnail-defaul-vacalmu.png'
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
          content: 'https://i.ibb.co/KXd2MJD/thumbnail-defaul-vacalmu.png'
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: 'https://i.ibb.co/KXd2MJD/thumbnail-defaul-vacalmu.png'
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
  margin: 50px auto  0.6vw auto;
  padding: 0 0.3vw ;
  width: 100%;
  max-width: 1620px;
  min-height: 100vh;
  transition: height 1s;
  @include flexbox();
  @include justify-content(flex-start);
  @include align-content(center);
  @include flex-direction(column);
  .article-top{
    @include flexbox();
    @include align-items(center);
    @include justify-content(center);
    margin:0.6vw 0.3vw 0.3vw 0.3vw;
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



    .article-grid{
    perspective: 600px;
    @include flexbox();
    @include align-items(center);
    @include justify-content(center);
    @include flex-direction(row);
    flex-wrap: wrap;
  }
  .landscape-grid{
    @include flexbox();
    @include align-items(center);
    @include justify-content(center);
    @include flex-direction(column);
    margin: 0 0.3vw;
  }

}
@include lg{  

  .article-grid{
    @include flexbox();
    @include align-items(center);
    @include justify-content(center);
    @include flex-direction(column);
    margin: 0 0.6vw;
  }
  .landscape-grid{
    @include flexbox();
    @include align-items(center);
    @include justify-content(center);
    @include flex-direction(column);
    margin: 0 0.6vw;
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
    margin: 15px auto;
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


  .grid-component{
    margin:0.6vw;
  }
}

</style>
