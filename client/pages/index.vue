<template>
<div class="grid-container">
  <div class="Title">
    <titleComponent></titleComponent>
  </div>
  <div class="top-article">
    <topArticleComponent   :articles="feed[0]" ></topArticleComponent>
  </div>
  <div class="newsletter"><newsletterComponent></newsletterComponent></div>
  <div class="latest-articles">
    <latestArticles :articles="feed[2]"></latestArticles>
    <categoriesComponent :categories="feed[1]"></categoriesComponent>
  </div>
  <div class="videos">

  </div>
  <div class="follow-cards">
    <followUsCards></followUsCards>
  </div>
  <div class="space"><br><br></div>
</div>
</template>

<script>
import axios from 'axios';

import topArticleCard from '../components/top_article_card';
import gridArticleCard from '../components/grid_article_card';

import titleComponent from '../components/2title-component';
import topArticleComponent from '../components/2top-article-component';
import newsletterComponent from '../components/2news-letter-component';
import latestArticles from '../components/2latest-articles';
import categoriesComponent from '../components/2categories-component';
import followUsCards from '../components/2follow-us-cards';


export default {
    components:{
      topArticleCard,
      gridArticleCard,
      titleComponent,
      topArticleComponent,
      newsletterComponent,
      latestArticles,
      categoriesComponent,
      followUsCards,

    },
    data() {
      return {
        newArticles: 3,
        showMoreArticlesButtons: true,
        options: {
          type   : 'loop',
          padding: {
            right: '5rem',
            left : '5rem',
          },
        },
      }
    },

    async asyncData({$axios}) {
      let feed = [];
      //articles based on their category logic
      await $axios.$get(`/api/v1/feed`)
      .then(response => {feed = response.content;});
    return { feed }; // equivalent to { products: products }
  },

    methods:{
      loadMoreArticlesNewest(){
        if(this.newArticles + 3 < this.articles[0].length)this.newArticles +=3;
        else if(this.newArticles + 3 >= this.articles[0].length)this.newArticles = this.articles[0].length - 1;
        else this.newArticles = this.articles[0].length - 1 ;

        if(this.newArticles == this.articles[0].length - 1 ) this.showMoreArticlesButtons = false;
      },



  },



    head() {
    return {
      title: 'VACALMU',
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'VACALMU'
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'Articole originale despre subiecte originale-ish'
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://i.ibb.co/QktgbyZ/default.png'
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: 'VACALMU'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'VACALMU'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Articole originale despre subiecte originale-ish'
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
          content: 'VACALMU'
        }
      ]
    }
  }
}
</script>



<style lang='scss'>

@import "../assets/flex";
@import "../assets/colors";
@import "../assets/screen-size";
@import "../assets/transition";

a:hover{
  text-decoration: none;
}

  .grid-container {
    margin-top: 50px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto auto auto auto auto auto;
    gap: 0px 0px;
    grid-template-areas:
      "Title Title Title"
      "top-article top-article top-article"
      "newsletter newsletter newsletter"
      "latest-articles latest-articles latest-articles"
      "videos videos videos"
      "space space space"
      "follow-cards follow-cards follow-cards";

  }


.Title {
  grid-area: Title;
  background-color: $cGarme;
}

.top-article {
  grid-area: top-article;
  background-color: $cGarme;
}

.latest-articles {
  grid-area: latest-articles;
  background-color: $cGarme;
  @include flexbox();
  @include justify-content(center);
  @include flex-direction(column-reverse);
  @include xl{
    @include flexbox();
    @include justify-content(center);
    @include flex-direction(row);
  }
}

.videos {
  grid-area: videos;
  background-color: $cGarme;
  }

.follow-cards {
  grid-area: follow-cards;
  background-color: $cGarme;
  }

.newsletter {
  grid-area: newsletter;
  background: transparent;
  background-color: transparent;
  }

.space {
  grid-area: space;
  background-color: $cGarme;
}

</style>
