import React,{useEffect,useState} from 'react';

const C = () => {
   // const[]
    // variables canvas width-height
    //canvas mouse position x,y variable
    // access canvas 
    //create canvase getContext
    

useEffect(()=>{
    var canvas, context, canvaso, contexto;
    // The active tool instance.
    var tool;
    var tool_default = 'pencil';
  
    function init () {
      // Find the canvas element. id
      canvas = document.getElementById('imageView');

      if (!canvas) {
        alert('Error: I cannot find the canvas element!');
        return;
      }

      if (!canvas.getContext) {
        alert('Error: no canvas.getContext!');
        return;
      }

      // Get the 2D canvas context.
      context = canvas.getContext('2d');
      if (!context) {
        alert('Error: failed to getContext!');
        return;
      }
      // Get the tool select input.
      var tool_select = document.getElementById('dtool');

      if (!tool_select) {
        alert('Error: failed to get the dtool element!');
        return;
      }
      tool_select.addEventListener('change', ev_tool_change, false);
      // Activate the default tool.
      if (tools[tool_default]) {
        tool = new tools[tool_default]();
        tool_select.value = tool_default;
      }
      // Attach the mousedown, mousemove and mouseup event listeners.
      canvas.addEventListener('mousedown', ev_canvas, false);
      canvas.addEventListener('mousemove', ev_canvas, false);
      canvas.addEventListener('mouseup',   ev_canvas, false);
    }
  
    // The general-purpose event handler. This function just determines the mouse 
    // position relative to the canvas element.
    function ev_canvas(ev) {
      if (ev.layerX || ev.layerX === 0) { // Firefox
        ev._x = ev.layerX;
        ev._y = ev.layerY;
      } else if (ev.offsetX || ev.offsetX === 0) { // Opera
        ev._x = ev.offsetX;
        ev._y = ev.offsetY;
      }
  
      // Call the event handler of the tool.
      var func = tool[ev.type];
      if (func) {
        func(ev);
      }
    }
  
    // The event handler for any changes made to the tool selector.
    function ev_tool_change (ev) {
      if (tools[this.value]) {
        tool = new tools[this.value]();
      }
    }
  
  

// This function draws the #imageTemp canvas on top of #imageView, after which 
  // #imageTemp is cleared. This function is called each time when the user 
  // completes a drawing operation.


const canvasDatasave = () => {
    // save the data canvas image as a
    var canvasElement = document.getElementById("imageView");
    var ctx = canvasElement.getContext("2d");
    //get image data
    var w = canvas.width;
    var h = canvas.height;
    var canvasData = ctx.getImageData(0, 0, w, h);
    //save data as a list // -> var a =[];  a.push(value);
    console.log(canvasData,w,h);
    ctx.putImageData(canvasData, 0, 0);

  }

    // This object holds the implementation of each drawing tool.
    var tools = {};
  
    // The drawing pencil.
    tools.pencil = function () {
      var tool = this;
      this.started = false;
  
      // This is called when you start holding down the mouse button.
      // This starts the pencil drawing.
      this.mousedown = function (ev) {
          context.beginPath();
          context.moveTo(ev._x, ev._y);
          tool.started = true;
      };
  
      // This function is called every time you move the mouse. Obviously, it only 
      // draws if the tool.started state is set to true (when you are holding down 
      // the mouse button).
       this.mousemove = function (ev) {
        if (tool.started) {
          context.lineTo(ev._x, ev._y);
          context.stroke();
        }
      };
  
      // This is called when you release the mouse button.
      this.mouseup = function (ev) {
        if (tool.started) {
          tool.mousemove(ev);
          tool.started = false;
         // img_update();
        }
      };
    };
  
  
    //update canvas 
    function img_update () {
      this.canvas = document.getElementById('imageView');

      //add kl tempaory canvas ekk
      var container = canvas.parentNode;

      // create new canvas element auto
      canvaso = document.createElement('canvas');
      canvaso.width = canvas.width;
      canvaso.height = canvas.height;
      contexto = canvaso.getContext('2d');

      //
      container.appendChild(canvaso);

      context.drawImage(canvaso, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  
    // The rectangle tool.
    tools.rect = function () {
      var tool = this;
      this.started = false;

      this.mousedown = function (ev) {
        tool.started = true;
        tool.x0 = ev._x;
        tool.y0 = ev._y;
      };
      this.mousemove = function (ev) {
        ev.preventDefault();
        if (!tool.started) {  
         return;
        }

        var x = Math.min(ev._x, tool.x0),
          y = Math.min(ev._y, tool.y0),
          w = Math.abs(ev._x - tool.x0),
          h = Math.abs(ev._y - tool.y0);

        context.clearRect(0, 0, canvas.width, canvas.height);
        if (!w || !h) {
          return;
        }
        context.strokeRect(x, y, w, h);
      };
  
      this.mouseup = function (ev) {
        if (tool.started) {
          tool.mousemove(ev);
          tool.started = false;
          img_update();
        }
      };
    };

   // The line tool.
   tools.line = function () {
    var tool = this;
    this.started = false;

    this.mousedown = function (ev) {
      tool.started = true;
      tool.x0 = ev._x;
      tool.y0 = ev._y;
    };

    this.mousemove = function (ev) {
      if (!tool.started) {
        return;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);

      context.beginPath();
      context.moveTo(tool.x0, tool.y0);
      context.lineTo(ev._x,   ev._y);
      context.stroke();
      context.closePath();
    };

    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        //img_update();
      
      }
    };
  };

  // circle
    tools.circle = function () {
      var tool = this;
      this.started = false;
      this.mousedown = function (ev) {
        tool.started = true;
        tool.x0 = ev._x;
        tool.y0 = ev._y;
      };
  
      this.mousemove = function (ev) {
        if (!tool.started) {
          return;
        }
  
        var x = Math.min(ev._x,  tool.x0),y = Math.min(ev._y,  tool.y0),
    
        //sapeksha-obsolute values -5 = +5 wage krnn
            w = Math.abs(ev._x - tool.x0),
            h = Math.abs(ev._y - tool.y0);
  
            //claer the canvas before drawings
          context.clearRect(0, 0, canvas.width, canvas.height);
  
        if (!w || !h) {
          return;
        }
        context.globalCompositeOperation="source-over";
        context.beginPath();
        context.arc(x, y, w, 0, 2 * Math.PI);
        context.stroke();
       // context.strokeRect(x, y, w, h);
      };
  
      this.mouseup = function (ev) {
        if (tool.started) {
          tool.mousemove(ev);
          tool.started = false;
         // img_update();
        }
      };
    };

    //eraser
    // circle
    tools.erase = function () {
      var tool = this;
      this.started = false;
      this.mousedown = function (ev) {
        tool.started = true;
        tool.x0 = ev._x;
        tool.y0 = ev._y;
      };
  
      this.mousemove = function (ev) {
        if (!tool.started) {
          return;
        }
  
        var x = Math.min(ev._x,  tool.x0),y = Math.min(ev._y,  tool.y0),
    
        //sapeksha-obsolute values -5 = +5 wage krnn
            w = Math.abs(ev._x - tool.x0),
            h = Math.abs(ev._y - tool.y0);
  
            //claer the canvas before drawings
        //  context.clearRect(0, 0, canvas.width, canvas.height);
  
        if (!w || !h) {
          return;
        }
  
        context.globalCompositeOperation="destination-out";
        context.arc(x,y,3,0,Math.PI*2,false);
       // context.backgroundColor="red";
       // context.strokeStyle = "red";
        context.fill();
       // context.strokeRect(x, y, w, h);
      };
  
      this.mouseup = function (ev) {
        if (tool.started) {
          tool.mousemove(ev);
          tool.started = false;
         // img_update();
        }
      };
    };

    //call
    init();
  
},[]);

const[index,setIndex] = useState(0);

//put images to canvas
const putimage= ()=>{
    var count = index + 1;
    setIndex(count);
  
    var arr = [
    "https://upload.wikimedia.org/wikipedia/commons/a/a3/Gull_feeding_on_flies_with_tufa_and_Sierra_Nevada_in_background-2000px.jpeg",
    "https://upload.wikimedia.org/wikipedia/commons/3/3f/Bryce_Amphitheater_from_Bryce_Point-2000px.jpeg",
    "https://upload.wikimedia.org/wikipedia/commons/b/bb/Parker%2C_Bloddy%2C_and_Gibbs_Canyons-2000px.jpeg",
    ];

  console.log(arr[index]);
  var c = document.getElementById("imageView");
  var ctx = c.getContext("2d");
  var img = document.createElement('img'); //dynamic new tag create
  img.src = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Gull_feeding_on_flies_with_tufa_and_Sierra_Nevada_in_background-2000px.jpeg";
  ctx.drawImage(img, 0, 0);
}

    return (
        <div>
            <p>
                <label>Drawing tool:
                    <select id="dtool">
                        <option value="line">Line</option>
                        <option value="rect">Rectangle</option>
                        <option value="pencil">Pencil</option>
                        <option value="circle">circle</option>
                        <option value="erase">erase</option>
                    </select>
                </label>
            </p>
            <button onClick={putimage}>add image</button>
            <div id="container">
                <canvas id="imageView" width="2000" height="800" style={{backgroundColor:"white"}}>   
                </canvas>
            </div>
        </div>
    );
}

export default C;
