
import React, { useEffect, useRef, useState } from 'react';
import photo1 from '../photos/img1.jpg';
import photo2 from '../photos/img2.jpg';
import photo3 from '../photos/img3.jpg';

import './Erasee.css';

const Erasee = () => {

  const [isDrawing, setIsDrawing] = useState(false);
  const [toolName, setToolName] = useState("pen");
  const [count, setCount] = useState(0);
  const [startPoint, setStartPoint] = useState([])
  const [annotations, setAnnotations] = useState([]);


  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const canvasRef2 = useRef(null);
  const contextRef2 = useRef(null);



  useEffect(() => {

    //canvas define
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    //style the drawing point
    context.scale(2, 2);//pointer size
    context.lineCap = "round";//ponter shape
    context.strokeStyle = "black";//pointer coloer
    context.lineWidth = 5;//pointer width
    contextRef.current = context;

    //canvas define for images
    const canvas2 = canvasRef2.current;
    canvas2.width = window.innerWidth * 2;
    canvas2.height = window.innerHeight * 2;
    canvas2.style.width = `${window.innerWidth}px`;
    canvas2.style.height = `${window.innerHeight}px`;

    const context2 = canvas2.getContext("2d");
    //style the drawing point
    context2.scale(2, 2);//pointer size
    contextRef2.current = context2;
  }, []);


  const startDrawing = ({ nativeEvent }) => {
    
    console.log(nativeEvent)
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    setStartPoint([offsetX, offsetY])
  };
  const finishDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const [startX, startY] = startPoint;
    
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
    }
    contextRef.current.closePath();
    setIsDrawing(false);
    
  }
  const draw = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const [startX, startY] = startPoint;
    console.log(startX, startY);
    if (!isDrawing) {
      return;
    }
     else if (toolName === "pen") {
      contextRef.current.globalCompositeOperation = "source-over";
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    } 
    else if (toolName === "eraser") {
      contextRef.current.globalCompositeOperation = "destination-out";
      contextRef.current.clearRect(offsetX, offsetY, 20,20, Math.PI * 2, false);
    }

  }

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    contextRef.fillStyle = "white"
    contextRef.fillRect(0, 0, canvas.width, canvas.height)
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
  const getImage = () => {
    if(annotations.length > count){
      contextRef.current.putImageData(annotations[count], 300, 0);
    }
    else{
      // contextRef.current.fillStyle = "rgba(255, 255, 255, 0)"
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
    viewImage(count);
  }
  const getPre = () => {
    setAnnotations(annotations => [...annotations , contextRef.current.getImageData(
      300, 0, canvasRef.current.width, canvasRef.current.height
    )])
    setCount(count - 1);
    // let num = count;
    // viewImage(num);
  }
  const getNext = () => {
    setAnnotations(annotations => [...annotations , contextRef.current.getImageData(
      300, 0, canvasRef.current.width, canvasRef.current.height
    )])
    setCount(count + 1);
    // let num = count;
    // viewImage(num);
  }
  const viewImage = async (imageArrayindex) => {
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
        var img = document.createElement('img'); //dynamic new tag create
        img.src = arr[imageArrayindex];
        img.alt = "img";
        img.width = canvas.width;
        img.height = canvas.height;
        
       
        // contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
        await contextRef2.current.drawImage(img, 0, 0, canvas.width, canvas.height, 300, 0, canvas.width, canvas.height);
        //drawImage(img, 0, 0,);
        //drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
      }
    } catch (e) { console.log(e); }

  }

  /*

//https://usefulangle.com/post/20/pdfjs-tutorial-1-preview-pdf-during-upload-wih-next-prev-buttons 
  const[cURRENT_PAGE,setCURRENT_PAGE]=useState(0);
  const[tOTAL_PAGES,setTOTAL_PAGES]=useState(0);

  const pdfpre = () =>{
    if(cURRENT_PAGE !== tOTAL_PAGES){
      showPage(-- cURRENT_PAGE);
    }
  }
  const pdfnext = () =>{
    if(CURRENT_PAGE !== tOTAL_PAGES){
      showPage(++cURRENT_PAGE);
    }
   
  }
  const pdfshow = () =>{
      showPDF('https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf');
  }
// initialize and load the PDF
const showPDF = async (pdf_url) => {
  document.querySelector("#pdf-loader").style.display = 'block';

  // get handle of pdf document
  var PDF_DOC;
  try {
      PDF_DOC = await pdfjsLib.getDocument({ url: pdf_url });
  }
  catch(error) {
      alert(error.message);
  }

  // total pages in pdf
  setTOTAL_PAGES(PDF_DOC.numPages);
  
  // Hide the pdf loader and show pdf container
  document.querySelector("#pdf-loader").style.display = 'none';
  document.querySelector("#pdf-contents").style.display = 'block';
  document.querySelector("#pdf-total-pages").innerHTML = _TOTAL_PAGES;

  // show the first page
  showPage(1);
}
*/

  return (
    <div>


      <button onClick={""} id="show-pdf-button">Show PDF</button>

      <div id="pdf-main-container">
        <div id="pdf-loader">Loading document ...</div>
        <div id="pdf-contents">
          <div id="pdf-meta">
            <div id="pdf-buttons">
              <button onClick={"pdfpre"} id="pdf-prev">Previous</button>
              <button onClick={"pdfnext"} id="pdf-next">Next</button>
            </div>
            <div id="page-count-container">Page <div id="pdf-current-page"></div> of <div id="pdf-total-pages"></div></div>
          </div>
          <canvas id="pdf-canvas" width="400"></canvas>
          <div id="page-loader">Loading page ...</div>
        </div>
      </div>



      <button onClick={getEraser} id="eraser">Eraser</button>
      <button onClick={getPen} id="pen">Pen</button>
      <button onClick={getRect} id="rect">Rect</button>
      <button onClick={getCircle} id="circle">Circle</button>
      <button onClick={getPre} id="pre">-</button>
      <button onClick={getImage} id="img">Image-{count} </button>
      <button onClick={getNext} id="next">+</button>

      <canvas
        id = "overlay"
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
      <canvas id="images"
        ref={canvasRef2}
      />

    </div>
  );
}

export default Erasee;
