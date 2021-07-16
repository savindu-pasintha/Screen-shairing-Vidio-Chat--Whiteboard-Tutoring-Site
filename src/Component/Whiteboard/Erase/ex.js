
import React, { useEffect, useRef, useState } from 'react';
import photo1 from './abc.jpg';
import photo2 from './pp.jpg';
import photo3 from './img.jpg';
import './CanvasInputLibrary/CanvasInput';
import io from 'socket.io-client';


function useKey(key, callback) {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, []);
  useEffect(() => {
    function handle(event) {
      if (event.code === key) {
        callbackRef.current(event);
      } else {
        callbackRef.current(event);
      }
    }
    document.addEventListener('keypress', handle);
    return () => {
      document.removeEventListener('keypress', handle)
    }
  }, [key]);
}

const Erasee = () => {



  const [isDrawing, setIsDrawing] = useState(false);
  const[hasInput,setHasInput]= useState(false);

  const [toolName, setToolName] = useState("pen");
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("black");
  const [size, setSize] = useState(5);

  const [keyValue, setKeyValue] = useState("");


  const [startPoint, setStartPoint] = useState([])
  const [annotations, setAnnotations] = useState([]);

  const [keyPressPoint, setKeyPressPoint] = useState({ "offsetX": 0, "offsetY": 0 });
  const [startKeyPoint, setStartKeyPoint] = useState(0);
  const [inputTextArray, setInputTextArray] = useState([]);
  const [canvasDataArray, setCanvasDataArray] = useState([]);
  const [canvas2DataArray, setCanvas2DataArray] = useState([]);

  

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const canvasRef2 = useRef(null);
  const contextRef2 = useRef(null);

  //const[input,setInput] = useState();
  const input = useRef();

  const socket = useRef();
  const timeout = useRef();


  useEffect(() => {

    //canvas define
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");

    context.scale(2, 2);
    context.lineCap = "round";
    //contextRef.current.strokeStyle = color;
    //context.lineWidth = 5;
    contextRef.current = context;

    const canvas2 = canvasRef2.current;
    canvas2.width = window.innerWidth * 2;
    canvas2.height = window.innerHeight * 2;
    canvas2.style.width = `${window.innerWidth}px`;
    canvas2.style.height = `${window.innerHeight}px`;

    const context2 = canvas2.getContext("2d");
    context2.scale(2, 2);
    contextRef2.current = context2;


    //Socket connection with acces canvas send data from server
    socket.current = io.connect("https://ggh123.herokuapp.com");
    socket.current.on("canvas-data", function (data) {
      var interval = setInterval(function () {
          if (isDrawing){ return;}
          else{
            setIsDrawing(true);
            clearInterval(interval);
            var imageDataSave = new Image();
            imageDataSave.onload = function () {
                contextRef.current.drawImage(imageDataSave, 0, 0);
              setIsDrawing(false);
            };
            imageDataSave.src = data;
          }
      }, 50);

  });

  }, []);

  //socket server to send canvas data
  const sendDataTo = () =>[
     //when paint draw time execute
    // clearTimeout();
   
    timeout.current = setTimeout(function () {
         var base64ImageData = canvasRef.current.toDataURL("image/webp");
         socket.current.emit("canvas-data",base64ImageData);
         console.log(base64ImageData);
     },100)
    
  ]

  //when mouse button click to down
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    setStartPoint([offsetX, offsetY]);
  };
  //when mouse button relase after up time draw shapes
  const finishDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const [startX, startY] = startPoint;

    if (toolName === "circle") {
      const a = (offsetX - startX);
      const b = (offsetY - startY);
      const length = (Math.sqrt((a * a) + (b * b)))
      const radius = length / 2
      contextRef.current.beginPath();
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = size;
      contextRef.current.globalCompositeOperation = "source-over";
      contextRef.current.arc((offsetX + startX) / 2, (offsetY + startY) / 2, radius, 0, 2 * Math.PI);
      contextRef.current.stroke();
    }
    else if (toolName === "rect") {
      contextRef.current.globalCompositeOperation = "source-over";
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = size;
      contextRef.current.strokeRect(startX, startY, offsetX - startX, offsetY - startY);
      contextRef.current.closePath();
      setIsDrawing(false);
    }
    contextRef.current.closePath();
    setIsDrawing(false);
    sendDataTo();
  }
  //when mouse move event draw pen and eraser
  const draw = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (!isDrawing) {
      return;
    }
    else if (toolName === "pen") {
      contextRef.current.globalCompositeOperation = "source-over";
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = size;
      contextRef.current.stroke();
    }
    else if (toolName === "eraser") {
      contextRef.current.globalCompositeOperation = "destination-out";
      contextRef.current.clearRect(offsetX, offsetY, size, size, Math.PI * 2, false);
    }


  }
  const canvasClick = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setKeyPressPoint({ "offsetX": offsetX, "offsetY": offsetY });
    setStartKeyPoint(offsetX);
    if (!hasInput){addInput(nativeEvent.clientX, nativeEvent.clientY);
     setHasInput(true);
    }else{
    //  document.body.removeChild(input.current);
      /*
     // document.body.innerHTML = ""; // clear all the window items
      var inputTag = document.createElement('input');
      input.current = inputTag; //input tag useRef to assign variable values
      document.body.appendChild(input.current);
      input.current.focus();
      document.body.removeChild(input.current);
      */
      setHasInput(false);
    }
  }

  const keyPressMethod = (e) => {
       if (e.key === "CapsLock" || e.key === "Backspace" || 
        e.keyCode === 8 || e.keyCode === 46
          || e.key === "Shift" || e.key === "Meta" || e.key === "Control" ||
          e.key === "Alt" || e.key === "Tab" || e.key === "NumLock" ||
          e.key === "ArraowDown" || e.key === "ArrowUp" || e.key === "ArrowLeft"
          || e.key === "ArrowRight")
          {
          // CanvasDataUndo();
          // Canvas2DataUndo();
          }
  
  
       // saveCanvasData();
       // saveCanvas2Data();
  }
