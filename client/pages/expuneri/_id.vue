<template>
<div class="wrapper-general">

<div class="article-component-wrapper">
  <div class="article-component">
    <br><br>
    <a :href="'/categorii/' + article.category  "><p class="small-card-label">{{article.category}}</p></a>
    <br><br>
    <h1 class="article-title">{{article.title}}</h1>
      <div class="article-content">
        <p class="article-description">{{article.description}}</p>
        <br>
        <div class="article-author">
          <img class="profile-image" :src="article.publisher.profilePicture" :alt="article.publisher.name">
          <p class="author-name">de {{article.user.name}}</p>
        </div>
        <br>
        <br>
        <img class="article-thumbnail" :src="article.thumbnail" :alt="article.title">
        <br><br>

        <div class="article-content-text"  v-html="article.sanitizedHTML[0]"></div>
        <div class="article-content-text">
          <newsLetter></newsLetter>
        </div>
        <div class="article-content-text" v-html="article.sanitizedHTML[1]"></div>
        <br>
        <div class="article-content-text">
          <p >Tags: <span v-for="tag in article.tags" :key="tag">{{tag}}, </span> </p>
        </div>
      </div>
  </div>
  <moreArticles :articles="article.recomandedArticles"></moreArticles>
  <br><br>
  <FollowUsCards></FollowUsCards>
</div>
</div>
</template>

<script>
import axios from 'axios';

import moreArticles from "../../components/2more-articles"
import newsLetter from "../../components/2news-letter-component"
import TitleComponent from '../../components/2title-component.vue';
import FollowUsCards from '../../components/2follow-us-cards.vue';

export default {

  components:{
    moreArticles,
    newsLetter,
    TitleComponent,
    FollowUsCards,
  },

    async asyncData({$axios, route}) {

    let article = [];

    await $axios.$get(`/api/v1/articles/single/${route.params.id}`)
    .then(response => { article = response.data ;});

    article.sanitizedHTML = article.sanitizedHTML.split("+newsletter");


    return {article}; // equivalent to { articles: articles }
    },
    head() {
    return {

      title: `${this.article.title}`,
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.article.title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.article.description
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.article.thumbnail
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: this.article.title
        },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: `summary_large_image`
        },
        {
          hid: 'twitter:site',
          property: 'twitter:site',
          content: 'vacalmu.live'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.article.title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.article.description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.article.thumbnail
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: this.article.thumbnail
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.article.title
        }
      ],

script: [
      {
        src: "http://www.instagram.com/embed.js",
        async: true,
      },
    ],

    }
  }
}
</script>


<style lang='scss'>

@import "../../assets/flex";
@import "../../assets/colors";
@import "../../assets/screen-size";
@import "../../assets/transition";

.wrapper-general{
  padding-top: 50px;
.article-component-wrapper{
  height: auto;
  min-height: 100vh;
  width: 100%;
  max-width: 1620px;
  margin: 55px auto 0 auto;
  .article-component{
    height: auto;
    width: 95%;

    max-width: 1260px;
    margin: 0 auto;
    .small-card-label{
      width: auto;
      position:absolute;
      background: $cBetterBlack;
      text-transform: uppercase;
      font-size: 1em;
      color: $cGhostWhite;
      padding: 0.5em;
    }
    .article-title{
      font-weight: bold;
      font-size: 32px;
      @include xl{
      font-size: 50px;

      }
    }
    .article-content{
      width: 100%;
      max-width: 840px;
      .article-description{
        font-size: 22px;
      }
      .article-thumbnail{
        width: 100%;
        height: auto;
        border-radius: 5px;
        user-select: none;
          -moz-user-select: none;
          -webkit-user-drag: none;
          -webkit-user-select: none;
          -ms-user-select: none;
      }
      .article-content-text{
      margin: 0 auto;
      width: 95%;
      color: $cBetterBlack;
      p{
        font-size: 22px;
      }
      ul{
        font-size: 22px;
      }
      lI{
        font-size: 22px;
      }
      h2{
        font-size: 45px;
      }
      img{
        border-radius: 5px;
        width:100%;
        user-select: none;
          -moz-user-select: none;
          -webkit-user-drag: none;
          -webkit-user-select: none;
          -ms-user-select: none;
      }
      strong{
        color: $cLiliachiu;
      }
      a{
        text-decoration: underline;
        color: $cBetterBlack;
        &:hover{
          color: $cBetterBlackFaded;
        }
      }
      ::-moz-selection { /* Code for Firefox */
        color: $cGhostWhite;
        background: $cLiliachiu;
      }

      ::selection {
        color: $cGhostWhite;
        background: $cLiliachiu;
      }
      .video_wrapper { position: relative; padding-bottom: 56.25%; padding-top: 30px; height: 0; overflow: hidden; }

      .video_wrapper iframe, .video-container object, .video-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }

      }
      .article-author{
    @include flexbox();
    @include justify-content(flex-start);
    @include flex-direction(row);

        .profile-image{
          height: 70px;
          width: 70px;
          border-radius: 70px;
        user-select: none;
          -moz-user-select: none;
          -webkit-user-drag: none;
          -webkit-user-select: none;
          -ms-user-select: none;
        }
        .author-name{
          font-size: 20px;
          font-weight: bold;
          margin: auto 0 auto 10px;
        }
      }

    }

  }
}

}
</style>
