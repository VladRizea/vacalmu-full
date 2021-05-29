<template>
  <div class="container-about">
    <h1>Verificare completa!</h1>
    <h2>Mulțumim pentru abonarea la newsletterul nostru!</h2>
    <div>Dacă vrei să nu mai primești vești de la noi <a :href=" 'https://vacalmu.live/dezabonare/' + email.email">dezabonează-te</a>!</div>
  </div>
</template>


<script>
import axios from 'axios';


export default {
    async asyncData({$axios, route}) {
      console.log(route.params.id);
      const email = route.params.id;
      await $axios.$post(`/api/v1/email/verify`,{

            'email': route.params.id,

          },)
      .then()
      .catch(err => console.log(err));
    return { email }; // equivalent to { products: products }
  },

    head() {
    return {
      title: 'Verificare email',
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `Verificare email`
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `Verificare email`
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://i.ibb.co/QktgbyZ/default.png'
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content:  `Verificare email`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content:  `Verificare email`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Verificare email`
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
          content:  `Verificare email`
        }
      ]
    }
  }
}
</script>



<style lang='scss' >

@import "../../assets/flex";
@import "../../assets/colors";
@import "../../assets/screen-size";
@import "../../assets/transition";

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
