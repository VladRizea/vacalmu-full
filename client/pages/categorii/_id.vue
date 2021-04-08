<template>
  <div class="container-articles">

  <h1><b>{{category.name}}</b></h1>

    <div class="article-grid">
      <gridArticleCard  class="grid-component"  v-for="article of category.articles " :key="article._id"  :article="article" ></gridArticleCard>
    </div>


  </div>
</template>

<script>
import axios from 'axios';

import topArticleCard from '../../components/top_article_card';
import gridArticleCard from '../../components/grid_article_card';


export default {
    components:{
      topArticleCard,
      gridArticleCard,
    },

    data () {
      return{
      }
    }, 

    async asyncData({$axios, route}) {
      let category = [];
      await $axios.$get(`/api/v1/categories?name=${route.params.id}`)
      .then(response => {category = response[0];});
      console.log(category)
    return { category }; // equivalent to { products: products }
    },
    mounted(){
    },
    methods:{
        resetSearch(){
    },
  },
      head() {
    return {
      title: `${this.category.name} - VACALMU`,
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content:  `${this.category.name} - VACALMU`
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `Colectia de expuneri din categoria ${this.category.name}`
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://i.ibb.co/QktgbyZ/default.png'
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: `${this.category.name} - VACALMU`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.category.name} - VACALMU`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Colectia de expuneri din categoria ${this.category.name}'
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
          content: `${this.category.name} - VACALMU`
        }
      ]
    }
  }
}
</script>


<style lang='scss'>
  
@import "../../assets/flex";
@import "../../assets/colors";
@import "../../assets/screen-size";
@import "../../assets/transition";

body{
  background: $cBlackGray;
}

.container-articles {
  margin: 50px auto  10px auto;
  width: 100%;
  max-width: 1620px;
  min-height: 100vh;
  transition: height 1s;
  @include flexbox();
  @include justify-content(flex-start);
  @include align-content(center);
  @include flex-direction(column);


    h1{
      color: $cGhostWhite;
      margin: 50px 10px 50px 50px;
    }
    h2{
      color: $cGhostWhite;
      margin: 50px 10px 50px 10px;
    }

@include xl{  

    .article-grid{
    @include flexbox();
    @include align-items(center);
    @include justify-content(center);
    align-self: center;
    height: 560px;
    width: 95%;
    flex-wrap: wrap;
    height: auto;
    margin: 0; /* To remove default bottom margin */ 
    padding: 0; /* To remove default left padding */
  }


}
@include lg{  

   .article-grid{
    @include flexbox();
    @include align-items(center);
    @include justify-content(center);
    align-self: center;
    height: auto;
    flex-wrap: wrap;
    width: 95%;
    margin: 0; /* To remove default bottom margin */ 
    padding: 0; /* To remove default left padding */
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
    margin:10px;
    @include xl{
      flex-basis:  27.333333%;
    }
    @include lg{
      flex-basis: 45.333333%;
    }
    @include sm{
      flex-basis: 95%;
    }
  }
}

</style>

