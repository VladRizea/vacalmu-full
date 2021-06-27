<template>
  <div class="latest-articles-component">
    <br><br>
    <h2>Ultimele expuneri</h2>
    <br>
    <latestArticles  v-for="article in articles"  :key="article._id" :article="article"></latestArticles>
        <client-only>

    </client-only>
    <br>
    <a href="/expuneri"><div class="more-articles"><p>Mai mult</p></div></a>
  </div>
</template>

<script>
import latestArticles from "./2small-article-card.vue"

export default{
  props: ['articles'],
  components:{
    latestArticles,
  },
}
</script>

<style scoped lang='scss'>


@import "../assets/screen-size";
@import "../assets/transition";
@import "../assets/flex";
@import "../assets/colors";

.latest-articles-component{
  max-width: 1080px;
  width: 100%;

  margin: auto 0 auto auto;
  @include flexbox();
  @include justify-content(flex-end);
  @include flex-direction(column);

@media (min-width: 350px) {
    .google-auto-placed {
      height: 180px;
    }
}
 @media (min-width: 500px) {
    .google-auto-placed {
      height: 130px;
    }
  }
 @media (min-width: 800px) {
    .google-auto-placed {
      height: 200px;
    }
  }

  h2{
    font-size: 40px;
    font-weight: bold;
    color: $cBetterBlack;
    margin-left: 20px;
  }
  .more-articles{
    margin: 0 auto;
    padding: 10px;
    background-color: $cGhostWhite;
    color: $cBetterBlack;
    border-radius: 5px;
    text-align: center;
    @include flexbox();
    @include justify-content(center);
    @include flex-direction(column);
    transition: all 0.25s ease;
    width: 180px;
    font-size: 30px;
    font-weight: bold;
    p{
      margin: 0;
    }
    &:hover{
      color: $cBetterBlackFaded;
      cursor: pointer;
    }

  }
}

</style>
