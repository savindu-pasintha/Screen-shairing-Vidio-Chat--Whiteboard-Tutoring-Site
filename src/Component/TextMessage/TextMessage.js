import React, { useEffect, useState } from 'react';
import axios from "axios";
import firebase from "../Firebase/firebase";


/*
 Flow Chart
  1-Fill form  msg
  2-send message how to work
    1- If Login success send message localstorage
    ** messgae senderId = reciverId = password or email name one 
    2- same time message sending (one to one)
    3-firestore
   3-read message
   4-delete message 

*/
const TextMessage = () => {
    const [msg, setMsg] = useState("");
    const [status, setStatus] = useState("");
    const [messageArray, setMessageArray] = useState([]);
    const [count, setCount] = useState(0);
    const [docId, setDocId] = useState(0);

    const readMessage = async () => {
        try {
            // when update datanbase auto update web site 
            const db = firebase.firestore();
            await db.collection("Messages").doc("chat")
            .onSnapshot((doc) => {
             //   var x = db.Timestamp(new Date());
             //  console.log("hhx",x);
              var arra = Object.values(doc.data());// json to array
             setDocId(arra.length);
               setMessageArray(arra);
                // console.log("Current data: ", arra);
            });
        

            /*
            var docRef = await db.collection("Messages").doc("chat");
            docRef
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        var d = doc.data(); //json array data read
                        var arra = Object.values(d);// json to array
                        //console.log(d);  
                        setDocId(arra.length);
                       // console.log("count-", docId);
                        setMessageArray(arra);
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                })
                .catch((error) => {
                    console.log("Error getting document:", error);
                });
                */
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => { readMessage() }, [count]);

    const chatlist = messageArray.map((item, index) => {

        if (item.sender) {
            return (
                <li className="row" key={index}>
                    <div>
                        <div key={index} style={{ float: "left", padding: "5px" }}>
                            <p style={{ borderRadius: "10px", padding: "5px", backgroundColor: "black", color: "white", fontWeight: "bolder" }}>{item.message}</p>
                            <p style={{ color: "red", fontWeight: "200", fontSize: "10px" }}>{"from : " + item.sender}</p>
                            <p style={{ color: "black", fontWeight: "200" }}>
                                <span style={{ color: "black", fontWeight: "bolder", fontSize: "8px" }}>
                                    {item.date + "   "}</span>
                                <span style={{ color: "black", fontWeight: "bolder" }}>
                                    {item.time}</span></p>
                        </div>
                    </div>
                </li>
            );
        }


    });

    const getMsg = (e) => {
        setMsg(e.target.value);
    }

    const deleteMSG = async () => {
        try {

            //1-read all and get doc id
            const db = firebase.firestore();
            const snapshot = await db.collection('Messages').get();
            const collectionobj = {};
            snapshot.forEach(doc => {
                collectionobj[doc.id] = doc.data();
            });
            // console.log(collectionobj);

            //2-delele method create
            const docDelete = async (id) => {
                await db.collection('Messages').doc(id).delete().then(() => {
                    console.log("");
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
            }
            //execute delete method()
            var arr = Object.keys(collectionobj);
            arr.forEach(itemid => {
                docDelete(itemid);
            });
            //3-after crete new document because all the data delete when deletion
             await db.collection("Messages").doc("chat").set(
                {
                    "0": {
                        'message': "",
                        'time': "",
                        'date': "",
                        'sender': "",
                        'reciver': ""
                    }
                }
                )
                .then(() => {
                    console.log("");
                })
                .catch((error) => {
                    console.error("Error writing creting in text message deletion function: ", error);
                });

        } catch (error) {
            console.log("Send Text message", error);
        }
        setCount("10");
    }
    const sendMessage = async () => {
        readMessage();
        // window.localStorage.setItem("userId","savindupasingtha@gmail.com")
        var d = new Date();
        var time = d.getHours() + " : " + d.getMinutes() + " : " + d.getSeconds();
        var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        // console.log(time+"-"+date);
        try {
            if (msg.length !== 0) {
                //auto generated doc ID 
                var objectId = docId + 1;
                var senderId = window.localStorage.getItem("userId");
                const db = firebase.firestore();
                await db
                    .collection("Messages")
                    .doc("chat")
                    .update(
                        {
                            [objectId]: {
                                'message': msg,
                                'time': time,
                                'date': date,
                                'sender': senderId,
                                'reciver': "Teacher"
                            }
                        }
                    ).then((responce) => {
                       // console.log("responce", responce);
                        if (responce) {
                            setStatus("-ok");
                        }
                        setStatus("-ok");
                        setCount("update");
                    }).catch((error) => {
                        console.log("Send Text message", error);
                    });
                //setStatus(" ");
            } else {
                setStatus("-Plase enter values");
            }
        } catch (err) {
            console.log(err);
        }
        setCount("change");
        setStatus("");
    }
    return (
        <div>
            <h1>chat text message box savindu</h1>
            <div style={{ position:"relative", overflow:"auto", width:"100%", height:"400px"}}>
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
