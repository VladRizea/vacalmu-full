<template>
  <div class="container-about">
    <h1><b>Termeni și condiții</b></h1>
    <div class="content">
      <p>
        Toate articolele prezente de pe acest website sunt rezultatul muncii noastre, astfel ne rezervăm dreptul la unicitate.<br><br>
        Articolele sunt inspirate de cultura populara contemporana sau evenimente actuale.<br> <br>
        VACALMU rezerva dreptul de a modifica in orice moment Termenii si conditiile de folosire, precum si Politica de confidentialitate fara o notificare prealabila. Asa ca va rugam sa vizitati aceasta sectiune periodic pentru a consulta termenii si conditiile.<br><br>
        Prin utilizarea siteului VACALMU accepti faptul că stocăm informaţiile de care avem nevoie pentru a imbunatatii experienta utilizatorilor.<br><br>
      </p>
    </div>
    
  </div>
</template>


<script>
import axios from 'axios';


export default {

    head() {
      title: "Termeni și condiții"
    return {
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `Articole din categoria ${this.category}`
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `Biblioteca de articole Vacalmu din categoria ${this.category}`
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://i.ibb.co/KXd2MJD/thumbnail-defaul-vacalmu.png'
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content:  `Articole din categoria ${this.category}`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content:  `Articole din categoria ${this.category}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Biblioteca de articole Vacalmu din categoria ${this.category}`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://i.ibb.co/KXd2MJD/thumbnail-defaul-vacalmu.png'
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: 'https://i.ibb.co/KXd2MJD/thumbnail-defaul-vacalmu.png'
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content:  `Articole din categoria ${this.category}`
        }
      ]
    }
  }
}
</script>



<style lang='scss' scoped>
  
@import "../assets/flex";
@import "../assets/colors";
@import "../assets/screen-size";
@import "../assets/transition";

body{
  background: $cGhostWhite;
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

  h1{
    margin: 50px 20px;
  }

  .content{
    justify-self: center;
    margin: 0 auto;
    width: 100%;
    max-width: 1000px;
    
    p{
      font-size: 32px;
    }
    
    
  }  

}

</style>
