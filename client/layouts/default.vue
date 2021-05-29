<template>
<div >
  <div>
      <div class="nav-bar-dashboard" id="navbar-left">
        <div class="nav-bar-container">
          <a id="title" href="/">VACALMU</a>
          <div class="stacked-icons">
          <b-icon class="icon" id="menuButtonHam"  icon="list" font-scale="2.5" @click="toggleMenu()"></b-icon>
          <b-icon class="icon active" id="menuButtonX"  icon="x" font-scale="2.5" @click="toggleMenu()"></b-icon>
          </div>

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


  <div class="open-menu">

    <div class="overlay" id="overlay">
      <nav class="overlay-menu">
        <ul>
          <li ><a href="/expuneri">Expuneri</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </div>

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

    toggleMenu(){

      document.getElementById('overlay').classList.toggle('open');
      document.getElementById('menuButtonHam').classList.toggle('active');
      document.getElementById('menuButtonX').classList.toggle('active');
    },

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

<style  lang='scss'>

@import "../assets/colors";

body{
  background-color:$cGarme;
}

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
  width: 15px;
}
::-webkit-scrollbar-track {
  background: $cBetterBlack;        /* color of the tracking area */
}
::-webkit-scrollbar-thumb {
  background-color: #383838;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3.5px solid #101010;  /* creates padding around scroll thumb */
}

  .nav-bar-dashboard{
    height: 50px;
    width: 100%;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background-color: $cBetterBlack;
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
      .stacked-icons{
        position: relative;
        .icon{
          position: absolute;
          top: 5px;
          margin: 0 auto;
          right: 0;
          z-index: 50;
          color: $cGhostWhite;
          align-self: center;
          @include transition(all, 0.3s, linear);
          &:hover{
            cursor: pointer;
            opacity: 0.8;
          }
          &.active{
            top: -50px;

          }

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
  background: $cBetterBlack;
  color: $cGhostWhite;
  p{
    margin: auto;
    padding: 10px;
  }
  .button {
    width: 200px;
    background-color: $cGhostWhite;
    border: none;
    color: $cBetterBlack ;
    padding: 10px 26px;
    text-align: center;
    text-decoration: none;
    font-size: 15px;
    margin: auto;
    border: solid 0.5px $cGhostWhite;
    @include transition(all, 0.3s, linear);

    cursor: pointer;
    &:hover{
        background-color: $cBetterBlack ;
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
    background-color: $cBetterBlack;
    overflow-y: hidden;
    padding-top:50px;
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
 .overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  visibility: hidden;
  transition: opacity .35s, visibility .35s, width .35s;
  z-index: 50;

  &:before {
    content: '';
    background: $cBetterBlack;
    left: -55%;
    top: 0;
    width: 50%;
    height: 100%;
    position: absolute;
    transition: left .35s ease;
  }

  &:after {
    content: '';
    background: $cBetterBlack;
    right: -55%;
    top: 0;
    width: 50%;
    height: 100%;
    position: absolute;
    transition: all .35s ease;
  }

  &.open {
    opacity: 1;
    visibility: visible;
 width: 100%;
  min-height: 100vh;
  margin: auto;
  align-content: center;
    &:before {
      left: 0;
    }

    &:after {
      right: 0;
    }

    li {
      animation: fadeInRight .5s ease forwards;
      animation-delay: .35s;

      &:nth-of-type(2) {
        animation-delay: .45s;
      }
      &:nth-of-type(3) {
        animation-delay: .55s;
      }
      &:nth-of-type(4) {
        animation-delay: .65s;
      }
    }
  }
  nav {
    position: relative;
    height: auto;
    top: 30%;
    font-size: 60px;
    font-family: karla;
    font-weight: bold;
    text-align: center;
    z-index: 100;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    display: inline-block;
    position: relative;
    height: 100%;

    li {
      display: block;
      height: 25%;
      min-height: 50px;
      position: relative;
      opacity: 0;

      a {
        display: block;
        position: relative;
        color: $cGhostWhite;
        text-decoration: none;
        overflow: hidden;
         @include transition(all, 0.1s, linear);
        &:hover{
          opacity: 0.6;
        }
      }
    }
  }
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    left: 20%;
  }
  100% {
    opacity: 1;
    left: 0;
  }
}
}


</style>
