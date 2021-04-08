<template>
<div >
  <div v-if="!isOpen">
      <div class="nav-bar-dashboard" id="navbar-left">
        <div class="nav-bar-container">
          <a id="title" href="/">VACALMU</a>
          <b-icon class="icon"  icon="list" font-scale="2.5" @click="isOpen = true"></b-icon>
        </div>
      </div>
      <div class="cookie-policy-acceptance animationIn" v-if="cookiePolicy">
        <p>
          Continuă să navighezi siteul VACALMU acceptând cookie-urile noastre. Despre politica Cookie poți citi. <a href="/cookies">aici</a>
        </p>
        <div class="button" @click="setCookiesTrue()">
         <b>Accept</b>
        </div>
      </div>
    <Nuxt />

  </div>


  <div v-if="isOpen" class="open-menu">

      <div class="nav-bar-dashboard" id="navbar-left">
        <div class="nav-bar-container">
          <a id="title" href="/">VACALMU</a>
          <b-icon class="icon"  icon="list" font-scale="2.5"  @click="isOpen = false"></b-icon>
        </div>
      </div>

      <div class="link-column">
        <a class="link-button"  href="/expuneri" @click="isOpen=false">
                <p class=" link-button-text">Expuneri</p>
        </a>

        <a class="link-button"  href="/categorii" @click="isOpen=false">
                <p class=" link-button-text">Categorii</p>
        </a>

        <a class="link-button"  href="/despre" @click="isOpen=false">
                <p class=" link-button-text">Despre</p>
        </a>

        <a v-if="isLogged" class="link-button"  href="/dashboard" @click="isOpen=false">
                <p class=" link-button-text">Dashboard</p>
        </a>
        <div class="social-buttons-row">

          <a href="https://www.instagram.com/vacalmu">
            <div  class=" link-social-button">
                <b-icon class="icon"  icon="instagram"></b-icon>
            </div>
          </a>

          <a href="https://www.facebook.com/vacalmu">
            <div  class="link-social-button">
                <b-icon class="icon"  icon="facebook"></b-icon>
            </div >
          </a>

          <a href="https://www.twitter.com/vacalmu">
            <div  class="link-social-button">
                <b-icon class="icon"  icon="twitter"></b-icon>
            </div>
          </a>

          <a href="https://www.youtube.com/channel/UCcQ6h3RCM4jtIrpvpzrHu2g">
            <div class="link-social-button">
                <b-icon class="icon"  icon="youtube"></b-icon>
            </div>
          </a>
        </div>
      </div>

      <carousel class="carousel"></carousel>


  </div>

    <footer id="footer">
      <div>
        <div class="social-row">
          <div  class="credits-stacked">
            <a href="https://www.instagram.com/vacalmu/" class="social">Instagram</a>
            <a href="https://www.facebook.com/vacalmu" class="social">Facebook</a>
            <a href="https://www.twitter.com/vacalmu" class="social">Twitter</a>
            <a href="https://www.tiktok.com/@vacalmu" class="social">TikTok</a>
            <a href="https://www.youtube.com/channel/UCcQ6h3RCM4jtIrpvpzrHu2g" class="social">YouTube</a>
          </div>
          <div  class="credits-stacked">
            <a class="social" href="/politica-de-confidentialitate">Politica de confidențialitate</a>
            <a class="social" href="/cookies">Cookies</a>
            <a class="social" href="/contact">Contact</a>
          </div>
        </div>
          <div class="credits">
            ©2021 Vacalmu. Drepturi destul de rezervate
          </div>
        </div>
    </footer>
</div>

</template>

<script>

import carousel from '../components/carousel_component';
import { getCookie } from "../middleware/getCookie.js";

export default {
    components:{
      carousel,
    },
  data(){
    return {
      isOpen: false,
      cookiePolicy: false,
      isLogged: false,
    }
  },


  mounted(){

  if(getCookie('c_p') == '1') this.cookiePolicy = false;
  else this.cookiePolicy = true;

  },
  methods:{

    setCookiesTrue(){

      var cookieBlox = document.getElementsByClassName('cookie-policy-acceptance')[0];
      cookieBlox.classList.remove('animationIn');
      cookieBlox.classList.add('animationOut');


      var days = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    );
      document.cookie = "c_p=1;expires=" + days;

    }
  }
}
</script>

<style scoped lang='scss'>


@import "../assets/screen-size";
@import "../assets/transition";
@import "../assets/flex";
@import "../assets/colors";


