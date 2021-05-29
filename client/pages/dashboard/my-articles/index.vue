<template>
  <div class="big-wrapper-my-articles">
        <div  class="search-bar">
          <b-icon v-if="searchArticle === ''" class="icon" id="bold" icon="search" font-scale="2.2"></b-icon>
          <b-icon v-if="searchArticle !== ''" class="icon x" id="bold" icon="x" font-scale="3" @click="resetSearch()"></b-icon>
          <input id="search" v-model="searchArticle"  placeholder="Search article" autocomplete="off"/>
          <br>
        </div>

        <div v-if="searchArticle !== ''">
          <h2 style="margin: 20px">Results:</h2>
          <div v-for="article of searchedArticles" :key="article.id" class="released-articles">
            <postCard class="item content" :article="article"></postCard>
          </div>
        </div>

        <div v-if="searchArticle !== '' && !searchedArticles[0]">
          <h2 style="margin: 20px">There are no results for search : "{{searchArticle}}"</h2>
        </div>

        <div v-if="searchArticle === '' && articles[0]">
          <h2 v-if="articlesPublic[0]">Released Articles</h2>
          <div v-for="article of articlesPublic" :key="article._id" class="released-articles">
            <postCard  class="item content" :article="article"></postCard>
          </div>
          <h2 v-if="articlesReady[0]">Ready Articles</h2>
          <div v-for="article of articlesReady" :key="article._id" class="draft-articles">
            <postCard  class="item content"  :key="article._id"  :article="article"></postCard>
          </div>
          <h2 v-if="articlesDraft[0]">Draft Articles</h2>
          <div  v-for="article of articlesDraft" :key="article._id"  class="articles-wrapper">
            <postCard class="item content" :article="article"></postCard>
          </div>
        </div>

        <h1 v-if="!articles[0]" style="color: gray">Looks like you should add some articles! :)</h1><h1 id="title" contenteditable="true" data-text="Title"></h1>
  </div>
</template>

<script>
import axios from 'axios';

import postCard from '../../../components/post_card';
import { mapMutations } from 'vuex'

export default {
    middleware: 'restricted-routes',
    layout: 'dashboard',
    components:{
      postCard,
    },
    data () {
      return{
        searchArticle: '',
        searchedArticles: [],
      }
    },
    async asyncData({$axios, store}) {
      let articles = [];
      let articlesPublic = [];
      let articlesReady = [];
      let articlesDraft = [];
      const userId = store.state.user._id;
      await $axios.$get(`/api/v1/articles?publisher=${store.state.user._id}`)
      .then(response => {articles = response.data ;});
      for(var i=0; i<articles.length; i++){
        if(articles[i].state === 'public') articlesPublic.push(articles[i]);
        if(articles[i].state === 'ready') articlesReady.push(articles[i]);
        if(articles[i].state === 'draft') articlesDraft.push(articles[i]);
      }
    return { userId, articles, articlesDraft, articlesReady, articlesPublic}; // equivalent to { articles: articles }
  },
  methods: {
    resetSearch(){
        this.searchArticle = '';
        this.searchedArticles = [];
    }
  },
  mounted(){

      let app = this;

      document.getElementById('search').addEventListener('keydown',async function(){
        if(app.searchArticle === '') app.searchedArticles = [];
      await axios.get(`/api/v1/articles/search?search=${app.searchArticle},user._id=${this.userId}`)
      .then(response => {
          app.searchedArticles = response.data.data;
          });
      });
  }
}
</script>

<style lang="scss">

@import "../../../assets/flex";
@import "../../../assets/screen-size";
@import "../../../assets/transition";
@import "../../../assets/colors";
body{
.big-wrapper-my-articles{
  margin-left: 160px; /* Same as the width of the sidenav */
  padding: 0px 10px;
  width: 100VW;
.search-bar{
  @include flexbox();
  @include justify-content(center);
  @include flex-direction(row);
  .icon{
     margin: 65px 10px ;
     color: gray;

  }
  .x{
    &:hover{
      color: $cErrorRed;
      cursor: pointer;
    }
  }
  #search{
      width: 400px;
      font-size: 30px;
      border: none;
      background: $cGhostWhite;
      margin: 60px 0;
      &:focus{
          border-bottom: 2px solid gray;
          outline: none;
          background: $cGhostWhite;
      }
      &:active{
          border-bottom: 2px solid gray;
          outline: none;
          background: $cGhostWhite;
      }
  }
}
  .articles-wrapper{
      @include flexbox();
      @include justify-content(center);
      @include flex-direction(column);
      flex-wrap: wrap;
    }


}}

</style>
