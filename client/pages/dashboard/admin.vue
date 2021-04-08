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
    <div v-if="articles[0]">
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

import postCard from '../../components/post_card';
import axios from 'axios';

export default {
    middleware: 'only-admin',
    layout: 'dashboard',
    components:{
      postCard,
    },
    data() {
        return {
            linkName: '',
            link: '',
            linkOName: '',
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

    async asyncData({$axios, store}) {
      let liveInvitation = [];
      store.state.user._id;
      await $axios.$get(`/api/v1/auth/getTokens`)
      .then(response => {liveInvitation = response.data;});

      let articles = [];
      let articlesPublic = [];
      let articlesReady = [];
      let articlesDraft = [];
      const userId = store.state.user._id;
      await $axios.$get(`/api/v1/articles`)
      .then(response => {articles = response.data ;});

      for(var i=0; i<articles.length; i++){
        if(articles[i].state === 'public') articlesPublic.push(articles[i]);
        if(articles[i].state === 'ready') articlesReady.push(articles[i]);
        if(articles[i].state === 'draft') articlesDraft.push(articles[i]);
      }




      return { liveInvitation, userId, articles, articlesDraft, articlesReady, articlesPublic };
    },
    methods: {
     async generateInvitation(){
        await axios.post(`/api/v1/auth/createToken`,{
            'name': this.linkName,
            },
          {withCredentials: true})
          .then(response => {this.link = this.link + response.data.token; this.linkOName = response.data.name});
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
  background: $cGhostWhite;

 .big-index-dash-wrapper{
  color:$cBlackGray;
  margin-left: 190px; /* Same as the width of the sidenav */
  padding: 0px 10px;
  @include flexbox();
  @include justify-content(center);
  @include flex-direction(column);
  h1{
    padding: 50px 0 0 100px;
    font-size: 50px;
    color: $cBlackGray;
  }
  h2{
    padding: 20px;
  }
 #title {
    width: 900px;
    padding:10px;
    font-size: 30px;
    border: none;
    background: $cGhostWhite;

    &:focus{
        border-left: 2px solid gray;
        outline: none;
        background: $cGhostWhite;
    }
    &:active{
        border-left: 2px solid gray;
        outline: none;
        background: $cGhostWhite;
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