html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;

}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

  .nav-bar-dashboard{
    height: 50px;
    width: 100%;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background-color: $cBlackGrayAccent;
    overflow-y: hidden;

    align-content: center;
    .nav-bar-container{
      @include flexbox();
      @include justify-content(space-between);
      @include flex-direction(row);
      align-self: center;
      width: 100%;
      max-width: 1620px;
      height: 50px;
      padding: 0 0.6vw;
      margin: 0 auto;
      .icon{
        color: $cGhostWhite;
        align-self: center;
        &:hover{
          cursor: pointer;
          opacity: 0.8;
        }

      }
      #title{
        color: $cGhostWhite;
        margin-left: 10px;
        font-size: 45px;
        align-self: center;

        &:hover{
          text-decoration: none;
        }
      }
      .login-button{
        margin-right: 10px;
        color: $cGhostWhite;
        font-size: 25px;
        align-self: center;

        &:hover{
          text-decoration: none;
        }
      }
    }


}


.cookie-policy-acceptance{


  @include xl(){
    @include flexbox();
    @include justify-content(flex-start);
    @include flex-direction(row);

    height: 100px;
  }

  @include lg(){
    @include flexbox();
    @include justify-content(flex-start);
    @include flex-direction(column);

    height: 200px;
  }

  @include flexbox();
  @include justify-content(flex-start);
  @include flex-direction(row);

  height: 100px;
  width: 100%;
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0;
  padding: 10px;
  background: $cBlackGrayAccent;
  color: $cGhostWhite;
  p{
    margin: auto;
    padding: 10px;
  }
  .button {
    width: 200px;
    background-color: $cGhostWhite;
    border: none;
    color: $cBlackGray ;
    padding: 10px 26px;
    text-align: center;
    text-decoration: none;
    font-size: 15px;
    margin: auto;
    border: solid 0.5px $cGhostWhite;
    @include transition(all, 0.3s, linear);

    cursor: pointer;
    &:hover{
        background-color: $cBlackGray ;
        color: $cGhostWhite;
    }
  }





}

.animationIn{
  transition: .8s;
  animation: slideIn .8s forwards;
  transform: translateY(0);
}

.animationOut{
  transition: 2s;
  animation: slideOut 2s forwards;
  transform: translateY(0);
}


@keyframes slideIn {
  0% {
    transform: translateY(140px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes slideOut {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(1000px);
  }
}

  #footer{
    width: 100%;
    background-color: $cBlackGrayAccent;
    overflow-y: hidden;
    margin-top: 50px;
    padding-top: 20px;
      @include flexbox();
      @include justify-content(space-between);
      @include flex-direction(row);
    .social-row{
      @include flexbox();
      @include justify-content(left);
      @include flex-direction(row);
      .credits-stacked{
        @include flexbox();
        @include justify-content(center);
        @include flex-direction(column);
        padding: 20px;
        .social{
          padding: 5px;
          color: $cGhostWhite;
          font-size: 15;
        }
      }

    }
    .credits{
      color: $cGhostWhite;
      align-self: center;
      text-align: left;
      padding: 20px;

    }
    .inima-footer{
      height: 280px;
      width: auto;
    }
  }


.open-menu{
  width: 100%;
  max-width: 1620px;
  min-height: 100vh;
  margin: auto;
  align-content: center;
  @include xl(){
    @include flexbox();
    @include justify-content(center);
    @include flex-direction(row);
  }
    @include flexbox();
    @include justify-content(center);
    @include flex-direction(column);
  background-color: $cBlackGray;
  .link-column{


    @include xl{
      margin: auto 10px;
    }

    margin: auto 0;


    .link-button{

        height: 75px;
        width: auto;
        background: $cGhostWhite;
        margin: 10px 0 0 0;
        @include flexbox();
        @include justify-content(center);
        @include flex-direction(row);
        padding: 0;
        &:hover{
        text-decoration: none;
        }
        .link-button-text{
          font-size: 35px;
          color: $cBlackGray;
          margin: auto auto;
          &:hover{
              text-decoration: none;
          }
        }
      }
    .social-buttons-row{

        margin:  0 auto;
        width: 345px;
        @include flexbox();
        @include justify-content(space-between);
        @include flex-direction(row);
      .link-social-button{
        margin: 10px 0 0 5px;

        align-content: center;
        justify-content: center;
          .icon{
              color: $cGhostWhite;
              justify-self: center;
              margin: auto auto;
              font-size: 50px;
          }
      }
    }
}
.carousel{
    @include lg(){
      display: none;
  }
  margin: auto 0;
}
}


</style>
