<template>

<div class="login-big-wrapper">


<img src="/404.png" alt="404" class="unselectable"  unselectable="on">


</div>

</template>

<script>

export default {
    data(){
        return {

        }
    },
    mounted() {
        var makeUnselectable = function( $target ) {
    $target
        .addClass( 'unselectable' ) // All these attributes are inheritable
        .attr( 'unselectable', 'on' ) // For IE9 - This property is not inherited, needs to be placed onto everything
        .attr( 'draggable', 'false' ) // For moz and webkit, although Firefox 16 ignores this when -moz-user-select: none; is set, it's like these properties are mutually exclusive, seems to be a bug.
        .on( 'dragstart', function() { return false; } );  // Needed since Firefox 16 seems to ingore the 'draggable' attribute we just applied above when '-moz-user-select: none' is applied to the CSS

    $target // Apply non-inheritable properties to the child elements
        .find( '*' )
        .attr( 'draggable', 'false' )
        .attr( 'unselectable', 'on' );
};
    },
}
</script>

<style lang="scss" scoped>

@import "../assets/flex";
@import "../assets/colors";
@import "../assets/screen-size";
@import "../assets/transition";

html{
background: black !important;
}

body{
    background: black !important;
    align-content: center;
    .login-big-wrapper{
        background: black !important;
        @include flexbox();
        @include justify-content(center);
        @include flex-direction(column);
        height: 100vh;
        img{

            user-select: none;
            -moz-user-select: none;
            -webkit-user-drag: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            margin: 0 auto;
            height: auto;
            width:  350px;
            @include sm{
                width: 90%;
                height: auto;
            }
            .unselectable {
                /* For Opera and <= IE9, we need to add unselectable="on" attribute onto each element */
                /* Check this site for more details: http://help.dottoro.com/lhwdpnva.php */
                -moz-user-select: none; /* These user-select properties are inheritable, used to prevent text selection */
                -webkit-user-select: none;
                -ms-user-select: none; /* From IE10 only */
                user-select: none; /* Not valid CSS yet, as of July 2012 */

                -webkit-user-drag: none; /* Prevents dragging of images/divs etc */
            }
        }

}
}
</style>
