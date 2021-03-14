<template>
  <div class="container-articles">
    <h1><b>Expuneri din categoria {{category}}</b></h1>
    <ul v-if="articles[0]!=null" class="article-grid">
      <gridArticleCard  class="grid-component"  v-for="article of articles " :key="article._id"  :article="article" ></gridArticleCard>
    </ul>
    <div v-if="articles[0]==null" class="article-grid">
    <h1><b>Nu există expuneri în această categorie...</b></h1>
    <h1><b>Dar dacă vrei să existe contactează-ne;)!</b></h1>
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

    async asyncData({$axios,route}) {
      let articles = [];
      await $axios.$get(`/api/v1/articles?category=${route.params.id}`)
      .then(response => {articles = response.data;});

      let category = route.params.id;
    return { articles, category }; // equivalent to { products: products }
    },
          head() {
    return {
      title: `Expuneri din categoria ${this.category}`,
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `Expuneri din categoria ${this.category}`
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `Biblioteca de Expuneri Vacalmu din categoria ${this.category}`
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://i.ibb.co/KXd2MJD/thumbnail-defaul-vacalmu.png'
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content:  `Expuneri din categoria ${this.category}`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content:  `Expuneri din categoria ${this.category}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Biblioteca de Expuneri Vacalmu din categoria ${this.category}`
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
          content:  `Expuneri din categoria ${this.category}`
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
    list-style: none;
    margin: 0; /* To remove default bottom margin */ 
    padding: 0; /* To remove default left padding */
  }
  .grid-component{
    margin: 5px 0;
  }
}
}
}
</style>
