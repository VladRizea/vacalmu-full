<template>
  <div class="newsletter" @keypress.enter="sendEmailVerification()">
    <br>
    <p class="newsletter-title">Îți dăm de veste pe mail!</p>
    <p v-if="sent" class="newsletter-title">Ți-am trimis un email de confimare!</p>
    <p v-if="!sent" class="newsletter-subtext">Promitem să nu îți trimitem tâmpenii!</p>
    <br>
    <div v-if="!sent" class="newsletter-field-wrapper">
        <input type="email" placeholder="Email" v-model="newsletterEmail">
        <div class="send-button" @click="sendEmailVerification()"><b-icon class="icon"  icon="plus-circle-fill"></b-icon></div>
    </div>

    <br> <br>
  </div>
</template>

<script>

import axios from 'axios';

export default {

  data() {
    return {
      newsletterEmail: "",
      sent: false,
    }
  },
  methods: {
    async sendEmailVerification(){
      console.log(this.newsletterEmail);
        if(!this.validateEmail(this.newsletterEmail)) return 0;
        else{
        await axios.post('/api/v1/email/send-verification', {
          'email': this.newsletterEmail,
        })
        .then(this.sent = true)
        }
    },
    validateEmail(email)
      {
          var re = /\S+@\S+\.\S+/;
          return re.test(email);
      }
  },

  }
</script>

<style scoped lang='scss'>


@import "../assets/screen-size";
@import "../assets/transition";
@import "../assets/flex";
@import "../assets/colors";


.newsletter{
  text-align: center;
    /* The image used */
  background-image: url("../static/images/purple-back.jpg");

  /* Set a specific height */

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .newsletter-title{
    @include xl{
      font-size: 60px;
    }
    @include lg{
      font-size: 50px;
    }
    @include sm{
      font-size: 30px;
    }

    color: $cGhostWhite;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.4);
  }
  .newsletter-subtext{
    @include xl{
      font-size: 30px;
    }
    @include lg{
      font-size: 25px;
    }
    @include sm{
      font-size: 20px;
    }
    color: $cGhostWhite;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.4);
  }
  .newsletter-field-wrapper{
      @include flexbox();
      @include justify-content(center);
      @include flex-direction(row);
      input{
          padding: 10px;
          background: $cGhostWhite;
          height:55px;
          width:350px;
          @include sm{
            width: 60%;
          }
          border: none;
          border-radius: 4px 0 0 4px;
          @include transition(all, 0.3s, linear);
          font-size: 20px;
          &:focus{
          outline: none;
      }
      }
      .send-button{
          cursor: pointer;
          border-radius:0 4px  4px 0;
          background: $cGhostWhite;
          height:55px;
          width:auto;

          padding: 4px;
          @include flexbox();
          @include justify-content(center);
          @include flex-direction(column);
          align-content: center;
          .icon{
            font-size: 40px;
            padding: 10%;
            color: $cBetterBlack;
            cursor: pointer;
          }
      }
  }
}

</style>
