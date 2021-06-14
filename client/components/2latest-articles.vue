<template>
  <div class="latest-articles-component">
    <br><br>
    <h2>Ultimele expuneri</h2>
    <br>
    <client>
    <InFeedAdsense
    data-ad-layout-key="-g9+11-3r-ff+162"
    data-ad-client="ca-pub-3630292987556158"
    data-ad-slot="4113406495">
    </InFeedAdsense>
    </client>
    <latestArticles  v-for="article in articles"  :key="article._id" :article="article"></latestArticles>
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


  margin: auto 0 auto auto;
  @include flexbox();
  @include justify-content(flex-end);
  @include flex-direction(column);
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
