import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PhoneIcon from "@material-ui/icons/Phone";
import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./AudioTransmit.css";
import Wt from '../Whiteboard/container/Container';

import Peer from "simple-peer";
import io from "socket.io-client";


//const socket = io.connect('http://localhost:5000')
//https://savindube.herokuapp.com"

const AudioTransmit = () => {
 /*--------------------------------------1--RTC communication---start---------------------------------------------------- */
    const [me, setMe] = useState("");
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [idToCall, setIdToCall] = useState("");
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState("");

    const myVideo = useRef();
    const userVideo = useRef();

    const myRecVideo = useRef();
    const userRecVideo = useRef();

    var mediaRecorder = useRef();
    var recordedBlobs = useRef();

   
    const myAudio = useRef();
    const userAudio = useRef();
    const connectionRef = useRef();

   //var url = "https://savinduapp.herokuapp.com" || "http://localhost:5000";
  var url = "https://ggh123.herokuapp.com";
   var socket = io(url, {
        withCredentials: true,
        extraHeaders: {
            "my-custom-header": "abcd"
        }
    });

   // socket = io.connect("http://localhost:5000");
  // socket = io.connect("https://ggh123.herokuapp.com");

    useEffect(() => {

      //mic and  
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream)
            myVideo.current.srcObject = stream;
            myAudio.current.srcObject = stream;
        })


        //emit() used to send data to front end or url
        /* endpoint paths in url access back end
        https:/3000/me
        https:/3000/disconnect
        https:/3000/callUser
        https:/3000/answerCall
        https:/3000/callAccepted
        */

        socket.on("me", (id) => {
            setMe(id);
        });


        console.log(me);

        socket.on("callUser", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setName(data.name)
            setCallerSignal(data.signal);
        });
        
    }, []);

    const callUser = (id) => {

        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        });

        //Fired when the peer connection and data channel are ready to use.
        peer.on("signal", (data) => {
                socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            });
        });

        //get recived messages
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
            userAudio.current.srcObject = stream;
        });

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        });

        connectionRef.current = peer;
    }

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        });
        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller })
        });
        //get the recivd messages
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
            userAudio.current.srcObject = stream;
        });

        peer.signal(callerSignal);
        connectionRef.current = peer;
    }

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
    }
    /*---------------------------------------1-RTC communication---end---------------------------------------------------- */
    /*--------------------------------------2--Recording Start---------------------------------------------------- */
 const recordButtonclick = () => {
     
  }
  
  //4- when play button click video array variable data conver to src to read as a play video
  const playButtonclick = () => {
   
  }

  //5- recorded video array data create as a download video file
 
 const downloadButtonclick = () => {
    
  }
  
  //6- call init(constraing) method inside midea mic/camera enable and eco sount check
  const startbuttonclick=async ()=> {
    
  }
  
    /*--------------------------------------2--Recording end---------------------------------------------------- */

    return (
        <div >

            <div>
            <hr style={{ width:"100%", height:"10px", color: 'red',position:"relative" }} />
            </div>
            <h1 style={{ textAlign: "center", color: '#fff' }}>savindupasingtha@gmail.com with chat</h1>
            <p>1-copy uour id 2- paste your friend textbox 3- call  4- answer button click</p>         
            <div className="row">
                <div className="col-6">
                    <p>You</p>
                    {stream && 
                    <audio id="myaudio" controls ref={myAudio} /> 
                     }
                </div>

                <div className="col-6">
                    <p>Friend</p>
                    {callAccepted && !callEnded ?
                    <audio id="friendAudio"  controls ref={userAudio} />
              : null}
                    </div>
            </div>
            <div>
             
            </div>
            <div className="container">
                
                <div className="video-container">
                    <div className="video">
                        {stream && <video ref={myVideo} playsInline muted autoPlay controls style={{ width: "300px" }} />}
                    </div>
                    <div className="video">
                        {callAccepted && !callEnded ?
                            <video controls ref={userVideo} playsInline  muted  autoPlay controls style={{ width: "300px" }} /> :
                            null}
                    </div>
                </div>
                 <div className="myId">

                    <TextField
                        id="filled-basic"
                        label="Name"
                        variant="filled"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ marginBottom: "20px" }}
                    />

                    <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
                        <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
                            Copy ID 
                        </Button>
                    </CopyToClipboard>

                    <TextField
                        id="filled-basic"
                        label="ID to call"
                        variant="filled"
                        value={idToCall}
                        onChange={(e) => setIdToCall(e.target.value)}
                    />
                    <div className="call-button">
                        {callAccepted && !callEnded ? (
                            <Button variant="contained" color="secondary" onClick={leaveCall}>
                                End Call
                            </Button>
                        ) : (
                            <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                                <PhoneIcon fontSize="large" />
                            </IconButton>
                        )}
                        {idToCall}
                    </div>
                </div>
                <div>
                    {receivingCall && !callAccepted ? (
                        <div className="caller">
                            <h1 >{name} is calling...</h1>
                            <Button variant="contained" color="primary" onClick={answerCall}>
                                Answer
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default AudioTransmit;
