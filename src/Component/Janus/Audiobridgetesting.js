import React from 'react';


const Audiobridgetesting = () => {
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
                                        <input className="form-control" type="text" placeholder="Choose a display name" autoComplete="off" id="username" onkeypress="return checkEnter(this, event);" />
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
