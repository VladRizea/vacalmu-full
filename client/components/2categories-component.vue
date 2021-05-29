<template>
  <div class="categories-component" @keypress.enter="searchArticles()">
    <div>
    <br><br>
    <h2>Caută</h2>
    <br>
    <div class="search-field-wrapper">
        <input type="text" placeholder="Caută expuneri" v-model="searchQuery">
        <div class="send-button" @click="searchArticles()"><b-icon class="icon"  icon="search"></b-icon></div>

    </div>
    </div>
    <div>
    <br><br>
    <h2>Categorii</h2>
    <br>
    <categoryCard class="bigger"  v-for="category in categories"  :key="category._id" :category="category"></categoryCard>

<client-only>
    <div class="smaller">
      <splide :options="options">
          <splide-slide v-for="category in categories"  :key="category._id">
            <categoryCard :category="category"></categoryCard>
          </splide-slide>
      </splide>
    </div>
</client-only>
</div>
  </div>
</template>

<script>
import categoryCard from "./2category-card"

export default{
  data() {
    return {
      searchQuery: "",
        options: {
          arrows: false,
          pagination: false,
          type   : 'slide',
          padding: {
            right: '20%',
            left : '20%',
          },
        }
    }
  },
  props: ['categories'],
  components:{
    categoryCard,
  },
  methods: {
    searchArticles(){
      window.history.pushState('', '', `/expuneri?search=${this.searchQuery}`);
      location.reload();
    }
  },
}
</script>

<style scoped lang='scss'>


@import "../assets/screen-size";
@import "../assets/transition";
@import "../assets/flex";
@import "../assets/colors";

.categories-component{

  width: 100%;
  margin: 0 auto auto 0;
  @include flexbox();
  @include justify-content(flex-start);
  @include flex-direction(column-reverse);

  .bigger{
    display: none;
  }
  .smaller{
    display:  block;
    height: auto;
  }
  @include xl{
  max-width: 540px;
  width: 50%;
  @include flexbox();
  @include justify-content(flex-start);
  @include flex-direction(column);
    .smaller{
      display:  none;

    }
    .bigger{
      display: block;
    }
  }
  h2{
    font-size: 40px;
    font-weight: bold;
    color: $cBetterBlack;
    padding-left: 20px;
  }
  .search-field-wrapper{
    padding-top: 5px;
    width: 100%;
    @include xl{
      width: 90%;
    }
      @include flexbox();
      @include justify-content(center);
      @include flex-direction(row);
      input{
          padding: 10px;
          background: $cGhostWhite;
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
          background: $cGhostWhite;
          height:55px;
          width:auto;

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

</style>
