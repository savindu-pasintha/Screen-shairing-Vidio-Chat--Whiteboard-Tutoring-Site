import React, { useEffect } from 'react';
//import './Audiobridgetestjs.js';
import Janus from './janusNoJquery.js';

const Audiobridgetesting = () => {
    useEffect(() => {
        Exe();
    }, []);

       const Exe = ()=>{
        Janus.init({
            debug: true,
            dependencies: Janus.useDefaultDependencies(),
            // or: Janus.useOldDependencies() to get the behaviour of previous Janus versions
            callback: function (e) {
                console.log("initialized", e);
                let janus = new Janus(
                    {
                        server: 'http://3.14.149.201:8088/janus',
                        iceServers: [
                            { urls: 'stun:stun.l.google.com:19302' },
                            { urls: 'turn:18.217.79.41:3478?transport=tcp', credential: 'pass1', username: 'user1' }
                        ],
                        success: function () {
                            // Done! attach to plugin XYZ
                            janus.attach(
                                {
                                    plugin: "janus.plugin.audiobridge",
                                    success: function (pluginHandle) {
                                        // Plugin attached! 'pluginHandle' is our handle
                                        console.log(`We've succesfully attached ${pluginHandle}`)
                                    },
                                    error: function (cause) {
                                        // Couldn't attach to the plugin
                                    },
                                    consentDialog: function (on) {
                                        // e.g., Darken the screen if on=true (getUserMedia incoming), restore it otherwise
                                    },
                                    onmessage: function (msg, jsep) {
                                        // We got a message/event (msg) from the plugin
                                        // If jsep is not null, this involves a WebRTC negotiation
                                    },
                                    onlocaltrack: function (track, added) {
                                        // A local track to display has just been added (getUserMedia worked!) or removed
                                    },
                                    onremotetrack: function (track, mid, added) {
                                        // A remote track (working PeerConnection!) with a specific mid has just been added or removed
                                    },
                                    oncleanup: function () {
                                        // PeerConnection with the plugin closed, clean the UI
                                        // The plugin handle is still valid so we can create a new one
                                    },
                                    detached: function () {
                                        // Connection with the plugin closed, get rid of its features
                                        // The plugin handle is not valid anymore
                                    }
                                });
                        },
                        error: function (cause) {
                            // Error, can't go on...
                        },
                        destroyed: function () {
                            // I should get rid of this
                        }
                    });

            }
        });
       }
    


    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="page-header">
                            <h1>Plugin Demo: Audio Room (mixed)
                                <button className="btn btn-default" autoComplete="off" id="start">Start</button>
                            </h1>
                        </div>

                        <div className="container hide" id="audiojoin">
                            <div className="row">
                                <span className="label label-info" id="you" />
                                <div className="col-md-12" id="controls">
                                    <div className="input-group margin-bottom-md hide" id="registernow">
                                        <span className="input-group-addon">@</span>
                                        <input className="form-control" type="text" placeholder="Choose a display name" autoComplete="off" id="username" onkeypress="return checkEnter(event);" />
                                        <span className="input-group-btn">
                                            <button className="btn btn-success" autoComplete="off" id="register">Join the room</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container hide" id="room">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Participants <span className="label label-info hide" id="participant" />
                                                <button className="btn-xs btn-danger hide pull-right" autoComplete="off" id="toggleaudio">Mute</button>
                                                <button className="btn-xs btn-primary hide pull-right" autoComplete="off" id="position">Position</button></h3>
                                        </div>
                                        <div className="panel-body">
                                            <ul id="list" className="list-group">
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Mixed Audio</h3>
                                        </div>
                                        <div className="panel-body" id="mixedaudio" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />

            </div>
        </div>
    );
};


Audiobridgetesting.propTypes = {

};


export default Audiobridgetesting;
