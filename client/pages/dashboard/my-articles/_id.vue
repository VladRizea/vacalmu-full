<template>

<div id="editing-body">
	<br><br>
    <div id="container" >
        <input id="title" v-model="title"  placeholder="Title" autocomplete="off"/>
        <br><br>
        <textarea id="description" v-model="description"  placeholder="Description" autocomplete="off"></textarea>
        <br>


        <textarea id="content" v-model="content"  placeholder="Content" autocomplete="off"></textarea>

            <br>
        <input id="category" v-model="searchCat"  placeholder="Search category" autocomplete="off"/>
        <p v-if="category != ''" class="selected-category"> <span style="color:#090909">Selected category:</span> <span class="hover-tag" @click="category = ''">{{this.category}}</span> </p>
        <div v-if="searchCat != ''" class="search-results">
            <div class="category-Box" v-for="categorie of categories" :key="categorie.id" @click="setCategory(categorie.name)">
                {{categorie.name}}
            </div>
            <div v-if="newCat"  class="category-Box" @click="addCat()">
                {{newCat}}
            </div>
        </div>
        <br><br>
        <input id="tags" v-model="tagg"  placeholder="Set tags" autocomplete="off"/>
        <div v-if="tagg != ''" class="search-results">
            <div v-if="tagg" class="category-Box" @click="setTag()">
                {{tagg}}
            </div>
        </div>
        <p v-if="tags.length > 0" class="selected-category"> <span style="color:#090909">Selected tags:</span> <span class="hover-tag" v-for="tag in tags" :key="tag.id" @click="tags.pop(tag)">{{tag}} </span></p>
        <br><br>

        <input id="recomanded" v-model="recomandedArticlesQuery"  placeholder="Search articles to recomand" autocomplete="off"/>

           <p v-if="selectedArticles.length !== 0">Selected: {{selectedArticles.length}}</p>
           <p v-if="selectedArticles.length === 3">This is the max!</p>

            <div :class="{'select-article': true, 'added-article': selectedArticles.includes(article._id)}"  v-for="article in recomandedArticles" :key="article.id" :article="article" @click="selectArticle(article)">
              {{article.title}}
              <br><br>

            </div>

        <br><br>
                <div class="">
          <label for="file" class="custom-file-upload">
            Upload Thumbnail
        </label>
          <input  type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        </div>
        <br>
        <br>
        <img  v-if="thumbnailUrl"  :src="thumbnailUrl" alt="-">
        <div v-if="thumbnailUrl"><br></div>

        <input type="checkbox" name="checkbox" v-model="readyness" @click="setArtState()" id="checkbox">
        <label for="checkbox" class="switch"></label>
            <br>
            <div class="button-section">
        <button id="post-button" class="button" @click="saveArticle()">save project</button>
        <p v-if="thereWasAnError" class="error-text">{{thereWasAnError}}</p>

            </div>

        <button id="post-button" class="delete-button" @click="deleteArticle()">delete</button>


        <br>
        <br>
    </div>
</div>
</template>

<script>

import axios from 'axios';

import Vue from 'vue';

