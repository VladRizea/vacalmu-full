<template>
<div class="follow-us-cards">
  <div class='buttons-container'>
    <a target="_blank" href="https://www.instagram.com/vacalmu/" >
    <div class='button instagram'>
      <b-icon class="icon"  icon="instagram"></b-icon>
    </div>
    </a>

    <a target="_blank" href="https://www.tiktok.com/@vacalmu" >
    <div class='button tiktok'>
      <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>TikTok icon</title><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
    </div>
    </a>

    <a target="_blank" href="https://www.facebook.com/vacalmu">
    <div class='button facebook'>
      <b-icon class="icon"  icon="facebook"></b-icon>
    </div>
    </a>
    <a target="_blank" href="https://www.youtube.com/channel/UCcQ6h3RCM4jtIrpvpzrHu2g" >
    <div class='button youtube'>
      <b-icon class="icon"  icon="youtube"></b-icon>
    </div>
    </a>

  </div>
  <br><br>
</div>

</template>


<style scoped lang='scss'>


@import "../assets/screen-size";
@import "../assets/transition";
@import "../assets/flex";
@import "../assets/colors";



$neu-shadow: 9px 9px 16px rgba(163,177,198,0.6);

$new-shadow-active: 0px 0px 10px 6px rgba(0,0,0,0.1);


.follow-us-cards{

  max-width: 1620px;
  width:100%;
  margin: 0 auto;

.buttons-container {

  @include xl{
    @include flexbox();
    @include justify-content(space-between);
    @include flex-direction(row);
  }
    @include flexbox();
    @include justify-content(center);
    @include flex-direction(row);

  max-width: 1200px;
  width:100%;
  margin: 0 auto;
  height:auto;
  flex-wrap: wrap;
}

.button {
  @include flexbox();
  @include justify-content(center);
  @include flex-direction(row);
  border-radius: 50%;
  @include xl{
    width: 150px;
    height: 150px;
  }
  @include lg{
    width: 130px;
    height: 130px;
  }
  @include lg{
    width: 110px;
    height: 110px;
  }
  box-shadow: $neu-shadow;
  margin: 1em;
  background-color: $cGhostWhite ;
  transition-timing-function: ease-out;
   @include transition(all, 0.25s, ease);
  color: $cBetterBlack;
  .icon{
    width: 100%;
    height: auto;
    padding: 30%;

  }
  &:hover {
    // border: 2px solid white;
    cursor:pointer;
    box-shadow: $new-shadow-active;
    color: $cGhostWhite;
  }
}

.facebook:hover {
  background: #3b5998;
}

.twitter:hover {
  background: #1da1f2;
}

.instagram:hover {
  background:#C13584;
}

.tiktok {
  &:hover{
    background: black;
    svg{
      fill: $cGhostWhite;
}
  }
  svg{
    padding: 30%;
  }

}

.youtube:hover {
  background: #FF0000;
}


}
</style>
