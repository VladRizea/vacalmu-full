<template>
  <div class="container-about">
    <div class="postcard">

      <div class="inner-postcard">
          <div class="postcard-title-stamp">
              <h1>Contactează-ne!</h1>
              <img src="images/timbru-tgv.png" alt="timbru targoviste">
          </div>
          <p>Dacă vrei să colaborăm sau doar să vorbești cu noi iti suntem la dispotiție la adresa: </p>
          <br>
          <p class="email-adress">contact.vacalmu@gmail.com</p>
          <br>
          <p>PS: Sau alunecă in dm pe <a href="https://www.instagram.com/vacalmu/">instagram</a> ;)</p>
          <a href=""></a>
      </div>

    </div>
  </div>
</template>


<script>
import axios from 'axios';


export default {

    head() {
    return {
      title: 'Contact | Email',
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `Contact | Email`
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `Contact | Email`
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://i.ibb.co/QktgbyZ/default.png'
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content:  `Contact | Email`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content:  `Contact | Email`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Contact | Email`
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
          content:  `Contact | Email`
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
  margin: 0 auto 10px auto;
  width: 100%;
  max-width: 1620px;
  min-height: 100vh;
  color: $cGhostWhite;
  @include flexbox();
  @include justify-content(center);
  @include align-content(center);
  @include flex-direction(column);

.postcard { // Postcard "inside"
  width: 100%;
  max-width: 750px;
  margin: 0px auto;
  padding: 10px 10px;
  background-image: url("../static/images/card.jpg");
  position: relative;
  border-radius: 3px;
  .inner-postcard{
    margin: 0px auto;
    padding: 10px 10px;
    border-radius: 3px;
    background-color: $cGhostWhite;
    color: $cBlackGray;
    .postcard-title-stamp{
      @include flexbox();
      @include justify-content(space-between);
      @include align-content(center);
      @include flex-direction(row);
      text-align: center;
      h1{
        @include lg{
          font-size: 30px;
        }
        @include sm{
            font-size: 20px;
        }
        align-self:center;
      }
      img{
        width: 30vw;
        max-width: 150px;
        height: auto;
      }
    }
    p{
      @include lg{
          font-size: 25px;
      }
      @include sm{
          font-size: 20px;
      }
      font-size: 30px;
    }
  }
}

}
</style>
