<template>
<div class="categories-wrapper">
 <br>
 <h1><b>Categorii</b></h1>
 <br>
  <div class="container-categories">      
      <div class="category-block"  v-for="category of categories " :key="category._id">
         <a :href="'/categorii/' + category.name " class="title">
          <img class="thumbnail-category-section" :src="category.thumbnail" alt="article thumbnail-grid-card">
          <a :href="'/categorii/' + category.name " class="title"><p >{{category.name}}</p></a>   
         </a>   
      </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';

import topArticleCard from '../../components/top_article_card';
import landscapeArticleCard from '../../components/landscape_article_card';

export default {
    components:{
      topArticleCard,
      landscapeArticleCard,
      topIndexComponent,
    },

    data () {
      return{
      }
    }, 

    async asyncData({$axios}) {
      let categories = [];
      await $axios.$get(`/api/v1/categories`)
      .then(response => {categories = response.data;});
    
    return { categories }; // equivalent to { products: products }
    },
        head() {
    return {
      title: 'Categorii VACALMU',
      meta: [

        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Categorii'
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'Categorii de expuneri'
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://i.ibb.co/KXd2MJD/thumbnail-defaul-vacalmu.png'
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: 'Categorii'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Categorii'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Categorii de expuneri'
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
          content: 'Categorii'
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

@include lg{
  @include flexbox();
  @include justify-content(center);
  @include align-content(center);
  @include flex-direction(row);
  padding: 10px;
}
@include xl{
  @include flexbox();
  @include justify-content(flex-start);
  @include align-content(center);
  @include flex-direction(row);
}

  flex-wrap: wrap;
    .category-block{
    @include flexbox();
    @include justify-content(center);
    @include align-content(center);
    @include flex-direction(column);
    
    @include lg{
      margin: 0.3vw auto;
    }
    @include xl{
      margin: 0.3vw;
    }

    height: auto;
    padding: 10px;
    background: $cGhostWhite;
    color: $cGhostWhite;
    position: relative;
    .thumbnail-category-section{
        height: 200px;
        width: auto;   
    }
    .title{
      font-size: 25px;
      color: $cBlackGray;
      &:hover{
        text-decoration: none;
      }
    }
    
    }
  }
}
}
</style>
