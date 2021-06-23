import React, { useEffect, useState } from 'react';
import axios from "axios";
import firebase from "../Firebase/firebase";


/*
 Flow Chart
  1-Fill form  msg
  2-send message how to work
    1- If Login success send message
    ** messgae senderId = reciverId = password or email name one 
    2- same time message sending (one to one)

*/
const TextMessage = () => {
    const [msg, setMsg] = useState("");
    const [status, setStatus] = useState("");
    const [messageArray, setMessageArray] = useState([]);
    const [count, setCount] = useState(0);
    const [docId,setDocId] = useState(0);

    const readMessage = async () => {
        try {

         /*
           //1-read all and get doc id
           const snapshot = await firebase.firestore().collection('Messages').get();
           const collectionobj = {};
           console.log(snapshot.data);
           snapshot.forEach(doc => { collectionobj[doc.id] = doc.data(); });
           console.log(collectionobj)
           var arra = Object.values(collectionobj);
          setDocId(arra.length);
          console.log("count-",docId);
          setMessageArray(arra);
          */

          const db = firebase.firestore();
          var docRef = await db.collection("Messages").doc("chat");
          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                var d = doc.data(); //json array data read
                var arra = Object.values(d);// json to array
              //console.log(d);  
              setDocId(arra.length);
              console.log("count-",docId);
              setMessageArray(arra);
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
         


        } catch (error) {
            throw error;
        }
    }

    useEffect(()=>{readMessage ()},[count]);
  
    const chatlist = messageArray.map((item, index) => {
      
        if (item.sender) {
            return (
                <li className="row" key={index}>
                    <div>
                        <div key={index} style={{ float: "left", padding:"5px"}}>
                             <p style={{borderRadius:"10px",padding:"5px",backgroundColor:"black",color:"white",fontWeight:"bolder"}}>{item.message}</p>
                             <p style={{color:"red",fontWeight:"200", fontSize:"10px"}}>{"from : " + item.sender}</p>
                             <p style={{color:"black",fontWeight:"200"}}>
                             <span style={{color:"black", fontWeight:"bolder", fontSize:"8px"}}> 
                              {item.date + "   "}</span> 
                               <span style={{color:"black", fontWeight:"bolder"}}>
                                   {item.time}</span></p>
                        </div>
                    </div>
                </li>
            );
        }
      
      
    });

    /*
    const chatlist = arr.map((i) => {
        var left, right;
        if (i.id === "savindu") {
            left = i.message + "--" + "savindu";
            return (
                <div className="row" style={{padding:"10px",position:"relative",width:"100%", height:"auto"}}>
                    <li style={{width:"100%", height:"auto",position:"relative", textAlign:"right",
                     listStyle:"none"}}>
                        <p style={{width:"auto",borderRadius:"30px",padding:"5px",backgroundColor:"black",color:"white",fontWeight:"bolder"}}>{left}</p>
                    </li>
                </div>
                );
        }

        if (i.id === "naveen") {
            right = i.message + "--" + "naveen";
            return (
                <div className="row" style={{width:"100%", height:"auto",position:"relative",padding:"10px"}}>
                    <li   style={{padding:"5px",width:"auto", height:"auto",position:"relative",textAlign:"left", listStyle:"none"}} >
                        <p style={{width:"auto",borderRadius:"30px",padding:"5px",backgroundColor:"blue",color:"white",fontWeight:"bolder"}}>{right}</p>
                    </li>
                </div>
                );
        }
       count++;
    });
*/
    const getMsg = (e) => {
        setMsg(e.target.value);
    }

    const deleteMSG = async ()=>{
        try {
          
                //1-read all and get doc id
                const db=firebase.firestore();
                const snapshot = await db.collection('Messages').get();
                const collectionobj = {};
                snapshot.forEach(doc => {
                    collectionobj[doc.id] = doc.data();
                });
                // console.log(collectionobj);
                
                //2-delele method create
                const docDelete = async (id) =>{
                    await db.collection('Messages').doc(id).delete().then(() => {
                        console.log("Document successfully deleted!");
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                }
                //execute delete method()
                var arr = Object.keys(collectionobj);
                arr.forEach(itemid =>{
                    docDelete(itemid);
                });
                setCount("ok");  
                //3-after crete new document because all the data delete when deletion
                db.collection("Messages").doc("chat").set(
                    {
                       "0" : {
                            'message': "",
                            'time': "",
                            'date': "",
                            'sender': "",
                            'reciver': ""
                        }
                    }
                )
                .then(() => {
                    console.log("Document creted!");
                })
                .catch((error) => {
                    console.error("Error writing creting in text message deletion function: ", error);
                });
                
        }catch(error){
            console.log("Send Text message", error);
        }
        setCount("10");
    }
    const sendMessage = async (userId) => {
        readMessage();
       // window.localStorage.setItem("userId","savindupasingtha@gmail.com")
       var d =new Date();
       var time = d.getHours()+" : "+ d.getMinutes() + " : "+d.getSeconds(); 
       var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
       // console.log(time+"-"+date);
        try {
            if(msg.length !== 0){
            //auto generated doc ID 
            var objectId = docId+1;
            var senderId= window.localStorage.getItem("userId");
           const db = firebase.firestore();
            await db
                .collection("Messages")
                .doc("chat")
                .update(
                    {
                        [objectId] : {
                            'message': msg,
                            'time': time,
                            'date': date,
                            'sender': senderId,
                            'reciver': "Teacher"
                        }
                    }
            ).then((responce) => {
                //console.log("responce", responce);
                if(responce.id){
                    setStatus("-ok");
                }
                setCount("update");  
            }).catch((error) => {
                console.log("Send Text message", error);
            });
            //setStatus(" ");
        }else{
             setStatus("-Plase enter values"); 
        }
        } catch (err) {
            console.log(err);
        }
        setCount("change");
        /*
        var x = count;
        var i = x + 1;
        setCount(i);
        console.log(count);
        var arr = obj;
        arr[count] = { id: "savindu", message: 'Hai' + count }
        setObj(arr);
        */
        /*
        //console.log(msg);
            try {
                //chech the length of realtime
                setStatus("");
                readMessage();
                var ln=dataArr.length;
                var id=ln+1;//auto increment id feild
                if(msg !== ""){
                //var id = Math.round(Math.random() * 100000);
                var date = new Date();
                var apiurl = "https://tutoring-143d5-default-rtdb.firebaseio.com/messages.json";
                await axios
                  .patch(apiurl,
                   { 'message': msg, 
                  'time' : time,
                  'date' : date,
                  'sender' : senderId ,
                  'reciver' : "Teacher"  }
                  )
                  .then((response) => {
                   // throw response;
                   setStatus(response.statusText);
                    //console.log(response.statusText);
                    // console.log(response);
                  })
                  .catch((error) => {
                    console.log(error);
                   // throw error;
                    // console.log(error);
                  });
                }
              } catch (e) {
                throw e;
             }
             */
    }

    const [s,setS] = useState("");
    const dropDown = () => {
        var x ="";
        return (
            <div class="dropdown is-active">
                <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span>{s}</span>
                        <span class="icon is-small">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                        <button onClick={()=>{setS("one");}}  class="dropdown-item">
                          one
                        </button>
                        <button onClick={()=>{setS("two");}}  class="dropdown-item">
                         two
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div>
            <h1>chat text message box savindu</h1>
            <div>
                <ul>
                    {chatlist}
                </ul>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); }}>
                <div className="field">
                    <div className="control">
                        <textarea onChange={getMsg} className="textarea is-small" placeholder="Small textarea"></textarea>
                    </div>
                </div>
                <div>
                    {
                       // dropDown() 
                    }
                </div>
                <div className="buttons">
                    <button onClick={() => { sendMessage("savindu"); }} className="button is-warning"
                    >   send
                      <p>{status}</p>
                 </button>
                    <button onClick={() => { deleteMSG(); }} className="button is-danger">All delete Msg </button>
                </div>
            </form>

        </div>
    );
};





export default TextMessage;
