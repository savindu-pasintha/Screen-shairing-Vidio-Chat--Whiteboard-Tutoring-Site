import React from 'react';
import io from 'socket.io-client';
import './style.css';
//import pf from 'p5';

class Board extends React.Component {
   
    timeout;

    urlorigin = "https://savinduapp.herokuapp.com" || "http://localhost:5000";
    socket = io(this.urlorigin, {
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "abcd"
        }
      });
   // socket = io.connect("https://savindube.herokuapp.com/");
   //  socket = io.connect("http://localhost:5000");
    ctx; //canvas getContext("2d")
    isDrawing = false;

    constructor(props) {
        super(props);

        this.socket.on("canvas-data", function (data) {
            var root = this;
            var interval = setInterval(function () {
                if (root.isDrawing) return;
                root.isDrawing = true;
                clearInterval(interval);
                var image = new Image();
                var canvas = document.querySelector('#board');
                var ctx = canvas.getContext('2d');
                image.onload = function () {
                    ctx.drawImage(image, 0, 0);
                    root.isDrawing = false;
                };
                image.src = data;
            }, 50)
        });

    
    }

    
    // page load time run
    componentDidMount() {
    this.drawOnCanvas();
    }

    componentWillReceiveProps(newProps) {
        this.ctx.strokeStyle = newProps.color;
        this.ctx.lineWidth = newProps.size;
    }

    drawOnCanvas() {

        //acces s the canvas element
        var canvas = document.querySelector('#board');

        this.ctx = canvas.getContext('2d');
        var ctx = this.ctx;

        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);

        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        var mouse = { x: 0, y: 0 };
        var last_mouse = { x: 0, y: 0 };

        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function (e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);

        /* Drawing on Paint App */
        ctx.lineWidth = this.props.size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.props.color;

        canvas.addEventListener('mousedown', function (e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);
        canvas.addEventListener('mouseup', function () {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        var root = this;

        var onPaint = function () {

            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();
           /*
           // Create circle
            const circle = new Path2D();
            ctx.beginPath();

            circle.arc(150, 75, 50, 0, 2 * Math.PI);
            ctx.fillStyle = 'red';
            ctx.fill(circle);

            ctx.closePath();
            ctx.stroke();
          */

            //when paint draw time execute
            if (root.timeout != undefined) clearTimeout(root.timeout);
            root.timeout = setTimeout(function () {
                var base64ImageData = canvas.toDataURL("image/webp");
                //send to server 
                root.socket.emit("canvas-data", base64ImageData);
            },100);
        };

        
        //clear button to white board clear
        var clearbtn = document.getElementById("clearbtn");
        clearbtn.addEventListener("click",
        function () {
            //console.log("clear btn");
            ctx = canvas.getContext("2d");
            var w = canvas.width;
            var h = canvas.height;
            ctx.clearRect(0, 0, w, h);},false);
        

        //write the word in the mouse click position
        document.addEventListener("keypress",
        function keyPress(e){
        
                var s = "100px"
                console.log(e.key, mouse.x, mouse.y);
                ctx.font = "50px Comic Sans MS";
                ctx.fillStyle = "red";
                ctx.textAlign = "center";
                ctx.fillText(e.key, mouse.x, mouse.y);
               
            }, false);
        
         //create tools draw
         var iconbtn = document.getElementById("iconbtn");
         iconbtn.addEventListener("click",
         function loadIcon(e){
             console.log("icon");
             ctx.beginPath();
             ctx.arc(95, 50, 40, 0, 2 * Math.PI);
             ctx.stroke();
           } ,false);
           
           //create tools draw
         var rectbtn = document.getElementById("rectbtn");
         rectbtn.addEventListener("click",
             function loadrect(e) {
                 console.log("rect");
                 ctx.beginPath();
                ctx.strokeRect(200,mouse.y, 50, 100);
           } ,false);
           
        
  
      
    }

   
  
 
render() {
    return (
        <div> 
             <button  id="clearbtn" >Clear</button>
             <button  id="textbtn" >text</button>
             <button  id="iconbtn" >icon</button>
             <button  id="rectbtn" >rect</button>
           
            <div class="sketch" id="sketch">
                <canvas width="100%" height="500px" className="board" id="board"></canvas>
            </div>
        </div>
       
    )
}
}

export default Board;