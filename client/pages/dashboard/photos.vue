<template>
  <div class="big-index-dash-wrapper">
    <h1>Photo archive</h1>

  <br><br>
  <div class="">
    <label for="file" class="custom-file-upload">
      Upload Photo
  </label>
    <input  type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
  </div>
  <br><br>
  <h2>{{thumbnailUrl}}</h2>
  <img  v-if="thumbnailUrl"  :src="thumbnailUrl" alt="-">
  <div v-if="thumbnailUrl"><br></div>
    <br><br>
  <input id="photo" v-model="photosQuerry"  placeholder="Search photos" autocomplete="off"/>
  <div v-if="searchedPhotos">
    <img v-for="photo in searchedPhotos" :key="photo.name" :src="photo.url" :alt="photo.name">
  </div>
  <br><br>
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
        photosQuerry: '',
        searchedPhotos: [],
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
    methods: {
  async handleFileUpload(){
          this.file = this.$refs.file.files[0];

              let formData = new FormData();

              formData.append('file', this.file);

          await axios.put( '/api/v1/upload',
                  formData,
                  {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
                }
              ).then((response) => {
                this.thumbnailUrl = response.data.data;

          })
          .catch(function(){
          });

        },
      submitFile(){

            let formData = new FormData();

            formData.append('file', this.file);

        axios.put( '/api/v1/users',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(response){
              this.$store.state.user.profilePicture = response.data;

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
      return { draft, articles };
    },
    mounted() {
      const app = this;
      document.getElementById('photo').addEventListener('keydown',async function(){

      await axios.get(`/api/v1/upload/search?search=${app.photosQuerry}`)
      .then(response => {
          app.searchedPhotos = response.data.data;
          });
      });

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
  min-height: 100vh;
  @include flexbox();
  @include justify-content(flex-start);
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

.custom-file-upload{
    display: inline-block;
    padding: 6px 12px;
    margin-left: 10px;
    cursor: pointer;
    color: $cGhostWhite;
    font-size: 30px;
    background-color: $cBlackGray;
}

#file{
  display: none;
}
#photo{
    width: 500px;
    padding:10px;
    font-size: 30px;
    border: none;
    background: $cGhostWhite;

    &:focus{
        border-left: 2px solid gray;
        outline: none;
        background: $cGhostWhite;
    }
    &:active{
        border-left: 2px solid gray;
        outline: none;
        background: $cGhostWhite;
    }

}
input {
  display: block;
  margin: 5px 0;
}
 }
}

</style>
