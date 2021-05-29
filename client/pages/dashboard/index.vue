<template>
  <div class="big-index-dash-wrapper">
    <h1>Welcome back {{name}}!</h1>
    <h2><a href="/">Go to index</a></h2>
      <div class="profile-image-section">
    <img class="profile-image" :src="thumbnailUrl" alt="">

    <div class="">
      <label for="file" class="custom-file-upload">
        Change Profile
    </label>
      <input  type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
    </div>

  </div>
    <br><br>
    <h2 v-if="draft[0]">Continue your last project</h2>
    <postCard v-if="draft[0]"  :article="draft[0]"></postCard>
    <h2 v-if="!draft[0]">You have no ongoing project!</h2>


  </div>
</template>

<script>

import axios from 'axios';


import postCard from '../../components/post_card';

export default {
    middleware: 'restricted-routes',
    layout: 'dashboard',
    components:{
      postCard,

    },
    data() {
      return {
        file: '',
        thumbnailUrl: '',
      }
    },
    computed: {
        name ({$store}) {
          return $store.state.user.name;
      },
        profilePicture({$store}) {
          return $store.state.user.profilePicture;
      }

    },
    mounted() {
       this.thumbnailUrl = this.$store.state.user.profilePicture
    },
    methods: {
    async handleFileUpload(){
         this.file = this.$refs.file.files[0];

            let formData = new FormData();

            formData.append('file', this.file);

        await axios.put( '/api/v1/users',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then((response) => {
              this.thumbnailUrl = response.data.location;

        })
        .catch(function(){
        });

      },


    },

    async asyncData({$axios, store}) {
      let articles = [];
      await $axios.$get(`/api/v1/articles?user._id=${store.state.user._id}`)
      .then(response => {articles = response.data ;});
      let draft = [];
      for(var i=0; i<=articles.length-1; i++){
        if(articles[i].state === 'draft'){

          draft[0] = articles[i];
          return { draft, articles }; // equivalent to { articles: articles }
        }
      }
      const thumbnailUrl = store.state.user.profilePicture

      return { draft, articles, thumbnailUrl };
    },

}
</script>

<style lang="scss">

@import "../../assets/flex";
@import "../../assets/screen-size";
@import "../../assets/transition";
@import "../../assets/colors";

body{

 .big-index-dash-wrapper{
  color:$cBlackGray;
  margin-left: 160px; /* Same as the width of the sidenav */
  padding: 0px 10px;
  @include flexbox();
  @include justify-content(center);
  @include flex-direction(column);
  h1{
    padding: 50px 0 0 100px;
    font-size: 50px;
    color: $cBlackGray;
  }
  h2{
    padding: 20px;
  }
  .hover-tag{
    &:hover{
        cursor: pointer;

    }
  }

.profile-image-section{

  @include flexbox();
  @include justify-content(center);
  @include flex-direction(row);

.profile-image{
        height: 200px ;
        width: 200px;
        border-radius: 200px;
      user-select: none;
        -moz-user-select: none;
        -webkit-user-drag: none;
        -webkit-user-select: none;
        -ms-user-select: none;
}
.custom-file-upload{
    display: inline-block;
    padding: 6px 12px;
    margin: 65px;
    cursor: pointer;
    color: $cGhostWhite;
    font-size: 30px;
    background-color: $cBlackGray;
}

#file{
  display: none;
}
}
 }
}

</style>
