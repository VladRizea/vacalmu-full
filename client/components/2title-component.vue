<template>
  <div class="title">
    <br>
    <h1>VACALMU</h1>
    <br>
  </div>
</template>

<script>

</script>

<style scoped lang='scss'>


@import "../assets/screen-size";
@import "../assets/transition";
@import "../assets/flex";
@import "../assets/colors";


.title{
  width: 100%;
  max-width: 1620px;
  margin: 0 auto;
  text-align: center;
  h1{
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    @include xl{
      font-size: 140px;
    }
    @include lg{
      font-size: 120px;
    }
    @include sm{
      font-size: 70px;
    }
    color: $cBetterBlack;
  }
}

</style>
