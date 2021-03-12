<template>
  <div class="big-index-dash-wrapper">
    <h1>Welcome back {{name}}!</h1>
    <h2><a href="/">Go to index</a></h2>
    <br><br>
    <h2 v-if="draft[0]">Continue your last project</h2>
    <postCard v-if="draft[0]"  :article="draft[0]"></postCard>
    <h2 v-if="!draft[0]">You have no ongoing project! have this cute gif!</h2>
    <img  v-if="!draft[0]" class="gifff" src="https://i.giphy.com/media/QvBoMEcQ7DQXK/giphy.webp" alt="dog">
  </div>
</template>

<script>

import postCard from '../../components/post_card';

export default {
    middleware: 'restricted-routes',
    layout: 'dashboard', 
    components:{
      postCard,
    },
    computed: {
        name ({$store}) {
          return $store.state.user.name;
      }
    },
    async asyncData({$axios, store}) {
      let articles = [];
      store.state.user._id;
      await $axios.$get(`/api/v1/articles?user._id=${store.state.user._id}`)
      .then(response => {articles = response.data ;});
      let draft = [];
      for(var i=0; i<=articles.length-1; i++){
        if(articles[i].state === 'draft'){
          
          draft[0] = articles[i];
          return { draft, articles }; // equivalent to { articles: articles }
        }
      }
      return { draft, articles };
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
  margin-left: 160px; /* Same as the width of the sidenav */
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
  .hover-tag{
    &:hover{
        cursor: pointer;
        text-decoration: underline;
    }
  }
  .gifff{
    margin-left: 160px; /* Same as the width of the sidenav */
    padding: 0px 10px;
    height: auto;
    width: 400px;
  }
 }
} 

</style>
