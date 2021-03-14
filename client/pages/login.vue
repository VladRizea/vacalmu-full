<template>

<div class="login-big-wrapper">

<div class="wrapper-login">
 <img v-bind:src="photos[photoId]" alt="poze login">
  <div class="login-credentials">
        <div class="upper-login">
            <h1><b>Log in</b></h1>
            <form action="" class="login-form">
                <label for="rmail">Email</label>
                <br>
                <input type="email" placeholder="Email" v-model="email"/>
                <br>
                <label for="password">Parolă</label>
                <br>
                <div class="password-field-wrapper">
                    <input id="password-field-login" type="password" placeholder="Parolă" v-model="password">
                    <div class="icon-see-password-wrapper">
                        <b-icon v-if="!seePass" class="icon"  icon="eye-slash-fill" font-scale="2" @click="togglePass()"></b-icon>
                        <b-icon v-if="seePass" class="icon"  icon="eye-fill" font-scale="2" @click="togglePass()"></b-icon>
                    </div>
                </div>
                <p class="forgot-password"><b>Ai uitat parola?</b></p>
            </form>
        <p class="error-message">{{error}}</p>
        </div>
      <div class="login-buttons">
        <button class="button" @click="checkLogin()">Log in</button>
        <button class="button" @click=" redirect('/register')">sau Înregistrează-te</button>
      </div>
  </div>
</div>

</div>

</template>

<script>

import axios from 'axios';
import {getCookie} from "../middleware/getCookie.js";


export default {
    data(){
        return {
        email: '',
        password: '',
        error: '',
        seePass: false,
        photos: [
            'https://i.ibb.co/0qp364F/62268279-1226592240852050-1142304680486402412-n-min.jpg',
            'https://i.ibb.co/0qp364F/62268279-1226592240852050-1142304680486402412-n-min.jpg',
            'https://i.ibb.co/sqfZ52b/66145963-896780107360578-299023461868534578-n-min.jpg',
            'https://i.ibb.co/VgZXDSV/67917947-167225947780476-1583055570370244690-n-min.jpg',
        ]
        }
    },
    async asyncData({ $axios }) {
        const photoId = Math.floor(Math.random() * 3) + 1;
        return { photoId }
    },
    methods:{
        redirect(route){
            this.$router.push({path: route});
        },

        checkLogin: async function  ()  {
            this.error = '';
            if(!this.password || !this.email) this.error='Completează toate câmpurile!';
            else{

            await axios.post('/api/v1/auth/login',{
            'email': this.email,
            'password': this.password,
            },{withCredentials: true})
          .then((response) => {
             if(response.data.success === true) {
                    this.getLoggedUser();
              };
              })
              .catch(({ response: err }) => {
                if(err.status === 401)this.error='Email sau parolă greșite'; 
              });
              }

        },
        getLoggedUser: async function  ()  {
            await axios.get('/api/v1/auth/me',{withCredentials: true})
            .then((response) => {
                if(response.data.success === true){
                this.$store.commit('set', true), 
                this.$store.commit('setUser', response.data),
                this.$router.push({path: '/'});
                
                }
                else{
                    this.error = 'Something went wrong...'
                }
                });  
        },
        togglePass() {
            this.seePass = !this.seePass;
            var x = document.getElementById("password-field-login");
            if (x.type === "password") {
                x.type = "text";
            } else {
                x.type = "password";
            }
        }
    }
}
</script>

<style lang="scss">

@import "../assets/flex";
@import "../assets/colors";
@import "../assets/screen-size";
@import "../assets/transition";

body{
    background: $cBlackGray;
    align-content: center;
    .login-big-wrapper{
        @include flexbox();
        @include justify-content(center);
        @include flex-direction(column);  
        height: 100vh;  
    .wrapper-login{
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        @include flexbox();
        @include justify-content(center);
        @include flex-direction(row);
        border-radius: 20px  20px  20px 20px ;    
        height:600px;
        margin: 0 auto;
        .login-credentials{
            background: $cGhostWhite;
            color:$cBlackGray;
            height:600px;

            padding: 20px;
            @include xl(){border-radius: 0 20px    20px 0; };
            border-radius: 20px 20px 20px 20px;    
            @include flexbox();
            @include justify-content(space-between);
            @include flex-direction(column);
            .upper-login{
                h1{
                    font-size: 50px;
                }
                .login-form{
                    .password-field-wrapper{
                        @include flexbox();
                        @include justify-content(center);
                        @include flex-direction(row);
                        input{
                            padding: 10px;
                            background: $cGhostWhite;
                            height:50px;
                            width:250px;
                            border: solid 1px $cBlackGray;
                            @include transition(all, 0.3s, linear);
                            font-size: 20px;
                            &:focus{
                            background: $cGhostWhite;
                        }
                        }
                        .icon-see-password-wrapper{
                            background: $cBlackGray;
                            height:50px;
                            width:50px;
                            @include flexbox(); 
                            @include justify-content(center);
                            @include flex-direction(column);
                            align-content: center;
                            .icon{
                                margin:auto;
                                color: $cGhostWhite;
                                cursor: pointer;
                            }
                        }
                    }
                    input{
                        padding: 10px;
                        background: $cGhostWhite;
                        height:50px;
                        width:300px;
                        border: solid 1px $cBlackGray;
                        @include transition(all, 0.3s, linear);
                        font-size: 20px;
                        &:focus{
                        background: $cGhostWhite;
                        }
                    }
                    .forgot-password{
                        @include flexbox();
                        @include justify-content(flex-end);
                        &:hover{
                            cursor: pointer;
                            text-decoration: underline;
                        }
                    }
                    label{
                        font-size: 24px;
                        font-weight: bold; 
                    }
                }
                .error-message{
                    color: $cErrorRed;
                }
            }
            .login-buttons{
                @include flexbox();
                @include justify-content(center);
                @include flex-direction(column);
                .button {
                    background-color: $cBlackGray;
                    border: none;
                    color: $cGhostWhite;
                    padding: 13px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
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
            }
        }
        img{
            @include xl(){display: block;};
            display: none;
            height:600px;
            width: auto;
            border-radius: 20px 0  0 20px;
            
        }
    }
}
}
</style>
