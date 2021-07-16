import React,{useEffect} from 'react';
import $ from 'jquery';
import { relativeTimeRounding } from 'moment';

const Erase = () => {

    useEffect(()=>{
        var canvas=document.getElementById("canvas");
        var ctx=canvas.getContext("2d");
        var lastX;
        var lastY;
        var strokeColor = "red";
        var strokeWidth = 5;
        var mouseX;
        var mouseY;
        var canvasOffset=$("#canvas").offset();

        var offsetX = canvasOffset.left;
        var offsetY = canvasOffset.top;

        var isMouseDown=false;
        
        
        var a,b;
        //mouse button ek phlt ebuwama mouse pointer ek e weddi thin thana
        function handleMouseDown(e){
         // mouseX=parseInt(e.pageX-offsetX);
        //  mouseY=parseInt(e.pageY-offsetY);
         
          a=e._x; b=e._y;

        console.log(e);
        //  console.log("Down-cv-x=",offsetX,"-y=",offsetY,"-mpx=",mouseX,"-mpy=",mouseY)
          // Put your mousedown stuff here
          mouseX = e.pageX;
          mouseY = e.pageY;
          lastX=mouseX;
          lastY=mouseY;
          isMouseDown=true;
        }
        
        //mouse button ek release kalam
        function handleMouseUp(e){

          mouseX=parseInt(e.pageX-offsetX);
          mouseY=parseInt(e.pageY-offsetY);

        //  console.log("Up-cv-x=",offsetX,"-y=",offsetY,"-mpx=",mouseX,"-mpy=",mouseY)
          // Put your mouseup stuff here
          isMouseDown=false;
        }

        function handleMouseOut(e){
        //    mouseX=parseInt(e.pageX-offsetX);
        //    mouseY=parseInt(e.pageY-offsetY);

         //   console.log("OUt-cv-x=",offsetX,"-y=",offsetY,"-mpx=",mouseX,"-mpy=",mouseY)
            // Put your mouseOut stuff here
            isMouseDown=false;
          }

          function handleMouseclick(e){
            mouseX=parseInt(e.pageX-offsetX);
            mouseY=parseInt(e.pageY-offsetY);

            console.log("OUt-cv-x=",offsetX,"-y=",offsetY,"-mpx=",mouseX,"-mpy=",mouseY)
            
          }
        function handleMouseMove(e){
          //  mouseX = e.pageX - offsetX;
          //  mouseY = e.pageY - offsetY;

            mouseX = e.pageX;
            mouseY = e.pageY;

         //   console.log("Move-cv-x=",offsetX,"-y=",offsetY,"-mpx=",mouseX,"-mpy=",mouseY)
         
            // Put your mousemove stuff here
            if(isMouseDown){
              ctx.beginPath();
              if(mode === "pen"){
                ctx.globalCompositeOperation="source-over";

            //   ctx.moveTo(0,0);
            //   ctx.lineTo(mouseX,mouseY);
            //   ctx.beginPath();
                  ctx.moveTo(lastX,lastY);
                  ctx.lineTo(e.clientX,e.clientY);
              //  ctx.lineTo(10,mouseY);
                ctx.stroke();     
              }else{
                ctx.globalCompositeOperation="destination-out";
                ctx.arc(lastX,lastY,8,0,Math.PI*2,false);
                ctx.fill();
              }
              lastX=mouseX;
              lastY=mouseY;
            }
          }
          
          $("#canvas").mousedown(function(e){handleMouseDown(e);});
          $("#canvas").mousemove(function(e){handleMouseMove(e);});
          $("#canvas").mouseup(function(e){handleMouseUp(e);});
          $("#canvas").mouseout(function(e){handleMouseOut(e);});
          $("#canvas").click(function(e){handleMouseclick(e);});
          
          var mode="pen";
          $("#pen").click(function(){ mode="pen"; });
          $("#eraser").click(function(){ mode="eraser"; });
        
    },[]);
    return (
        <div style={{position: "relative",padding:"50px"
    }}>
            <canvas id="canvas" style={{width :"300px", height:"300px"
            ,border:"1px solid red"
        }} />
            <br/>
            <button id="pen">Pen</button>
          <button id="eraser">Eraser</button>
        </div>
    );
}

export default Erase;