//Function to dynamically add an input box: 
const addInput = (x, y) => {
  if (toolName === "text") {
    var inputTag = document.createElement('input');
    inputTag.type = 'text';
    inputTag.style.border = "1px solid red";
    inputTag.style.width = "250px";
    inputTag.style.height = "30px";
    inputTag.style.position = 'fixed'; 
    inputTag.style.left = (x) + 'px';
    inputTag.style.top = (y) + 'px';
    input.current = inputTag; //input tag useRef to assign variable values
    document.body.appendChild(input.current);
    input.current.focus();
    setHasInput(true);
    input.current.onkeydown = function (e) {
        var keyCode = e.keyCode;
      if (keyCode === 13) {
        if (!input.current.value) {
          document.body.removeChild(input.current);
          setHasInput(false);
        } else {
          drawText(input.current.value, parseInt(input.current.style.left), parseInt(input.current.style.top) - 50);
          document.body.removeChild(input.current);//this
          setHasInput(false);
        }  
      }else if(e.key === "Control") {
        document.body.removeChild(input.current);
        setHasInput(false);
      }
      setHasInput(true);
    }
  
    //setIsDrawing(true);
  }
}

//Draw the text onto canvas:
const  drawText = (txt, startX, startY) => {
   // contextRef.current.textBaseline = 'top';
    contextRef.current.textAlign = 'left';
    contextRef.current.font = "20px sans-serif";
    contextRef.current.fillStyle = color || "black" ; 
    contextRef.current.fillText(txt, startX, startY);
}
  //when click the eraser button set tool name as a "eraser"
  const saveCanvasData = () => {
    var imgdata = canvasRef.current.toDataURL();
    setCanvasDataArray([...canvasDataArray, imgdata]);
    //  console.log(canvasDataArray);
  }

  const saveCanvas2Data = () => {
    var imgdata = canvasRef2.current.toDataURL();
    setCanvas2DataArray([...canvas2DataArray, imgdata]);
   // console.log(canvasDataArray);
  }

  const CanvasDataUndo = () => {
    var imgdata = canvasDataArray.pop();
    var image = new Image();
    image.src = imgdata;
    image.onload = function () {
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    contextRef.current.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height, 0, 0, canvasRef.current.width, canvasRef.current.height);
    }

  }

  const Canvas2DataUndo = () => {
    var imgdata = canvas2DataArray.pop();
    var image = new Image();
    image.src = imgdata;
    image.onload = function () {
    contextRef2.current.clearRect(0, 0, canvasRef2.current.width, canvasRef2.current.height);
    contextRef2.current.drawImage(image, 0, 0, canvasRef2.current.width, canvasRef2.current.height, 0, 0, canvasRef2.current.width, canvasRef2.current.height);
  }

  }


  const CanvasDataRedo = (count) => {
  
    var imgdata = canvasDataArray[count] //.pop();
    var image = new Image();
    image.src = imgdata;
    image.onload = function () {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      contextRef.current.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height, 0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }

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
  const getImage = () => {

    //contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  }
  const getPre = () => {
    //undo array add
    setCount(count - 1);
    viewImage(count);
    saveCanvas2Data();
  }
  const getNext = () => {
    //undo array add
    setCount(count + 1);
    viewImage(count);
    saveCanvas2Data();
  }
  const getColor = (e) => {
    setColor(e.target.value);

  }
  const getSize = (e) => {
    setSize(e.target.value);
  }
  const getText = () => {
    setToolName("text");
    console.log(toolName);
  }
  const getEmpty = () => {
    setToolName("empty");
   // if(hasInput){ document.body.removeChild(input.current);
   // setHasInput(false);}
  }

  const viewImage = (imageArrayindex) => {
    setToolName("Image");
    try {
      if (toolName === "Image") {
        //image loading canvas
        const canvas = canvasRef2.current;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        var arr = [photo1, photo2, photo3];
        var image = new Image();
        image.src = arr[imageArrayindex];
        image.onload = function () {
          contextRef2.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          contextRef2.current.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height, 0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
    } catch (e) { console.log(e); }

  }

  //back space


  return (
    <div>
      <button onClick={getEraser} id="eraser">Eraser</button>
      <button onClick={getPen} id="pen">Pen</button>
      <button onClick={getRect} id="rect">Rect</button>
      <button onClick={getCircle} id="circle">Circle</button>
      <button onClick={getPre} id="pre">-</button>
      <button onClick={getImage} id="img">Image-{count} </button>
      <button onClick={getNext} id="next">+</button>
      <button onClick={getText} id="text">Text</button>
      <button onClick={getEmpty} id="text">Empty</button>
      <div>
        <input type="color" value={color} onChange={getColor} />
        <select value={size} onChange={getSize}>
          {
            [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 75, 80, 100].map((item) => {
              return (
                <option>{item}</option>
              )
            })
          }
        </select>
      </div>


      <div style={{
        position: "relative",
        width: "100%",
        height: " 662px",
        padding: "0px",
        top: "00px",
        left: "0px",
      }}
      >


        <canvas
          id="overlay"
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          onClick={canvasClick}
          onKeyUp={keyPressMethod}

          ref={canvasRef}

          tabIndex="0"

          style={{
            zIndex: 2,
            position: "absolute",

            width: "100%",
            height: " 662px",
            padding: "0px",
            top: "0px",
            left: "0px",
          

          }}
        />

        <canvas id="images"
          ref={canvasRef2}
          style={{

            zIndex: 1,
            position: "relative",
            width: "100%",
            height: " 662px",
            left: "0px",
            top: "0px",

          }}
        />
      </div>
    </div>

  );
}

export default Erasee;
