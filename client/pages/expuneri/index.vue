<template>
  <div class="content-articles">

  <newsletterComponent></newsletterComponent>

  <div class="container-articles-wrapper">
    <div class="container-articles" @keypress.enter="searchArticles()">
      <br>
      <h1>Expuneri</h1>
      <br>
      <div class="article-search-field-wrapper">
          <input type="text" placeholder="Caută ceva" v-model="searchQuery">
          <div class="send-button"  @click="searchArticles()"><b-icon class="icon"  icon="search"></b-icon></div>
      </div>
      <br>
      <latestArticles  v-for="article in articles"  :key="article._id" :article="article"></latestArticles>
      <br>
    </div>
  </div>

  <followUsCards></followUsCards>
    </div>
</template>

<script>
import axios from 'axios';

import latestArticles from "../../components/2small-article-card.vue"
import newsletterComponent from '../../components/2news-letter-component';
import followUsCards from '../../components/2follow-us-cards';

export default {
    components:{
      latestArticles,
      newsletterComponent,
      followUsCards,
    },

    data () {
      return{
        searchArticle: '',
        searchedArticles: [],
        searchQuery:'',
      }
    },

    async asyncData({$axios, route}) {
      const searchQuery = route.query.search;
      let articles = [];
      if(!searchQuery){
      await $axios.$get(`/api/v1/articles?state=ready`)
      .then(response => {articles = response.data;});
      }
      else{
      await $axios.$get(`/api/v1/articles/search?search=${searchQuery}`)
      .then(response => {
        console.log(response.data);
          articles = response.data;
          });
      }
    return { articles, searchQuery }; // equivalent to { products: products }

    },
    mounted(){

    },
    methods:{
        resetSearch(){
            this.searchArticle = '';
            this.searchedArticles = [];
    },

    searchArticles(){
      window.history.pushState('page2', 'Title', `/expuneri?search=${this.searchQuery}`);
      location.reload();
    }
  },
      head() {
    return {
      title: 'Expuneri - VACALMU',
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Expuneri - VACALMU'
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'Colectia de expuneri Vacalmu'
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://i.ibb.co/QktgbyZ/default.png'
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: 'Expuneri - VACALMU'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Expuneri - VACALMU'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Colectia de expuneri Vacalmu'
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
          content: 'Expuneri - VACALMU'
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

.content-articles{

  margin: 50px auto auto auto;
  width: 100%;
  .container-articles-wrapper{
    width: 100%;
    background-color:$cGarme ;
      .container-articles{

      width: 100%;
      max-width: 1620px;
      min-height: 100vh;
      margin: 0 auto;
      h1{
        font-size: 70px;
        font-weight: bold;
        color: $cBetterBlack;
        padding-left: 20px;
      }
      .article-search-field-wrapper{
        padding-left: 20px;
        width: 90%;
          @include flexbox();
          @include justify-content(flex-start);
          @include flex-direction(row);
          input{
              padding: 10px;
              background: $cGhostWhite;
              height:55px;
              width:350px;
              @include sm{
                width: 60%;
              }
              border: none;
              border-radius: 4px 0 0 4px;
              @include transition(all, 0.3s, linear);
              font-size: 20px;
              &:focus{
              outline: none;
          }
          }
          .send-button{
              cursor: pointer;
              border-radius:0 4px  4px 0;
              background: $cGhostWhite;
              height:55px;
              width:auto;

              padding: 4px;
              @include flexbox();
              @include justify-content(center);
              @include flex-direction(column);
              align-content: center;
              .icon{
                font-size: 40px;
                padding: 10%;
                color: $cBetterBlack;
                cursor: pointer;
              }
          }
      }
      }
  }
  .background-image{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    object-fit: cover;
    width: 100%;
    z-index: -19;
  }

}


</style>

