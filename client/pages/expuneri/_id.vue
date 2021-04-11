<template>
  <div class="container">
    <img class="thumbnail" :src="article.thumbnail" :alt="article.slug">
    <br>
    <p class="small-text">Expunere de <b>{{article.user.name}}</b> in categoria <b>{{article.category}}</b></p>
    <br>
    <h1 class="article-title">{{article.title}}</h1>
    <br>
    <p class="description component">{{article.description}}</p>
    <br>
    <time class=" small-text" :datetime="article.createdAt">{{new Intl.DateTimeFormat('ro-RO').format(article.createdAt.month)}}</time>
    <br><br><br><br>
    <div class="content" v-html="article.sanitizedHTML"></div>
    <br><br><br><br>
  </div>
</template>

<script>
import axios from 'axios';



export default {

    async asyncData({$axios, route}) {

    let article = [];

if (process.server) {
    await $axios.$get(`/api/v1/articles/?slug=${route.params.id}`)
    .then(response => { article = response.data[0] ;});

    } else {
      await $axios.$get(`/api/v1/articles/?slug=${route.params.id}`)
    .then(response => { article = response.data[0] ;});

    }


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

body{
  background: $cBlackGray;

@include xl{
.container {
  margin: 55px auto 10px auto;
  width: 100%;
  max-width: 1620px;
  min-height: 100vh;
  @include flexbox();
  @include justify-content(flex-start);
  @include align-content(center);
  @include flex-direction(column);
  .thumbnail{
      width: 90%;
      height: auto;
      padding: 5px;
      margin: 5px auto;
  }
  .article-title{
      font-size: 3.8vw;
      color: $cGhostWhite;
      width: 60%;
      margin: 5px auto;
      font-weight: bold;
  }
.description{
    color: $cGhostWhite;
    font-size: 1.8vw;
    width: 60%;
    margin: 5px auto;
    &:hover{
        text-decoration: none;
    }
  }
  .name-and-date{
  @include flexbox();
  @include justify-content(space-between);
  @include flex-direction(row);
   width: 60%;
   margin: 20px auto;
  }
  .small-text{
    color: $cGhostWhite;
    font-size: 1.2vw;
    width: 60%;
    margin: 0 auto;

  }
  .content{
    margin: 0 auto;
    width: 60%;
    color: $cGhostWhite;
    p{
      font-size: 22px;
    }
    h2{
      font-size: 45px;
    }
    img{
      width:100%;
    }
    iframe {
      width: 100% !important;
      height: 512px !important;
    }

  }
}
}

@include lg{
.container {
  margin: 55px auto 0.3vw auto;
  width: 100%;
  max-width: 1620px;
  min-height: 100vh;
  @include flexbox();
  @include justify-content(flex-start);
  @include align-content(center);
  @include flex-direction(column);
  .thumbnail{
      width: 100%;
      height: auto;
      padding: 0.6vw;
      margin: 0.6vw auto;
  }
  .article-title{
      color: $cGhostWhite;
      width: 95%;
      height: auto;
      margin: 0.6vw auto;
      font-weight: bold;
  }

  .description{
    color: $cGhostWhite;
    font-size: 18px;
    width: 95%;
    margin: 0.6vw auto;
    &:hover{
        text-decoration: none;
    }
  }

  .name-and-date{
  @include flexbox();
  @include justify-content(space-between);
  @include flex-direction(row);
   width: 95%;
   margin: 20px auto;
  }

  .small-text{
    color: $cGhostWhite;
    font-size: 14px;
    width: 95%;
    margin: 0 auto;
  }

  .content{
    margin: 0 auto;
    width: 95%;
    color: $cGhostWhite;
    p{
      font-size: 22px;
    }
    h2{
      font-size: 45px;
    }
    img{
      width:100%;
    }
    iframe {
      width: 100% !important;
      height: 512px !important;
    }
  }
}
}
}




</style>
