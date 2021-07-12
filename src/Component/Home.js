import React, { useEffect, useState } from 'react';
import axios from 'axios';
//mport 'p5';
//import pFive from 'p5';

const axiosFunc = () => {
  var url = "http://localhost:5000/b";
  //var url = 'http://localhost:5000/a';
  var id = 1;
  axios.post('http://localhost:5000/b', {
    firstName: 'Finn',
    lastName: 'Williams'
  })
    .then((response) => {
      // console.log(response);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  // console.log("response");
}









const Home = () => {
  //variable store inthe mouse x,y
  const [mx, setMx] = useState(50);
  const [my, setMy] = useState(10);
  const [startingX, setStartingX] = useState(0);
  const [letter,setLetter] =useState(" ");

  const [undo, setUndo] = useState([]);
  const [arrayIndex, setArrayIndex] = useState(0);



  //https://www.youtube.com/watch?v=wCwKkT1P7vY&list=PLN0tvDAN1yvSNbkHAwPzJ5O4pP_e2vyme&index=10

  //write text
  //https://www.youtube.com/watch?v=pRYF07gI8gk

  //https://www.youtube.com/watch?v=AGSH-9oc5Ds

  //add image
  //https://www.youtube.com/watch?v=qIAMY4s3K-k


  const canvasKeypress = (e) => {
    setLetter(e.key.toString());
    //check entre key is pressed or not
    if (e.keyCode === 13) {
      setMx(startingX);
      setMy(my + 20);//font size +4 
    }
    else if (e.keyCode === 8) {
      //when click backspace button
      canvasUndo();
    } else {
      //text input function call
      canvasWritetext(e);
      //call function save canvase data
      canvasDatasave();
    }
    console.log("keydown-" + e.key + "-" + 20 + "-" + 20);


  }


  const canvasClick = (e) => {
    //get mouse x-y positions to variable
    var canvasElement = document.getElementById("canvastag");
    var mouseX = 0; var mouseY = 0; var startingX = 0;
    mouseX = e.pageX - canvasElement.offsetLeft;
    mouseY = e.pageY - canvasElement.offsetTop;
    startingX = mouseX;
    //store values in variables
    setMx(mouseX);
    setMy(mouseY);
    setStartingX(startingX);
    console.log("canvasClickPosition X=" + mx + "---Y=" + my);
    // return false;
  }
  const canvasClear = () => {
    var canvasElement = document.getElementById("canvastag");
    var ctx = canvasElement.getContext("2d");
    var w = canvasElement.width;
    var h = canvasElement.height;
    ctx.clearRect(0, 0, w, h);

    // to set undo array index
    setArrayIndex(0);
  }

  const canvasDatasave = (e) => {
    // save the data canvas image as a
    var canvasElement = document.getElementById("canvastag");
    var ctx = canvasElement.getContext("2d");
    //get image data
    var w = canvasElement.width;
    var h = canvasElement.height;
    var canvasData = ctx.getImageData(0, 0, w, h);
    //save data as a list // -> var a =[];  a.push(value);
    setUndo([...undo, canvasData]);
    //undo and redo endexes
    setArrayIndex(undo.length);
    console.log(undo,arrayIndex);
  }

  const canvasRedu = () => {
    if ((arrayIndex !== 0) && (arrayIndex >= 0) && (undo.length !== 0)) {
      var count = arrayIndex + 1;
    setArrayIndex(count);
      // save the data canvas image as a
      var canvasElement = document.getElementById("canvastag");
      var ctx = canvasElement.getContext("2d");
      var w = canvasElement.width;
      var h = canvasElement.height;
      //put image to canvas
      ctx.putImageData(undo[count], w, h);
    }
  }


  const canvasUndo = (e) => {

    if ((arrayIndex !== 0) && (arrayIndex >= 0) && (undo.length !== 0)) {
     
      var count = arrayIndex - 1;
      setArrayIndex(count);

      // save the data canvas image as a
      var canvasElement = document.getElementById("canvastag");
      var ctx = canvasElement.getContext("2d");
      var w = canvasElement.width;
      var h = canvasElement.height;
      //put image to canvas
      ctx.putImageData(undo[count], w, h);
    }

  }

  const canvasWritetext = (e) => {
    var canvasElement = document.getElementById("canvastag");
    var ctx = canvasElement.getContext("2d");
    ctx.font = "10px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    var c = Math.floor(Math.random() * 1000);
    ctx.fillText(letter,mx,my);
  }

  const canvasMouseMove = (e) => {
    var canvasElement = document.getElementById("canvastag");
    var context = canvasElement.getContext("2d");

    context.font = "5px Arial";
    var cRect = canvasElement.getBoundingClientRect();              // Gets the CSS positions along with width/height
    var canvasX = e.clientX - canvasElement.offsetLeft; //- cRect.left;  //Math.round(e.clientX - cRect.left);        // Subtract the 'left' of the canvas from the X/Y
    var canvasY = e.clientY - canvasElement.offsetTop;// - cRect.top; //Math.round(e.clientY - cRect.top);   // positions to get make (0,0) the top left of the 
   
    setMx(canvasX);
    setMy(canvasY);
    //console.log("X: " + canvasX + ", Y: " + canvasY, canvasX, canvasY);

    //context.clearRect(0, 0, canvasElement.width, canvasElement.height);        // canvas
    //context.fillText("X: " + canvasX + ", Y: " + canvasY, canvasX, canvasY);
   
   //drawLine(e);
    
  }

const drawLine = (e)=>{
 
    var canvasElement = document.getElementById("canvastag");
    var ctx = canvasElement.getContext("2d");

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = "black";
    ctx.moveTo(mx,my);
    ctx.lineTo(e.clientX - canvasElement.offsetLeft, e.clientY - canvasElement.offsetTop);
    ctx.closePath();
    ctx.stroke();

    var canvas,
    context;
}
var canvas,context;
function dragStart(event) {
  console.log('dragStart');
}

function drag(event) {
  console.log('drag');

}

function dragStop(event) {
  console.log('dragStop');

}

/*
  canvas = document.getElementById("canvastag");
  context = canvas.getContext('2d');
  context.strokeStyle = 'purple';
  context.lineWidth = 6;
  context.lineCap = 'round';

  canvas.addEventListener('mousedown', dragStart, false);
  canvas.addEventListener('mousemove', drag, false);
  canvas.addEventListener('mouseup', dragStop, false);
*/


  useEffect(() => {}, []);

  return (
    <div>
      <h1>Home Page Test Api Data Transmition</h1>
      <button onClick={() => { axiosFunc(); }} >Send</button>
      <div>
        <button onClick={() => { canvasClear(); }} >Clear</button>
        <button onClick={() => { canvasRedu(); }} >Redu</button>
        <button onClick={() => { canvasUndo(); }} >undo</button>

      </div>
      <div class="sketch" id="divtagincanvas">
        <canvas
          id="canvastag"
         // onKeyPress={canvasKeypress}
         // onClick={canvasClick}
          onMouseMove={canvasMouseMove}
          tabIndex="0"
          style={{ backgroundColor: "white", width: "100%", height: "500px" }}
        >
        </canvas>
      </div>

    </div>
  );
}

export default Home;
