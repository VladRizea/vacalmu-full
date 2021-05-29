<template>
<div class="cards">
<div class="bigger">
  <div class="card content"  v-for="article in articles"  :key="article._id">
    <div class="card-content">
      <div class="card-img">
        <a :href="'/expuneri/' + article.slug"><img :src="article.thumbnail" :alt="article.slug"></a>
      </div>
      <a :href="'/categorii/' + article.category"><div class="card-label">{{article.category}}</div></a>
       <a :href="'/expuneri/' + article.slug">
        <div class="card-title">{{article.title}}</div>
       </a>
    </div>
  </div>

</div>

<client-only>
  <div class="smaller">
    <splide :options="options">
        <splide-slide v-for="article in articles"  :key="article._id">
          <div class="card content">
            <div class="card-content">
              <div class="card-img">
                <a :href="'/expuneri/' + article.slug"><img ref="cardImage" :src="article.thumbnail" :alt="article.slug"></a>
              </div>
              <a :href="'/categorii/' + article.category"><div class="card-label">{{article.category}}</div></a>
              <a :href="'/expuneri/' + article.slug">
                <div class="card-title">
                  {{article.title}}
                </div>
              </a>
            </div>
          </div>
        </splide-slide>
    </splide>
  </div>
</client-only>
<br><br>
</div>
</template>

<script>

export default {
    props: ['articles'],
    data() {
      return {
        articleThumbnail: '',
        options: {
          arrows: false,
          pagination: false,
          type   : 'slide',
          padding: {
            right: '10%',
            left : '10%',
          },
        }
      }
    },
    mounted() {

    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>

@import "../assets/screen-size";
@import "../assets/transition";
@import "../assets/flex";
@import "../assets/colors";

.cards {
  width: 100%;
  max-width: 1620px;
  margin: 0 auto;
  width: calc(100% - 2em);
    @include xl{
      .bigger{
      margin: 0 auto;
      display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-gap: 1em;
        grid-template-areas:
          "a a b c"
          "a a d d";
        width: 100%;
      }
      .smaller{
        display: none;
      }
    }
    @include lg{
    .bigger{
    margin: 0 auto;
    display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr 1fr;
      grid-gap: 1em;
      grid-template-areas:
        "a a"
        "a a"
        "b c"
        "d d";
      width: 80%;
    }
    .smaller{
        display: none;
    }
    }
    @include sm{
    width: calc(100%);
    .bigger{
      display: none;
    }
    .smaller{
      display: block;
      height: auto;
    }
    }
}

.card {
  @include sm{
    width: 95%;
   padding-top: 50%;
  }
  width: 100%;
  position: relative;
  transition: all 0.25s ease;
  cursor: pointer;
  font-weight: 300;
  &:last-child {
    margin-bottom: 0;
  }
  &:before {
    height: 0;
    content: "";
    display: block;
    padding-bottom: 47.36%;
  }
  &:nth-child(1) {
    grid-area: a;
  }
  &:nth-child(2) {
    grid-area: b;
  }
  &:nth-child(3) {
    grid-area: c;
  }
  &:nth-child(4) {
    grid-area: d;
  }
  &-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &-img {

    transition: all 0.75s ease;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    img {
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
      border-radius: 5px;

      transition: all 0.75s ease;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
        &:after {
      pointer-events: none;
      border-radius: 5px;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50%;
      content: "";
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0), black);
    }
  }
  &-label {
    position: absolute;
    top: .45rem;
    left: .45rem;
    background: $cBetterBlack;
    text-transform: uppercase;
    font-weight: 300;
    font-size: 0.8em;
    color: $cGhostWhite;
    padding: 0.5em;
    border-radius: 2px;
  }
  &-title {
    position: absolute;
    left: 1em;
    bottom: 1em;
    color: #d6dbeb;
    z-index: 5;
    font-size: 1em;
  }

  &:hover {
    @include sm{
    transform: scale(1);
     box-shadow: none;
    }
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.35);
    .form-title {
      &:before {
        filter: blur(3px);
        opacity: 0.7;
      }
    }
    z-index: 99;
  }
}


</style>
