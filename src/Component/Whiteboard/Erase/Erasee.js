import React, { useEffect, useRef, useState } from 'react';


import './Whiteboard.css';

const Erasee = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [toolName, setToolName] = useState("pen");
  const [emogi, setEmogi] = useState("");
   const[color,setColor]=useState("");
  const [count, setCount] = useState(0);
  const [oldStartPoint, setOldStartPoint] = useState([0,0])
  const [startPoint, setStartPoint] = useState([])
  const [keyStartPoint, setKeyStartPoint] = useState([0,0])
  const [annotations, setAnnotations] = useState([]);
  const [inputBox, setInputBox] = useState("hidden")
  const [disableInput, setDisableInput] = useState("")


  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const canvasRef2 = useRef(null);
  const contextRef2 = useRef(null);

  const canvasRef3 = useRef(null);
  const contextRef3 = useRef(null);



  useEffect(() => {

    //canvas define
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 600;
    canvas.style.width = "800px";
    canvas.style.height = "600px";

    const context = canvas.getContext("2d");
    //style the drawing point
    context.scale(1, 1);//pointer size
    context.lineCap = "round";//ponter shape
   // context.strokeStyle = color || "black";//pointer coloer
    context.lineWidth = 5;//pointer width
    contextRef.current = context;

    //canvas 2 define for images
    const canvas2 = canvasRef2.current;
    canvas2.width = 800;
    canvas2.height = 600;
    canvas2.style.width = "800px";
    canvas2.style.height = "600px";

    const context2 = canvas2.getContext("2d");
    //style the drawing point
    context2.scale(1, 1);//pointer size
    contextRef2.current = context2;


    //canvas 3 define for images
    const canvas3 = canvasRef3.current;
    canvas3.width = 800;
    canvas3.height = 600;
    canvas3.style.width = "800px";
    canvas3.style.height = "600px";

    const context3 = canvas3.getContext("2d");
    //style the drawing point
    context3.scale(1, 1);//pointer size
    contextRef3.current = context3;



  }, []);


  useEffect(() => {
    if (toolName === "Image") {
      
      //image loading canvas
      let img = document.getElementById(`img-${count}`);

      contextRef2.current.clearRect(0, 0, 800,600)
      contextRef2.current.drawImage(img, 0, 0, 800, 600);
    }
}, [count,toolName]);

//mouse down before mouse up
  const startDrawing = ({ nativeEvent }) => {
    setEmogi("");
    console.log("Hey you have started now!")
    const { offsetX, offsetY } = nativeEvent;
    setStartPoint([offsetX, offsetY]);
    contextRef.current.strokeStyle = color || "black";
    if(toolName !== "text"){
      setInputBox("hidden");
      setDisableInput("none")
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
      setStartPoint([offsetX, offsetY])
      
    }else if(toolName === "line"){
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
    }else{
      setOldStartPoint([startPoint[0], startPoint[1]]);
      setKeyStartPoint([offsetX, offsetY]);
      setStartPoint([offsetX, offsetY]);
    }

  };
  //mouse up after mouser down
  const finishDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const [startX, startY] = startPoint;
    contextRef.current.closePath();
    setIsDrawing(false);
    contextRef.current.strokeStyle = color || "black";//pointer coloer
    if (toolName === "circle") {
      const a = (offsetX - startX);
      const b = (offsetY - startY)
      const length = (Math.sqrt((a * a) + (b * b)))
      const radius = length/2
      contextRef.current.beginPath();
      contextRef.current.globalCompositeOperation = "source-over";
      contextRef.current.arc((offsetX + startX)/2, (offsetY+ startY)/2, radius,0, 2 * Math.PI);
      contextRef.current.stroke();
    }
    else if (toolName === "rect") {
      contextRef.current.globalCompositeOperation = "source-over";
      contextRef.current.strokeRect(startX, startY, offsetX - startX, offsetY - startY);
      contextRef.current.closePath();
      setIsDrawing(false);
    }else if(toolName === "line"){
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
      contextRef.current.closePath();
    }else if(toolName === "text"){
    	setInputBox("")
    }
    
  }
  //mouse move event
  const draw = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    
    if (!isDrawing) {
      contextRef3.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      contextRef3.current.beginPath();
      contextRef3.current.moveTo(offsetX, offsetY);
      contextRef3.current.textAlign = 'left';
      contextRef3.current.font = "50px sans-serif";
      contextRef3.current.fillStyle = color || "black" ; 
      contextRef3.current.fillText( emogi ,offsetX, offsetY);
      contextRef3.current.closePath();
      return;
    }
     else if (toolName === "pen") {
      contextRef.current.globalCompositeOperation = "source-over";
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    } 
    else if (toolName === "eraser") {
      contextRef.current.globalCompositeOperation = "source-over";
      contextRef.current.clearRect(offsetX, offsetY, 20,20, Math.PI * 2, false);
    }

  }
//obtain the text in input onChange event
  function storeText(event){
  	/* console.log(event.target.value) */
    let txt = event.target.value;
  }
