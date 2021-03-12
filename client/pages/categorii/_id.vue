<template>
  <div class="container-articles">
    <h1><b>Articole din categoria {{category}}</b></h1>
    <div v-if="articles[0]!=null" class="article-grid">
      <landscapeArticleCard  class="grid-component"  v-for="article of articles " :key="article._id"  :article="article" ></landscapeArticleCard>
    </div>
    <div v-if="articles[0]==null" class="article-grid">
    <h1><b>Nu există articole în această categorie...</b></h1>
    <h1><b>Dar dacă vrei să existe contactează-ne;)!</b></h1>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

import topArticleCard from '../../components/top_article_card';
import gridArticleCard from '../../components/grid_article_card';
import topIndexComponent from '../../components/top_index_component';
import landscapeArticleCard from '../../components/landscape_article_card';


export default {
    components:{
      topArticleCard,
      gridArticleCard,
      topIndexComponent,
      landscapeArticleCard,
    },

    async asyncData({$axios,route}) {
      let articles = [];
      await $axios.$get(`/api/v1/articles?category=${route.params.id}`)
      .then(response => {articles = response.data;});

      let category = route.params.id;
    return { articles, category }; // equivalent to { products: products }
    },
          head() {
    return {
      title: `Articole din categoria ${this.category}`,
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `Articole din categoria ${this.category}`
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `Biblioteca de articole Vacalmu din categoria ${this.category}`
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://i.ibb.co/KXd2MJD/thumbnail-defaul-vacalmu.png'
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content:  `Articole din categoria ${this.category}`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content:  `Articole din categoria ${this.category}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Biblioteca de articole Vacalmu din categoria ${this.category}`
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
          content:  `Articole din categoria ${this.category}`
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
  background-color: $cBlackGray;

@include sm{
.container-articles {

  color: $cGhostWhite;
  margin: 50px auto 10px auto;
  width: 100%;
  max-width: 1620px;
  min-height: 100vh;
  @include flexbox();
  @include justify-content(flex-start);
  @include align-content(center);
  @include flex-direction(column);
  h1{
    margin: 50px 20px;

     
  }
  .article-grid{
    @include flexbox();
    @include align-items(center);
    @include justify-content(center);
    @include flex-direction(row);
      flex-wrap: wrap;
    
  }
  .grid-component{
    margin: 0.3vw;
  }
}
}
}
</style>
