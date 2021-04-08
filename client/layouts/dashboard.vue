<template>
<div class="big-wrapper">
        <div class="nav-bar-dashboard" id="navbar-left">

            <a href="/dashboard" v-if="$nuxt.$route.name === 'dashboard'">
                <div class="navbar-component" >
                    <b-icon class="icon" style="color:#9370db"  icon="house" font-scale="2.5" ></b-icon>
                    <p class="mouv" >Home</p>
                </div>
            </a>
            <a href="/dashboard" v-else-if="$nuxt.$route.name  !== 'dashboard'">
                <div  class="navbar-component" >
                    <b-icon class="icon"  icon="house" font-scale="2.5"></b-icon>
                    <p>Home</p>
                </div>
            </a>

            <a href="/dashboard/tutorial" v-if="$nuxt.$route.name === 'dashboard-tutorial'">
                <div class="navbar-component" >
                    <b-icon class="icon" style="color:#9370db"  icon="bar-chart-steps" font-scale="2.5" ></b-icon>
                    <p class="mouv" >Tutorial</p>
                </div>
            </a>
            <a href="/dashboard/tutorial" v-else-if="$nuxt.$route.name  !== 'dashboard-tutorial'">
                <div  class="navbar-component" >
                    <b-icon class="icon"  icon="bar-chart-steps" font-scale="2.5"></b-icon>
                    <p>Tutorial</p>
                </div>
            </a>


            <a href="/dashboard/article-editor" v-if="$nuxt.$route.name === 'dashboard-article-editor'">
                <div class="navbar-component" >
                    <b-icon class="icon" style="color:#9370db"  icon="journal-plus" font-scale="2.5" ></b-icon>
                    <p class="mouv">New article</p>
                </div>
            </a>
            <a href="/dashboard/article-editor" v-else-if="$nuxt.$route.name  !== 'dashboard-articleEditor'">
                <div  class="navbar-component" >
                    <b-icon class="icon"  icon="journal-plus" font-scale="2.5" ></b-icon>
                    <p >New article</p>
                </div>
            </a>

            <a href="/dashboard/my-articles"  v-if="$nuxt.$route.name[10] === 'm' && $nuxt.$route.name[11] === 'y' ">
                <div class="navbar-component" >
                    <b-icon class="icon" style="color:#9370db" icon="newspaper" font-scale="2.5"></b-icon>
                    <p class="mouv">My articles</p>
                </div>
            </a>

            <a href="/dashboard/my-articles" v-else-if="$nuxt.$route.name  !== 'dashboard-my-articles'">
                <div class="navbar-component" >
                    <b-icon class="icon"  icon="newspaper" font-scale="2.5"></b-icon>
                    <p>My articles</p>
                </div>
            </a>

            <a href="/dashboard/admin"  v-if="$store.state.user.role === 'admin'">
                <div class="navbar-component" >
                    <b-icon class="icon" icon="geo-fill" font-scale="2.5"></b-icon>
                    <p>Admin</p>
                </div>
            </a>

                <div class="navbar-component log-out-button">
                    <b-icon class="icon"  icon="box-arrow-left" font-scale="2.5" @click="logOutUser()"></b-icon>
                    <p  @click="logOutUser()">Log out</p>
                </div>


        </div>
        <Nuxt/>
</div>

</template>

<script>

import axios from 'axios';

export default {

  data(){
    return {

    }
  },
  mounted(){
    document.getElementById('navbar-left').addEventListener('mousedown', function (e) {
        e.preventDefault();
    });
  },
  methods:{
    async logOutUser(){
           await this.$axios.$get('/api/v1/auth/logout',
          {withCredentials: true})
          .then(window.location.href = "/login");
    },
  }
}
</script>

<style scoped lang='scss'>
@import "../assets/flex";
@import "../assets/colors";
@import "../assets/screen-size";
@import "../assets/transition";

.big-wrapper{
    background: $cGhostWhite;
    @include flexbox();
    @include flex-direction(row);
    .nav-bar-dashboard{
        height: 100%;
        width: 160px;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: $cBlackGray;
        overflow-y: hidden;
        padding-top: 20px;
        @include flexbox();
        @include justify-content(flex-start);
        @include flex-direction(column);
        align-content: center;
        .navbar-component{
            padding: 40px 20px 0  20px;
            @include flexbox();
            @include justify-content(flex-start);
            @include flex-direction(column);
            .icon{
                cursor: pointer;
                color: $cGhostWhite;
                margin: 0 auto;

            }
            .mouv{
                color:#9370db;
            }
            p{
                cursor: pointer;
                color: $cGhostWhite;
                margin: 0 auto;
                text-align: center;
            }
        }


    }
}

</style>