//draw the text here
  function drawText(event, blur = false){
  	
    console.log(event.target.value)
    	console.log(blur)
      
    //when Enter is pressed the text is drawn on canvas
    //and the input field is set to hidden
    if(event.code === "Enter" || blur === true){
    
    				contextRef.current.font = "bold 20px sans-serif"
    	      contextRef.current.textBaseline = "top"
            
    	      if(event.code === "Enter"){
    					contextRef.current.fillText(event.target.value,	keyStartPoint[0], keyStartPoint[1]);
    					event.target.value = ""
    	        setKeyStartPoint([keyStartPoint[0], keyStartPoint[1]+ 20])
    	      }
            else{
    				contextRef.current.fillText(event.target.value,
    	      oldStartPoint[0], oldStartPoint[1])
    					event.target.value = ""
            }
    	
    }
  }

  //when click the eraser button set tool name as a "eraser"
  const getEraser = () => {
    setToolName("eraser");
  }
  const getPen = () => {
    setToolName("pen");
  }
  const getRect = () => {
    setToolName("rect");
  }
  const getCircle = () => {
    setToolName("circle");
  }
  const getText = () => {
  	setToolName("text");
    setDisableInput("")
  }
  const getLine = () => {
  	setToolName("line");
  }
  const getEmogi = (emogiType) => {
  	setEmogi(emogiType);
  }

  const getColor = (color) => {
  	setColor(color);
  }



  const getImage = () => {
          //loading the annotations
          if(annotations.length > count){
            contextRef.current.putImageData(annotations[count], 0, 0);
          }
          else{
            // contextRef.current.fillStyle = "rgba(255, 255, 255, 0)"
            contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
          }
          setToolName("Image");
  }
  const getPre = () => {
    
    let new_annotations = annotations;
    new_annotations[count] = contextRef.current.getImageData(
      0, 0, canvasRef.current.width, canvasRef.current.height)
    setAnnotations(new_annotations)
    setCount(count - 1);
    // console.log(annotations);
  }
  const getNext = () => { 
    let new_annotations = annotations;
    new_annotations[count] = contextRef.current.getImageData(
      0, 0, canvasRef.current.width, canvasRef.current.height)
    setAnnotations(new_annotations)
    
    setCount(count + 1);
    console.log(annotations);
  }

  return (
    <div>
      <div className = "tool-container">

        <button onClick={() =>{getEmogi("👆");}} style={{ width:"40px", border:"none" }} id="blue">👆</button>
        <button onClick={() =>{getEmogi("✍");}} style={{ width:"40px", border:"none" }} id="blue">✍</button>
        <button onClick={() =>{getEmogi("👋");}} style={{ width:"40px", border:"none" }} id="black">👋</button>
        <button onClick={() =>{ getEmogi("😂");}} style={{ width:"40px", border:"none"  }} id="green"><img src="https://www.smileysapp.com/gif-emoji/facepalm.gif" alt="d" /></button>
        <button onClick={() =>{ getEmogi("🐶");}} style={{ width:"40px", border:"none" }} id="red">🐶</button>
       
        <button onClick={() =>{getColor("blue");}} style={{backgroundColor:"blue", width:"40px" , borderRadius:"100%", border:"none" }} id="blue"/>
        <button onClick={() =>{getColor("black");}} style={{backgroundColor:"black" ,  width:"40px" , borderRadius:"100%", border:"none" }} id="black"/>
        <button onClick={() =>{ getColor("green");}} style={{backgroundColor:"green", width:"40px" , borderRadius:"100%", border:"none" }} id="green"/>
        <button onClick={() =>{ getColor("red");}} style={{backgroundColor:"red", width:"40px" , borderRadius:"100%", border:"none" }} id="red"/>
        
        <button onClick={getEraser} style={{ border:"none" }} id="eraser">Eraser</button>
        <button onClick={getPen} style={{  border:"none" }} id="pen">Pen</button>
        <button onClick={getRect} style={{  border:"none" }}id="rect">Rect</button>
        <button onClick={getCircle} style={{  border:"none" }}id="circle">Circle</button>
        <button onClick={getLine} style={{  border:"none" }} id="line">Line</button>
        <button onClick={getPre} style={{  border:"none" }}id="pre">-</button>
        <button onClick={getImage} style={{  border:"none" }} id="img">Image-{count} </button>
        <button onClick={getNext} style={{  border:"none" }} id="next">+</button>
        <button onClick={getText} style={{  border:"none" }} id="text">Text</button>

      </div>

      <div className = "canvas-container">

       <canvas id="canvas_3_ID"
          ref={canvasRef3}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
        />      

        <canvas
          id = "overlay"
          ref={canvasRef}
        />
        <input 
        type = "text"
        id = "textbox"
        onChange = {storeText}
        onKeyDown ={drawText}
          style = {{
          	position : "absolute",
            visibility :`${inputBox}`,
            left:`${keyStartPoint[0]}px`,
    				top:`${keyStartPoint[1]}px`,
            pointerEvents: `${disableInput}`
          }}
        onBlur = {(e) => {
           drawText(e,true)
          }}
        ></input>
       
        <canvas id="images"
          ref={canvasRef2}
        />
      
      </div>
      <div className = "all-images">
        <div >
          <img 
            className = "slides"
          id="img-0"
          src = "https://i.picsum.photos/id/1059/800/600.jpg?hmac=vnm2z-u91f7W8_12lTifycQSjv_i-6f7moMZSsIgY8U"
            alt = ""
            width = "800"
            height = "600"
          ></img>
        </div>
        <div >
          <img 
            className = "slides"
            id="img-1" 
            src = "https://i.picsum.photos/id/795/800/600.jpg?hmac=ijiBV8E3aju1BG-FF1y_gJIuighcEnQHNkV8-TKGEpo"
            alt = ""
            width = "800"
            height = "600"
          ></img>
        </div>
        <div >
          <img
            className = "slides"
            id="img-2"
            src = "https://i.picsum.photos/id/888/800/600.jpg?hmac=G7f8eYeHyKrKnKXNIBtXgxM-86vi-yvgmQ-Wb4v8T7I"
            alt = ""
            width = "800"
            height = "600"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Erasee;
