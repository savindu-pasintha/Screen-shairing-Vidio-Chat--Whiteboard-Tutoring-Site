 
    //1= straming obj value data store array variable
    function startRecording() {
    

        var codecPreferences = document.getElementById("codecPreferences");
    
        const mimeType = codecPreferences.options[codecPreferences.selectedIndex].value;
        const options = {mimeType};
        try {
          //we should pass stream object as a parammere
          mediaRecorder = new MediaRecorder(window.stream, options);
        } catch (e) {
          console.error('Exception while creating MediaRecorder:', e);
          var errorMsgElement = document.getElementById('errorMsg');
          errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
          return;
        }
      
        console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
      
        var recordButton = document.getElementById("record");
        recordButton.textContent = 'Stop Recording';
    
        var playButton = document.getElementById("paly");
        playButton.disabled = true;
    
        var downloadButton = document.getElementById("download");
        downloadButton.disabled = true;
        
        codecPreferences.disabled = true;
      
        mediaRecorder.onstop = (event) => {
          console.log('Recorder stopped: ', event);
          console.log('Recorded Blobs: ', recordedBlobs);
        };
      
        mediaRecorder.ondataavailable = handleDataAvailable;
      
        mediaRecorder.start();
      
        console.log('MediaRecorder started', mediaRecorder);
      }
    //2-check recordblog variable empty or not
    function handleDataAvailable(event) {
        console.log('handleDataAvailable', event);
        if (event.data && event.data.size > 0) {
          recordedBlobs.push(event.data);
        }
      }
      //3-stop recording
      function stopRecording() {
        mediaRecorder.stop();
      }
      
     const recordButtonclick = () => {
         var recordButton = document.getElementById("record");
         var codecPreferences = document.getElementById("codecPreferences");
         var playButton = document.getElementById("paly");
         var downloadButton = document.getElementById("download");
      
        if (recordButton.textContent === 'Start Recording') {
          startRecording();
        } else {
          stopRecording();
    
          recordButton.textContent = 'Start Recording';
          playButton.disabled = false;
          downloadButton.disabled = false;
          codecPreferences.disabled = false;
        }
      }
      
      //4- when play button click video array variable data conver to src to read as a play video
      const playButtonclick= () => {
       
        var codecPreferences = document.getElementById("codecPreferences");
      
        const mimeType = codecPreferences.options[codecPreferences.selectedIndex].value.split(';', 1)[0];
        const superBuffer = new Blob(recordedBlobs, {type: mimeType});
        //this is a video tag element
       
        var recordedVideo = document.getElemntById("recordVideo");
        recordedVideo.src = null;
        recordedVideo.srcObject = null;
        recordedVideo.src = window.URL.createObjectURL(superBuffer);
       //  recordedVideo.controls = true;
      //  recordedVideo.play();
      }
    
      //5- recorded video array data create as a download video file
     
     const downloadButtonclick = () => {
        const blob = new Blob(recordedBlobs, {type: 'video/webm'});
        const url = window.URL.createObjectURL(blob);
        // auto <a> </a> tag elemnt create to download option view
        const a = document.createElement('a');
        a.style.display = 'none';  
        a.href = url;
        a.download = 'test.webm';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 100);
      }
      
      //6- call init(constraing) method inside midea mic/camera enable and eco sount check
      const startbuttonclick=async ()=> {
        document.querySelector('button#start').disabled = true;
      
        //true false value
        const hasEchoCancellation = document.querySelector('#echoCancellation').checked;//output tru or false
        
        const constraints = {
          audio: {
            echoCancellation: {exact: hasEchoCancellation}
          },
          video: {
            width: 1280, height: 720
          }
        };
        console.log('Using media constraints:', constraints);
        await init(constraints);
      }
      
      //7 call handleSuccess() method inside put "stream" data obj
      async function init(constraints) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          handleSuccess(stream);
        } catch (e) {
          console.error('navigator.getUserMedia error:', e);
    
          var errorMsgElement = document.getElementById("errorMsg");
          errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
        }
      }
      
      //8 call getSupportedMimeTypes() method inside
      function handleSuccess(stream) {
        var recordButton = document.getElementById("record");
        var  codecPreferences = document.getElementById("codecPreferences");
    
        recordButton.disabled = false;
        console.log('getUserMedia() got stream:', stream);
      
        window.stream = stream;
      
           //camera/adudio set to video tag
        const gumVideo = document.querySelector('video#gum');
      
     
       // gumVideo.srcObject = stream;
        myRecVideo.current.srcObjectsrcObject= stream;
      
        getSupportedMimeTypes().forEach(mimeType => {
          const option = document.createElement('option');
          option.value = mimeType;
          option.innerText = option.value;
          codecPreferences.appendChild(option);
        });
        codecPreferences.disabled = false;
      }
      
      function getSupportedMimeTypes() {
        const possibleTypes = [
          'video/webm;codecs=vp9,opus',
          'video/webm;codecs=vp8,opus',
          'video/webm;codecs=h264,opus',
          'video/mp4;codecs=h264,aac',
        ];
        return possibleTypes.filter(mimeType => {
          return MediaRecorder.isTypeSupported(mimeType);
        });
      }
        