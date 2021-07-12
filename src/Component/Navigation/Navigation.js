import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Router , BrowserRouter} from 'react-router-dom';
import './Navigation.css';
const useStyles = makeStyles((theme) => ({
   
    root: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

const Navigation = () => {
    const classes = useStyles();
    const preventDefault = (event) => event.preventDefault();
    const sty={
        fontSize:"14px", color:"black",padding:"10px",position:"relative",color:"black",fontWeight:"bolder"
    }
    return (
        <div className="Navigation">
          
               
                <Link to = "/"  style={sty} >
                 Home
                </Link>

                <Link to = "/janus"  style={sty} >
                 Janus
                </Link>

                <Link to="/login" style={sty}>
                    Login
                </Link>

                <Link to="/registration" style={sty} >
                    Registrationn
                </Link>

                <Link to="/msg"  style={sty} >
                   Message
                </Link>

                <Link to = "/meeting"  style={sty} >
                 Meeting
                </Link>

                <Link to = "/drawing"  style={sty} >
                    Drawing
                </Link>
                <Link to = "/drawing2"  style={sty} >
                    Drawing2
                </Link>

                <Link to = "/whiteboard"  style={sty} >
                   Whiteboard
                </Link>

                <Link to = "/erase"  style={sty} >
                   clear
                </Link>
                <Link to = "/erase2"  style={sty} >
                   clear2
                </Link>

                <Link to = "/drawing"  style={sty} >
                  Payment
                </Link>

             
                <Link to = "/drawing"  style={sty} >
                   download canvase element 
                </Link>

                <Link to = "/pdf"  style={sty} >
                   PDF Load to canvase element
                </Link>
              
        </div>
    );
};


Navigation.propTypes = {

};


export default Navigation;
