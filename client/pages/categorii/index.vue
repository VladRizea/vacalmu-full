<template>
<div class="categories-wrapper">
 <br>
 <h1><b>Categorii</b></h1>
 <br>
  <div class="container-categories">  

    <div v-for="category of articles" :key="category._id">
      <h2>Articole din categoria <b>{{category.name}}</b></h2> 
       <br>

      
      <div class="wrapper-article-grid">

      <div class="article-grid-placeholder"></div>

      <client-only>
          <carousel class="article-grid"  :responsive="{0:{items:1,nav:false},600:{items:2,nav:false},1020:{items:3,nav:false}}">
            <gridArticleCard  class="grid-component"  v-for="categoryArticle of category.articles " :key="categoryArticle._id"  :article="categoryArticle" ></gridArticleCard>
          </carousel>
      </client-only>

      </div>

      <br>
    </div>

  </div>
  </div>
</template>

<script>
import axios from 'axios';

import gridArticleCard from '../../components/grid_article_card';

export default {
    components:{
      gridArticleCard,
    },

    data () {
      return{
      }
    }, 

    async asyncData({$axios}) {
      let articles = [];
      await $axios.$get(`/api/v1/categories?articles=true`)
      .then(response => {articles = response;});
    

    return { articles }; // equivalent to { products: products }
    },
    
        head() {
    return {
      title: 'Categorii VACALMU',
      meta: [

        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Categorii - VACALMU'
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'Categorii de expuneri'
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://i.ibb.co/QktgbyZ/default.png'
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: 'Categorii - VACALMU'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Categorii - VACALMU'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Categorii de expuneri'
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
          content: 'Categorii - VACALMU'
        }
      ]
    }
  }

}
</script>


<style lang='scss' >
  
@import "../../assets/flex";
@import "../../assets/colors";
@import "../../assets/screen-size";
@import "../../assets/transition";

body{
  background: $cBlackGray;

.categories-wrapper{
  color: $cGhostWhite;
  margin: 50px auto  0.3vw auto;
  width: 90%;
  max-width: 1620px;
  min-height: 100vh; 
h1{
margin:10px ; 

}
.container-categories {

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
    overflow-y: auto;
    
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto; 
    top: 0;
    position: absolute;

    height: 600px;
    width: 95%;
    margin: 0  auto 0 auto; /* To remove default bottom margin */ 
    padding: 0; /* To remove default left padding */
  }

  .article-grid-placeholder{
    width: 100%;
    height: 600px;
  }
}
}

.owl-carousel span {
    width:11px;
    height:11px;
    margin:10px 7px;
    background: $cGhostWhite !important;
    opacity: 0.4;
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
    width:11px;
    height:11px;
    margin:10px 7px;
    background: $cGhostWhite !important;
    opacity: 1;
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

.grid-component{
  overflow-y: visible;
}

}

  }
}
}
</style>
