<template>
  <div class="center">
  <div class="wrapper">
    <div class="inner">
      <div class="slide">
        <img src="https://images.pexels.com/photos/3309268/pexels-photo-3309268.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="imagine meniu deschis">
        <img src="https://images.pexels.com/photos/3269546/pexels-photo-3269546.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="imagine meniu deschis">
        <img src="https://images.pexels.com/photos/3325720/pexels-photo-3325720.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="imagine meniu deschis">
      </div>

      <div class="slide">
        <img src="https://images.pexels.com/photos/3721321/pexels-photo-3721321.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="imagine meniu deschis">
        <img src="https://images.pexels.com/photos/1722182/pexels-photo-1722182.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="imagine meniu deschis">
        <img src="https://images.pexels.com/photos/2020312/pexels-photo-2020312.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="imagine meniu deschis">
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