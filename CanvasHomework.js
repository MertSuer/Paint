var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var mouse = false;
ctx.lineJoin = "round";
ctx.lineCap = "round";
var positionX, positionY;

//brush
var saveLink = document.getElementById("saveLink");
var brush = document.getElementById("brush");
var eraser = document.getElementById("erase");

// color conditions
var color = document.getElementById("myColor");
var myColor =color.value;
ctx.strokeStyle = myColor;

var size = document.getElementById("myRange");
var mySize = size.value;
ctx.lineWidth = mySize;


color.addEventListener("change", colorChange);//color change

function colorChange(){
	myColor = color.value;
	ctx.strokeStyle = myColor;

}
// size change conditions
size.addEventListener("change",sizeChange);
function sizeChange(){
	mySize = size.value;
	ctx.lineWidth = mySize;

}

function getCoordinates(canvas, e) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};
}
function brushDraw(canvas, positionX, positionY){
	if(mouse==true){
          ctx.lineTo(positionX,positionY);
		  ctx.stroke();
		  canvas.style.cursor = "pointer";
	}
}

function brushDown(e) {
	mouse = true;
	var coordinates = getCoordinates(canvas, e);
	canvas.style.cursor = "pointer";
	positionX = coordinates.x;
	positionY = coordinates.y;
	ctx.beginPath();
	ctx.moveTo(positionX, positionY);
	ctx.lineTo(positionX, positionY);
	ctx.stroke();
}
function brushMove(e){

	var coordinates = getCoordinates(canvas,e);
	positionX = coordinates.x;
	positionY = coordinates.y;
	brushDraw(canvas, positionX, positionY);
	
	}
	function brushUp(){
		mouse = false;
		canvas.style.cursor = "default";

	}

function brushClick() {
	var brushColor = document.getElementById("myColor");
	ctx.strokeStyle = brushColor.value;
	brush.style.border = "2px solid red";
	eraser.style.border ="none";
    pencil.style.border ="none";
	canvas.addEventListener("mousedown", brushDown, false);
	canvas.addEventListener("mousemove", brushMove, false);
	canvas.addEventListener("mouseup", brushUp, false);
}
//eraser
function eraserClick(){
	ctx.strokeStyle="white";
	eraser.style.border ="2px solid red";
	brush.style.border ="none";
    pencil.style.border ="none";
	canvas.addEventListener("mousedown",brushDown,false);
	canvas.addEventListener("mousemove", brushMove, false);
	canvas.addEventListener("mouseup", brushUp, false);
}
var reset = document.getElementById("Reset");
//reset
function resetClick(){
	window.location.reload();

}
// save

function saveClick(){
	var data = canvas.toDataURL();//encodes image info into a base 64 format auto
	saveLink.href = data;
	 saveLink.download = "paint.png";

}
var pencil = document.getElementById("Pencil");
function pencilClick(){
	ctx.strokeStyle="myColor";
	pencil.style.border = "2px solid red";
	brush.style.border ="none";
	eraser.style.border ="none";
	canvas.addEventListener("mousedown",brushDown,false);
	canvas.addEventListener("mousemove", brushMove, false);
	canvas.addEventListener("mouseup", brushUp, false);
}
//event listeners for tools

brush.addEventListener("click", brushClick);//brush click event
eraser.addEventListener("click",eraserClick);
reset.addEventListener("click",resetClick);
saveLink.addEventListener("click",saveClick);
pencil.addEventListener("click",pencilClick);