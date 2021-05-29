<template>
<a :href="'/categorii/' + category.name">
  <div @mouseenter="changeText" @mouseleave="changeTextBack" class="category-card">
    <p v-if="name" class="category-name">{{category.name}}</p>
    <p v-if="!name && category.articlesNumber>1 || category.articlesNumber==0" class="category-name">{{category.articlesNumber}} EXPUNERI</p>
    <p v-else-if="!name" class="category-name">{{category.articlesNumber}} EXPUNERE</p>
  </div>
</a>
</template>

<script>
export default{
  props: ['category'],
  data() {
    return {
      name: true,
    }
  },
  mounted() {

  },
  methods: {
    changeText(){
      this.name = false;
    },
    changeTextBack(){
      this.name = true;
    }
  },
}
</script>

<style scoped lang='scss'>


@import "../assets/screen-size";
@import "../assets/transition";
@import "../assets/flex";
@import "../assets/colors";

.category-card{
    margin: 5px;

    padding: 10px;
    background-color: $cGhostWhite;
    border-radius: 5px;
    text-align: center;
    @include flexbox();
    @include justify-content(center);
    @include flex-direction(column);
    transition: all 0.25s ease;

      width: 90%;

    &:hover{
        background-color: $cBetterBlack;

        .category-name{
          color: $cGhostWhite;
        }
    }
    .category-name{
      text-transform: uppercase;
      color: $cBetterBlack;
      margin: auto 0;
      font-weight: bold;
      @include xl{
      font-size: 40px;
      }
      @include lg{
      font-size: 30px;
      }
      @include sm{
      font-size: 25px;
      }

      }
}

</style>
