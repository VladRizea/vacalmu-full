<template>
<client-only>
  <div v-if="!isMobile" class="top-index-component">


<a class="link-button"  href="/Articole">
        <p class=" link-button-text">Articole</p>
</a>

<a class="link-button"  href="/categorii">
        <p class=" link-button-text">Categorii</p>
</a>

<a class="link-button"  href="/despre">
        <p class=" link-button-text">Despre</p>
</a>

    <button v-if="!isLg" class=" link-social-button">
        <b-icon class="icon"  icon="instagram"></b-icon>
    </button>

    <button v-if="!isLg" class="link-social-button">
        <b-icon class="icon"  icon="facebook"></b-icon>
    </button >
    
    <button v-if="!isLg" class="link-social-button">   
        <b-icon class="icon"  icon="twitter"></b-icon>
    </button>

    <button v-if="!isLg" class="link-social-button">
        <b-icon class="icon"  icon="youtube"></b-icon>
    </button>
    
  </div>
</client-only>
</template>

<script>
export default {
    props: ['article'],
    data(){
      return{
        isLg: false,
        isMobile: false,
        }
    },
    beforeMount() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      editProject(){
        this.$router.push({path: `/dashboard/my-articles/${this.article._id}`});
      },
    handleResize() {
        
        this.isLg = window.innerWidth <= 1024;
        this.isMobile = window.innerWidth <= 481;

    },
    },
    mounted(){
      this.windowWidth = window.innerWidth;
      window.addEventListener('resize', function(){
        this.windowWidth = window.innerWidth;
        
      }
      )
    }

}
</script>

<style lang="scss" scoped>

@import "../assets/screen-size";
@import "../assets/transition";
@import "../assets/flex";
@import "../assets/colors";

.top-index-component{


@include xl{
  display:none;
    @include flexbox();
  @include justify-content(flex-start);
  @include flex-direction(row);
  .link-button{
    
      height: 4.55vw;
      width: 27.5%;
      background: $cBlackGray;
      margin: 0.6vw 0.3vw 0 0.3vw;
      @include flexbox();
      @include justify-content(center);
      @include flex-direction(row);
      &:hover{
      text-decoration: none;
      }
      .link-button-text{
        font-size: 2vw;
        color: $cGhostWhite;
        margin: auto auto;
        &:hover{
            text-decoration: none;
        }
      }
    }
  .link-social-button{
    
    height: 4.55vw;
    width: 5vw;
    background: $cBlackGray;
    margin: 0.6vw 0.3vw 0 0.3vw;
    align-content: center;
    @include flexbox();
    @include justify-content(flex-start);
    @include flex-direction(row);
      .icon{
          color: $cGhostWhite;
          justify-self: center;
          margin: auto auto;
          font-size: 2vw;
      }
  }
}
@include lg{
  @include flexbox();
  @include justify-content(center);
  @include align-content(center);
  @include flex-direction(row);
  .link-button{
      
      height: 6vw;
      width: 150%;
      background: $cBlackGray;
      margin: 0.6vw 0.3vw 0 0.3vw;
      @include flexbox();
      @include justify-content(center);
      @include flex-direction(row);
      &:hover{
      text-decoration: none;
      }
      .link-button-text{
        font-size: 3vw;
        color: $cGhostWhite;
        margin: auto auto;
        &:hover{
            text-decoration: none;
        }
      }
    }
}

}

</style>
