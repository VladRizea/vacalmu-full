<template>
<div class="register-big-wrapper">
    <div class="wrapper-register">
    <img v-bind:src="photos[photoId]" alt="poze register">
    <div class="register-credentials">
            <div class="upper-register">
                <h1><b>Înregistrare</b></h1>
                <form action="" class="register-form">
                    <label for="rmail">Nume utilizator</label>
                        <br>
                    <input type="name" placeholder="Nume utilizator" v-model="name"/>
                        <br>
                    <label for="rmail">Email</label>
                        <br>
                    <input type="email" placeholder="Email" v-model="email"/>
                        <br>
                    <label for="password">Parolă</label>
                    <br>
                    <div class="password-field-wrapper">
                        <input id="password-field-register" type="password" placeholder="Parolă" v-model="password">
                        <div class="icon-see-password-wrapper">
                            <b-icon v-if="!seePass" class="icon"  icon="eye-slash-fill" font-scale="2" @click="togglePass()"></b-icon>
                            <b-icon v-if="seePass" class="icon"  icon="eye-fill" font-scale="2" @click="togglePass()"></b-icon>
                        </div>
                    </div>
                </form>
            <p class="error-message">{{error}}</p>
            </div>
        <div class="register-buttons">
            <button class="button" @click="registerUser()">Înregistrează-te</button>
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
        name: '',
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
    mounted(){
        const generatorToken = this.$route.query.generatorToken;

    },
    methods:{

        registerUser: async function  ()  {

            const generatorToken = this.$route.query.generatorToken;

            this.error = '';
            if(!this.password || !this.email || !this.name )
            {this.error='Completează toate câmpurile!';
            }
            else{
            await axios.post('/api/v1/auth/register',{
            'generatorToken': generatorToken,
            'name': this.name,
            'email': this.email,
            'password': this.password,
            },
          {withCredentials: true})
          .then((response) => {
             if(response.data.success === true) {

                    this.getLoggedUser();
              };
              })
              .catch(({ response: err }) => {
                if(err.status === 400)this.error='Email sau parolă invalide';
              });
              }

        },

        getLoggedUser: async function  ()  {
            await axios.get('/api/v1/auth/me',{
                'Authorization' : 'Bearer' + getCookie('token'),
            })
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
            var x = document.getElementById("password-field-register");
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
    align-content: center;
.register-big-wrapper{
@include flexbox();
@include justify-content(center);
@include flex-direction(column);
height: 100vh;
    .wrapper-register{
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        @include flexbox();
        @include justify-content(center);
        @include flex-direction(row);
        border-radius: 20px  20px  20px 20px ;
        height:600px;
        margin: 0 auto;

    .register-credentials{
        background: $cGhostWhite;
        color:$cBlackGray;
        height:600px;
        width:auto;
        padding: 20px;
        @include xl(){border-radius: 0 20px    20px 0; };
        border-radius: 20px 20px 20px 20px;
        @include flexbox();
        @include justify-content(space-between);
        @include flex-direction(column);
        .upper-register{
            width:300px;
            h1{
                font-size: 50px;
            }
            .register-form{
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
        .register-buttons{
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
