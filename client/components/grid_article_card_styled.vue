<template>

 <div class="containerxx">
  <div class="card">
    <div class="card-front">
      <h2>Lorem<br>ipsum</h2>
      <h5>Lorem ipsum dolor sit amet</h5>
    </div>
    <div class="card-back">
      <div class="back-content">
        <p>Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
        <div class="purchase-content">
          <button type="button" class="purchase">Buy Now!</button>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>

export default {



    data() {
      return {
        isFlipped : false,
      }
    },

    props: ['article'],
    //32.5201219512195;

    methods: {
      editProject(){
        this.$router.push({path: `/dashboard/my-articles/${this.article._id}`});
      },
       truncate(str, n){
        return (str.length > n) ? str.substr(0, n-1) + '...' : str;
      },
      flip(){
        this.isFlipped = !this.isFlipped;
      }
    }
}
</script>

<style lang="scss" scoped>

@import "../assets/screen-size";
@import "../assets/transition";
@import "../assets/flex";
@import "../assets/colors";



@include xl{
.containerxx {
  transform: translate(-50%, -50%);
  
  &:hover .card {
    transform: rotateY(.5turn);
  }
}
.card {
  height: 300px;
  width: 100%;
  background: #00ACC1;
  transition: 1s;
  background: #ddd;
  transform-style: preserve-3d;
}
.card-front, .card-back {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.card-front {
  background: linear-gradient(220deg, #49e4bc, #bed0cb, #49b3e4);
  background-size: 600% 600%;
  animation: bg 12s ease infinite;
}
.card-back {
  transform: rotateX(.5turn);
  background: linear-gradient(220deg, #49e4bc, #bed0cb, #49b3e4);
  background-size: 600% 600%;
  animation: bg 12s ease infinite;
  backface-visibility: hidden;
  color: #fff;
}
@keyframes bg {
    0%{
      background-position: 87% 0%;
  }
    50%{
      background-position: 14% 100%;
  }
    100%{
      background-position: 87% 0%;
  }
}
h2 {
  font: {
    size: 3em;
  }
  text-align: center;
  padding: 2em;
  transform: translateZ(150px);
  color: #26A69A;
}
h5 {
  margin-top: -100px;
  text-align: center;
  color: #26A69A;
  transform: translateZ(75px);
}
p:nth-child(1) {
  padding: 3em;
  text-align: center;
}
.purchase {
  width: 150px;
  padding: 10px;
  font-size: 20px;
  outline: none;
  color: #fff;
  background-color: #4DB6AC;
  border: none;
  cursor: pointer;
  border-radius: 6px;
}
.purchase-content {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, 0);
}

}


@include lg{

  .gcard {
@include sm{
  width: 95%;
}
    margin: 0 auto;
    width: 90%;
    height: auto;
    
    position: relative;
    
    &__side {
      font-weight: bold;
      @include flexbox();
      @include justify-content(space-between);
      @include flex-direction(column);
      position: relative;

      transition: all 700ms ease;
      backface-visibility: hidden;
      
      &--front {
        padding: 10px;
        flex: 1 1 100%;
        background: $cGhostWhite;
        .thumbnail-grid-gcard{
          width:100%;
          height:auto;
          border-left: 3px solid black;
          border-top: 3px solid black;
        }

        .gcard-grid-content{
          height: 100px;
          flex: 1 1 auto;
          font-size: 19px;
          color: $cBlackGray;
          &:hover{
            text-decoration: none;
          }
        }
      }
      
      &--back {
        padding: 10px;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: $cGhostWhite;
        .back-and-category-grid-card{
          @include flexbox();
          @include justify-content(space-between);
          @include align-content(center);
          @include flex-direction(row);
          
          .small-text-grid-card{
            align-self: center;
            color: $cBlackGray;
          }
        }
        .description-grid-card{
          color: $cBlackGray;
          font-size: 19px;
        }
        .name-and-date-grid-card{
          @include flexbox();
          @include justify-content(space-between);
          @include flex-direction(row);
        }
        .small-text-grid-card{
          color: $cBlackGray;
        }

        transform: rotateY(180deg);
      }
    }
    
     .active_side-front {
      transform: rotateY(-180deg);
    }
    
    .active_side-back {
      transform: rotateY(0);
    }
  }

}

</style>
