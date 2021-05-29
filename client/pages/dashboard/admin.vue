<template>
  <div class="big-index-dash-wrapper">
    <h1>Generate invitation link</h1>
    <br>
    <input id="title" v-model="linkName"  placeholder="Title" autocomplete="off"/>
    <br>
    <p v-if="linkOName!==''">{{linkOName}}:{{ link}}</p>
    <br>
    <button v-if="linkName!==''" id="post-button" class="button" @click="generateInvitation()">Generate invitation link</button>
    <br>
    <div class="activeLinkCardGrid">
      <div v-for="names in liveInvitation" :key="names" class="activeLinkCard">{{names.name}}</div>
    </div>
    <br>
    <br>
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
      <post-card  v-for="article in articles"  :key="article._id" :article="article"></post-card>
      <br>
    </div>
  </div>

    <h1 v-if="!articles[0]" style="color: gray">Looks like you should add some articles! :)</h1><h1 id="title" contenteditable="true" data-text="Title"></h1>
  </div>
</template>

<script>

import postCard from '../../components/post_card';
import axios from 'axios';
import Post_card from '../../components/post_card.vue';

export default {
    middleware: 'only-admin',
    layout: 'dashboard',
    components:{
      postCard,
    },
    data () {
        return {
            linkName: '',
            link: '',
            linkOName: '',
            searchArticle: '',
            searchedArticles: [],
            searchQuery:'',
        }
    },
    computed: {
        name ({$store}) {
          return $store.state.user.name;
      }
    },
    mounted() {
      this.link = window.location.host + '/register?generatorToken='
    },

    async asyncData({$axios, store, route}) {
      let liveInvitation = [];
      store.state.user._id;
      await $axios.$get(`/api/v1/auth/getTokens`)
      .then(response => {liveInvitation = response.data;});

      const searchQuery = route.query.search;
      let articles = [];
      if(!searchQuery){
      await $axios.$get(`/api/v1/articles?state=ready`)
      .then(response => {articles = response.data;});
      }
      else{
      await $axios.$get(`/api/v1/articles/search?search=${searchQuery}`)
      .then(response => {
          articles = response.data;
          });
      }



      return { liveInvitation, articles};
    },
    methods: {
     async generateInvitation(){
        await axios.post(`/api/v1/auth/createToken`,{
            'name': this.linkName,
            },
          {withCredentials: true})
          .then(response => {this.link = this.link + response.data.token; this.linkOName = response.data.name});
      },
        resetSearch(){
            this.searchArticle = '';
            this.searchedArticles = [];
    },

    searchArticles(){
      window.history.pushState('page2', 'Title', `/dashboard/admin?search=${this.searchQuery}`);
      location.reload();
    }
    },
}
</script>

<style lang="scss">

@import "../../assets/flex";
@import "../../assets/screen-size";
@import "../../assets/transition";
@import "../../assets/colors";

body{

 .big-index-dash-wrapper{
  color:$cBlackGray;
  margin-left: 190px; /* Same as the width of the sidenav */
  padding: 0px 10px;
  @include flexbox();
  @include justify-content(center);
  @include flex-direction(column);
  h1{
        font-size: 70px;
        font-weight: bold;
        color: $cBetterBlack;
        padding-left: 20px;
  }
  h2{
    padding: 20px;
  }
 #title {
    width: 900px;
    padding:10px;
    font-size: 30px;
    border: none;


    &:focus{
        border-left: 2px solid gray;
        outline: none;

    }
    &:active{
        border-left: 2px solid gray;
        outline: none;

    }
   }
.activeLinkCardGrid{
  @include flexbox();
  @include justify-content(center);
  @include flex-direction(row);
  width: 800px;
  padding: 10px;
  .activeLinkCard{
    padding: 10px;
    margin: 10px;
    background: $cBlackGray;
    color: $cGhostWhite;
  }
}
  .container-articles-wrapper{
    width: 100%;
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
              background-color: white;
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

              height:55px;
              width:auto;
              background-color: white;
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
.button {
    width: 300px;
    background-color: $cBlackGray;
    border: none;
    color: $cGhostWhite;
    padding: 13px 32px;
    text-align: center;
    text-decoration: none;

    font-size: 16px;
    margin: 4px 2px;
    border: solid 0.5px $cBlackGray;
    @include transition(all, 0.3s, linear);

    cursor: pointer;
    &:hover{
        background-color: $cGhostWhite;
        color: $cBlackGray;
    }


}

 }

}

</style>