export default {
    middleware: 'restricted-routes',
    layout: 'dashboard',
    data(){

        return {
        linking: false,
        url: "",
        thumbnailUrl: '',
        thumbnailUrlModel: '',
        categories: [],
        category: '',
        openCat: false,
        searchCat: '',
        newCat: '',
        isThumbnail: '',
        tags:[],
        tagg: '',
        imaging: false,
        imgUrl: '',
        state: 'draft',
        imgName: '',
        readyness: false,
        thereWasAnError: '',
        title: '',
        content: '',
        description: '',

        recomandedArticles: [],
        recomandedArticlesQuery: '',
        selectedArticles: [],

        }

    },
        async asyncData({$axios, route}) {
        let article = [];
        await $axios.$get(`/api/v1/articles/${route.params.id}`)
        .then(response => {article = response.data ;});

        return {article}; // equivalent to { articles: articles }
    },
    mounted() {

        let app = this;
        this.title = this.article.title;
        this.description = this.article.description;
        this.content = this.article.content;
        this.category = this.article.category;
        this.tags = this.article.tags;
        this.thumbnailUrl = this.article.thumbnail;
        this.thumbnailUrlModel = this.article.thumbnail;
        this.thumbnailUrlSquare = this.article.thumbnailSquare;
        this.selectedArticles = this.article.recomandedArticles;
        app.state = this.article.state
        this.state === 'ready' ? this.readyness = true  : this.readyness = false;

    window.onbeforeunload = function() {
    return true;
    };

        document.getElementById('category').addEventListener('keydown',async function(){
        await axios.get(`/api/v1/categories/search?search=${app.searchCat}`)
        .then(response => {
            if(!response.data.data[0]) {app.newCat = app.searchCat;}
            app.categories = response.data.data;
            });
        });

        document.getElementById('recomanded').addEventListener('keydown',async function(){

        await axios.get(`/api/v1/articles/search?search=${app.recomandedArticlesQuery}`)
        .then(response => {
            app.recomandedArticles = response.data.data;
            });
        });



  },
  methods: {
      selectArticle(article){
        if (!this.selectedArticles.includes(article._id)) this.selectedArticles.push(article._id);
        else{
          for( var i = 0; i < this.selectedArticles.length; i++){
          if ( this.selectedArticles[i] === article._id) {
            this.selectedArticles.splice(i, 1);
          }

          }
        }

        this.recomandedArticlesQuery = '';
        this.recomandedArticles = [];

      },
     async deleteArticle(){
          if (confirm("Are you sure you want to delete this article?")){
            await axios.delete(`/api/v1/articles/${this.article._id}`)
          .then(response => window.location.href = "/dashboard/my-articles")
          .catch(erorr => this.thereWasAnError = 'There was an error and your article was not posted');
          }
      },
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
      selectArticle(article){
        if (!this.selectedArticles.includes(article._id)) this.selectedArticles.push(article._id);
        else{
          for( var i = 0; i < this.selectedArticles.length; i++){
          if ( this.selectedArticles[i] === article._id) {
            this.selectedArticles.splice(i, 1);
          }

          }
        }

        this.recomandedArticlesQuery = '';
        this.recomandedArticles = [];

      },
      setArtState(){
          this.readyness === false ? this.state = 'ready' : this.state = 'draft';
      },
      setTag(){
          this.tags.push(this.tagg);

          this.tagg = '';
      },
      async addCat() {

        if(!this.thumbnailUrlSquare) this.thereWasAnError = 'You need to add a square thumbnail first!'
        else{
         this.category = this.newCat;
        await axios.post(`/api/v1/categories`, {
            'name':  this.category,
            'thumbnail' : this.thumbnailUrlSquare
        })
        .then(()=>{document.getElementById('category').innerHTML = ""; this.categories = [];})
        .catch(err => {this.thereWasAnError = "There was an error"});}

         this.categories = [];
         this.searchCat = '';
         this.newCat= '';
      },

      setCategory(categoric){
          this.category = categoric;
          document.getElementById('category').innerHTML = "";
           this.categories = [];
           this.searchCat = '';
      },
    async saveArticle(){
        await axios.put(`/api/v1/articles/${this.article._id}`,{

            'title':this.title,
            'description': this.description,
            'content': this.content,
            'visible': false,
            'category':this.category,
            'thumbnail':this.thumbnailUrl,
            'tags':this.tags,
            'state' : this.state,
            'recomandedArticles' : this.selectedArticles,
          },)
          .then()
          .catch(erorr => {this.thereWasAnError = 'There was an error and your article was not posted'; console.log(erorr)});
    },

  }
}
</script>

<style  lang="scss">

@import "../../../assets/flex";
@import "../../../assets/screen-size";
@import "../../../assets/transition";
@import "../../../assets/colors";

#editing-body {
    margin-left: 160px; /* Same as the width of the sidenav */
  font-size: 28px; /* Increased text to enable scrolling */
  padding: 0px 10px;

.linking-field{
        @include flexbox();
        @include justify-content(center);
        @include flex-direction(row);

    .icon{
        color: gray;
    }
    .delete{
        &:hover{
            color: $cErrorRed;
        }
    }
}

