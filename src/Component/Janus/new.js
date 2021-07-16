import Janus from './janusNoJquery.js';

/* steps
1 include the Janus JavaScript library in your web page;
2 initialize the Janus JavaScript library and (optionally) passing its dependencies;
3 connect to the server and create a session;
4 create one or more handles to attach to a plugin (e.g., echo test and/or streaming);
5 interact with the plugin (sending/receiving messages, negotiating a PeerConnection);
5 eventually, close all the handles and shutdown the related PeerConnections;
6 destroy the session.
*/
Janus.init({
    debug: 'all',
    dependencies: Janus.useDefaultDependencies(), 
    // or: Janus.useOldDependencies() to get the behaviour of previous Janus versions
    callback: function() {
            // Done!
    }
});



// Attach to echo test plugin, using the previously created janus instance
Janus.attach(
    {
            plugin: "janus.plugin.echotest",
            success: function(pluginHandle) {
                    // Plugin attached! 'pluginHandle' is our handle
            },
            error: function(cause) {
                    // Couldn't attach to the plugin
            },
            consentDialog: function(on) {
                    // e.g., Darken the screen if on=true (getUserMedia incoming), restore it otherwise
            },
            onmessage: function(msg, jsep) {
                    // We got a message/event (msg) from the plugin
                    // If jsep is not null, this involves a WebRTC negotiation
            },
            onlocaltrack: function(track, added) {
                    // A local track to display has just been added (getUserMedia worked!) or removed
            },
            onremotetrack: function(track, mid, added) {
                    // A remote track (working PeerConnection!) with a specific mid has just been added or removed
            },
            oncleanup: function() {
                    // PeerConnection with the plugin closed, clean the UI
                    // The plugin handle is still valid so we can create a new one
            },
            detached: function() {
                    // Connection with the plugin closed, get rid of its features
                    // The plugin handle is not valid anymore
            }
    });