<template>
  <div class="center">
  <div class="wrapper">
    <div class="inner">
      <div class="slide">
        <img src="https://i.ibb.co/KFHtnW9/slide-1-min.png" alt="imagine meniu deschis">
        <img src="https://i.ibb.co/k597brz/slide-2-min.png" alt="imagine meniu deschis">
        <img src="https://i.ibb.co/n6S3Xqn/slide-3-min.png" alt="imagine meniu deschis">
      </div>

      <div class="slide">
        <img src="https://i.ibb.co/JcsP02W/slide-4-min.png" alt="imagine meniu deschis">
        <img src="https://i.ibb.co/NYTMcKq/slide-5-min.png" alt="imagine meniu deschis">
        <img src="https://i.ibb.co/Y8hZMJz/slide-6-min.png" alt="imagine meniu deschis">
      </div>
    </div>
  </div>



</div>
</template>

<script>
export default {
      data () {
        return{
          isActive: false,
        }
    },
    mounted(){
const buttonsWrap = document.querySelector(".buttons");
const slides = document.querySelector(".inner");

setInterval(function() {

    if (!this.isActive) {
      slides.style.transform = "translateX(-0%)";
      this.isActive = true;




    } else {
      slides.style.transform = "translateX(-50%)";
      this.isActive = false;

    }

 }, 5000);

const clearActiveBtn = ()=>{
  Array.from(buttonsWrap.children).forEach(item => {
    item.classList.remove('active');
  })
}
    }
}
</script>

<style scoped lang='scss'>


@import "../assets/screen-size";
@import "../assets/transition";
@import "../assets/flex";
@import "../assets/colors";

.center {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
}

.wrapper {
  display: flex;
  grid-gap: 1em;
  overflow: hidden;
  width: 40em;
}

.inner {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.45, 0, 0.55, 1);
}

.slide {
  display: flex;
  grid-gap: 0.5em;

  & > img {
    user-select: none;
            -moz-user-select: none;
            -webkit-user-drag: none;
            -webkit-user-select: none;
            -ms-user-select: none;
    border-radius: 0.5em;
    display: block;
    width: calc(39em / 3);
  }
}

.buttons {
  display: flex;
  justify-content: center;
  grid-gap: 1em;
  margin-top: 2em;

  & > button {
    all: unset;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 5em;
    padding: 0.15em 2em;
    transition: all 300ms ease;

    &.active {
      background: rgba(255, 255, 255, 1);
    }

  }
}


</style>
