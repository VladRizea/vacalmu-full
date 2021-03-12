<template>
  <div class="container-articles">

    <div  class="search-bar">
        <b-icon v-if="searchArticle === ''" class="icon" id="bold" icon="search" ></b-icon>
        <b-icon v-if="searchArticle !== ''" class="icon x" id="bold" icon="x" size="4"  @click="resetSearch()"></b-icon>
        <input id="search" v-model="searchArticle"  placeholder="Caută un articol" autocomplete="off"/>
        <br>
    </div>

    <div v-if="!searchedArticles[0]" class="article-grid">
      <gridArticleCard  class="grid-component"  v-for="article of articles " :key="article._id"  :article="article" ></gridArticleCard>
    </div>
    
    <div v-if="searchedArticles[0]" class="article-grid">
      <gridArticleCard  class="grid-component"  v-for="article of searchedArticles " :key="article._id"  :article="article" ></gridArticleCard>
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
        searchArticle: '',
        searchedArticles: [],
      }
    }, 

    async asyncData({$axios}) {
      let articles = [];
      await $axios.$get(`/api/v1/articles`)
      .then(response => {articles = response.data;});
    return { articles }; // equivalent to { products: products }
    },
    mounted(){

        let app = this;

        document.getElementById('search').addEventListener('keydown',async function(){
        if(app.searchArticle === '') app.searchedArticles = [];
        await axios.get(`/api/v1/articles/search?search=${app.searchArticle}`)
        .then(response => { 
            app.searchedArticles = response.data.data;
            });
        });
    },
    methods:{
        resetSearch(){
            this.searchArticle = '';
            this.searchedArticles = [];
    },
      async logOutUser(){
           await axios.get('/api/v1/auth/logout',{
            'email': this.email,
            'password': this.password,
            },
          {withCredentials: true})
          .then( this.$store.commit('set', false), this.$store.commit('setUser', null), this.$router.push({path: '/'}))
          .catch( this.$store.commit('set', false), this.$store.commit('setUser', null), this.$router.push({path: '/'}));
      }
  },
      head() {
    return {
      title: `Articole VACALMU`,
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Articole'
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'Biblioteca de articole Vacalmu'
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://i.ibb.co/KXd2MJD/thumbnail-defaul-vacalmu.png'
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: 'Articole'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Articole'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Biblioteca de articole Vacalmu'
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
          content: 'Articole'
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



.container-articles {
  margin: 50px auto 10px auto;
  width: 100%;
  max-width: 1620px;
  min-height: 100vh;
  @include flexbox();
  @include justify-content(flex-start);
  @include align-content(center);
  @include flex-direction(column);
    .search-bar{
    @include flexbox();
    @include justify-content(center);
    @include flex-direction(row);
    background: $cGhostWhite;
    width: 300px;
    height: 60px;
    margin:  50px 0px 50px 40px ;
    .icon{
  
        color: gray;
        margin: auto 10px;
        font-size: 35px;
    }
    .x{
        &:hover{
        color: $cErrorRed;
        cursor: pointer;
        }
    }
    #search{
        font-size: 20px;
        border: none;
        background: $cGhostWhite;
        color: gray;
        &:focus{
            outline: none;
            color: $cGhostWhite;
            background: $cBlackGray;
        }
        &:active{
            outline: none;
            color: $cGhostWhite;
            background: $cBlackGray;
        }
    }
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
</style>
