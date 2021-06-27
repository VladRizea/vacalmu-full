<template>

<div>
<canvas id="myCanvas" width="10000" height="10000"></canvas>
</div>

</template>

<script>

import axios from 'axios';
import {getCookie} from "../middleware/getCookie.js";


export default {
mounted() {
function getSquare(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: 1 + (evt.clientX - rect.left) - (evt.clientX - rect.left)%10,
        y: 1 + (evt.clientY - rect.top) - (evt.clientY - rect.top)%10
    };
}

function drawGrid(context) {
    for (var x = 0.5; x < 301; x += 10) {
      context.moveTo(x, 0);
      context.lineTo(x, 301);
    }

    for (var y = 0.5; y < 301; y += 10) {
      context.moveTo(0, y);
      context.lineTo(301, y);
    }

    context.strokeStyle = "#ddd";
    context.stroke();
}

function fillSquare(context, x, y){
    context.fillStyle = "gray"
    context.fillRect(x,y,9,9);
}

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

drawGrid(context);

canvas.addEventListener('click', function(evt) {
    var mousePos = getSquare(canvas, evt);
    fillSquare(context, mousePos.x, mousePos.y)
}, false);
},
}
</script>


<style lang="scss">

</style>