#container{

margin-left: 50px;
.delete-button{
    background-color: $cGhostWhite;
    border: none;
    color: $cErrorRed;
    padding: 13px 32px;
    text-align: center;
    text-decoration: none;

    font-size: 16px;
    margin: 4px 2px;
    border: solid 0.5px $cErrorRed;
    @include transition(all, 0.3s, linear);

    cursor: pointer;
    &:hover{
        background-color: $cErrorRed;
        color: $cGhostWhite;
    }


}
.button-section{
        @include flexbox();
        @include justify-content(flex-left);
        @include flex-direction(row);
.button {
    background-color: $cBlackGray;
    border: none;
    color: $cGhostWhite;
    padding: 13px 32px;
    text-align: center;
    text-decoration: none;

    font-size: 16px;
    margin: 4px 2px;
    border: solid 0.5px $cBlackGray;
    @include transition(all, 0.3s, linear);

    cursor: pointer;
    &:hover{
        background-color: $cGhostWhite;
        color: $cBlackGray;
    }


}

.error-text{
    color: $cErrorRed;
    font-size: 20px;
    align-self: center;
    margin-left: 30px;
}

}
#content {
    width: 900px;
    height: auto;
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

 #title {
    width: 900px;
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
   &:hover{
    cursor: text;
    }
   }

#category{
    width: 400px;
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
}#recomanded{
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

    .select-article{
      &:hover{
        cursor: pointer;
        color: $cAccentColor;
      }
    }
    .added-article{

      color: $cAccentColor;

    }

#tags{
    width: 400px;
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

.custom-file-upload{
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    color: $cGhostWhite;
    font-size: 30px;
    background-color: $cBlackGray;
}

#file{
  display: none;
}


.hover-tag{
    &:hover{
        cursor: pointer;

    }
}

.selected-category{
    padding:10px;
    font-size: 30px;
    color: green;
}

.search-results{
    @include flexbox();
    @include justify-content(center);
    @include flex-direction(row);
    flex-wrap: wrap;
    .category-Box{
        margin: 5px;
        padding: 5px 15px;
        background-color: lightgreen;
        color: green;
        border-radius: 20px;
        display:block;
        &:hover{
            cursor: pointer;
            background-color: #c8fcc8;
        }
    }
}


#description {
    width: 900px;
    height: auto;
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

.switch {
  position: relative;
  display: block;
  width: 180px;
  height: 60px;
  background: lightgray;
  cursor: pointer;

  &:before {
    content: "Draft";
    background: $cGhostWhite;
    color: gray;
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translate(-5%, -50%);
    font-size: 14;
    width: 50%;
    height: 90%;
    display: grid;
    place-items: center;
    transition: all 250ms ease;
  }
}

#checkbox {
  display: none;
}

#checkbox:checked ~ .switch:before {
  left: 50%;
  content: "Ready";
}


#thumbnail{
    width: 900px;
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

#thumbnail-square{
    width: 900px;
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

img{
    width: 900px;
    height: auto;
}


 .url-input {
    width: 400px;
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
}

[contentEditable=true]:empty:before{
    content:attr(data-text);
    color:#888;
    &:hover{
    cursor: text;
    }
}

#tooltip {
    @include flexbox();
    @include justify-content(center);
    @include flex-direction(row);
    align-content: center;
    position:absolute;
    display: none;
    border-radius: 60px;
    transition: display 0s, left 0.2s ease,  0.2s ease;
    background: $cBlackGray;

}
#cal1{
    position:absolute;
    height:0px;
    width:0px;
    top:100px;
    left:100px;
    overflow:none;
    z-index:-100;
}
#cal2{
    position:absolute;
    height:0px;
    width:0px;
    top:0px;
    left:0px;
    overflow:none;
    z-index:-100;
}

.icon{
    margin: 10px;
    color: $cGhostWhite;
    cursor: pointer;
    &:hover{
    color: $cAccentColor;
    }
}


}
/* @keyframes spin {
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
} */
</style>





