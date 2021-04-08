<template>
  <div class="container-about">
    <h1 id="despre">Despre</h1>

    <div class="content">
      <p>Bun venit la VACALMU sursa ta numărul 1 de informatie pentru apetitul tău de cititor.
      Misiunea noastră este să creem materiale cu care te poti identifica.</p>

    </div>
    
  </div>
</template>


<script>
import axios from 'axios';


export default {

    head() {
    return {
       title: 'Despre',
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `Despre proiectul VACALMU`
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `Despre proiectul VACALMU`
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://i.ibb.co/QktgbyZ/default.png'
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content:  `Despre proiectul VACALMU`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content:  `Despre proiectul VACALMU`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Despre proiectul VACALMU`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://i.ibb.co/QktgbyZ/default.png'
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: 'https://i.ibb.co/QktgbyZ/default.png'
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content:  `Despre proiectul VACALMU`
        }
      ]
    }
  }
}
</script>



<style lang='scss' >
  
@import "../assets/flex";
@import "../assets/colors";
@import "../assets/screen-size";
@import "../assets/transition";

body{
  background: $cBlackGray;
}
.container-about {
  margin: 50px auto 10px auto;
  width: 100%;
  max-width: 1620px;
  min-height: 100vh;
  @include flexbox();
  @include justify-content(flex-start);
  @include align-content(center);
  @include flex-direction(column);
  color: $cGhostWhite;

  h1{
    margin: 50px 20px;
  }

  .content{
    justify-self: center;
    margin: 0 auto;
    width: 95%;
    
    p{
      font-size: 18px;
    }
    
   
  }  

}

</style>
