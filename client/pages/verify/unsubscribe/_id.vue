<template>
  <div class="container-about">
    <h1>Dezabonare completa!</h1>
    <h2>Ne pare rău să te vedem că pleci...:(</h2>
  </div>
</template>


<script>
import axios from 'axios';


export default {

     async mounted()  {
      const email = this.$route.params.id;

      await axios.post(`/api/v1/email/unsubscribe`,{

            'email': email,

          })
      .then()
      .catch(err => console.log(err));
      },
    head() {

    return {

      title: 'Dezabonare email',
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `Dezabonare email`
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `Dezabonare email`
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://i.ibb.co/QktgbyZ/default.png'
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content:  `Dezabonare email`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content:  `Dezabonare email`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Dezabonare email`
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
          content:  `Dezabonare email`
        }
      ]
    }
  }
}
</script>



<style lang='scss' >

@import "../../../assets/flex";
@import "../../../assets/colors";
@import "../../../assets/screen-size";
@import "../../../assets/transition";

$neu-shadow: 9px 9px 16px rgba(163,177,198,0.6);

$new-shadow-active: 0px 0px 20px 12px rgba(0,0,0,0.1);

.container-about {
  margin: 0 auto 10px auto;
  width: 100%;
  max-width: 1620px;
  min-height: 100vh;
  color: $cBetterBlack;
  text-align: center;
  @include flexbox();
  @include justify-content(center);
  @include align-content(center);
  @include flex-direction(column);


}
</style>
