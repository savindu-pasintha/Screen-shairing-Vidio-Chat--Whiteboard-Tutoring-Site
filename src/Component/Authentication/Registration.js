import React, { useState } from 'react';
import './Registration.css';
import FilterAndSearch from '../FilterAndSearch/FilterAndSearch';
import { Button } from 'antd';
import Auth from './Authentication';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';




const Registration = () => {
    //drop downs garde and program
    const [openGrade, setOpenGrade] = useState(false);
    const [openProgram, setOpenProgram] = useState(false);
    const handleClickGrade = () => {
      setOpenGrade((prev) => !prev);
    };
    const handleClickAwayGrade = () => {
      setOpenGrade(false);
    };
    const handleClickProgram = () => {
        setOpenProgram((prev) => !prev);
      };
      const handleClickAwayProgram = () => {
        setOpenProgram(false);
      };
      
    
      
    
    const [grade, setGrade] = useState("");
    const [program, setProgram] = useState("");
    const [mobiletel, setMobiletel] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [lineOne, setLineOne] = useState("");
    const [lineTwo, setLineTwo] = useState("");
    const [lineThree, setLineThree] = useState("");
    const [hometel, setHometel] = useState("");
    const [stateV, setStateV] = useState({
        firstname: "",
        lastname: "",
        email: "",
        lineone: "",
        linetwo: "",
        linethree: "",
        mobile: "",
        home: "",
        grade: "",
        program: "",
        timestamp: ""
    });


    const buttonOnclick = () => {
        try {
          var a,b,c,d,e,f,g,h,i,j;
             a=firstName; b=lastName; c=email; d=lineOne; e=lineTwo;
             f=lineThree; g=mobiletel; h=hometel;  i=grade;
             j=program; 
             setStateV({
                 ...stateV,
                "firstname" : a,
                "lastname": b,
                "email": c,
                "lineone": d,
               "linetwo": e,
                "linethree": f,
                "mobile": g,
               "home": h,
                "grade": i,
                "program": j,
                "timestamp": new Date()
            });
           // console.log(stateV);
            //   var x = new Boolean(true);
            if ((firstName.length !== 0) &&
                (lastName.length !== 0) &&
                (email.length !== 0) &&
                (lineOne.length !== 0) &&
                (lineTwo.length !== 0) &&
                (lineThree.length !== 0) &&
                (hometel.length !== 0) &&
                (mobiletel.length !== 0) &&
                (program.length !== 0) &&
                (grade.length !== 0)
            ) {
              new Auth().registration(stateV.email, stateV);
           
            } else {
                // console.log("Please enter values");
                 window.alert("Please enter values");
            }

        } catch (e) {
            console.log(e);
        }

    
    }

    const dropDownProgram = () => {
        const words = ['Math', 'Science', 'History', 'BIO', 'ART', 'IT', "SOCIAL", "BUSINESS", "TECH"];
        var arr = new FilterAndSearch().filterList(words, program);
        const list = arr.map((item,index)=>{
            return(
                <p onClick={()=>{setProgram(item)}} key={index}  style={{backgroundColor:"white",color:"black",textAlign:"left",paddingLeft:"3px", border:"1px solid black"}}>{item}</p>          
            );
        });
        return (
            <ClickAwayListener onClickAway={handleClickAwayProgram}  style={{ position:"relative", width: "250px", height:"auto",paddingLeft:"3px"}}>
                <div >
                    {openProgram ? (
                        <div style={{ width: "250px", height:"auto"}}>
                            {list}  
                        </div>
                    ) : null}
                </div>
            </ClickAwayListener>
        );
    }

    const dropDownGrade = () => {
        const words = ['garde 1', 'garde 11', 'garde 3', 'garde 4', 'garde 5', 'garde 6', "garde 7", "garde 8", "garde 11"];
        var arr = new FilterAndSearch().filterList(words, grade);
        const list = arr.map((item,index)=>{
            return(
                <p onClick={()=>{setGrade(item)}} key={index}  style={{position:"relative",backgroundColor:"white",color:"black", textAlign:"left",border:"1px solid black"}}>{item}</p>          
            );
        });
        return (
            <ClickAwayListener onClickAway={handleClickAwayGrade} style={{ width: "250px", height:"auto"}}>
                <div style={{ width: "250px", height:"auto"}}>
                    {openGrade ? (
                         <div>
                         {list}  
                     </div>
                    ) : null}
                </div>
            </ClickAwayListener>
        );
    }


    return (
        <div style={{ width: "100%", height: "auto", padding: "0" }} className="row">
            <div className="col-md-6 col-sm-12 leftSide"></div>
            <div className="col-md-6 col-sm-12 rightSide">
                <form noValidate autoComplete="off" onSubmit={(e) => { e.preventDefault(); }}>
                    <div style={{ padding: "10px" }}>
                        <input required style={{ width: "250px", paddingBottom: "10px" }} className="input is-small" type="text" placeholder="First Name" onChange={(e) => { setFirstName(e.target.value); }} value={firstName} id="standard-basic" label="First Name" />
                    </div>
                    <div style={{ padding: "5px" }}>
                        <input required style={{ width: "250px", paddingBottom: "10px" }} className="input is-small" type="text" placeholder="Last Name" id="standard-basic" onChange={(e) => { setLastName(e.target.value); }} value={lastName} label="Last Name" />
                    </div>
                    <div style={{ padding: "5px" }}>
                        <input required style={{ width: "250px", paddingBottom: "10px" }} className="input is-small" type="email" placeholder="Email" id="standard-basic" onChange={(e) => { setEmail(e.target.value); }} value={email} label="Email" type="email" />
                    </div>
                    <div style={{ padding: "5px" }}>
                        <input required style={{ width: "250px", paddingBottom: "10px" }} className="input is-small" type="text" placeholder="Address Line One" id="standard-basic" onChange={(e) => { setLineOne(e.target.value); }} value={lineOne} label="Address Line One" />
                    </div>
                    <div style={{ padding: "5px" }}>
                        <input required style={{ width: "250px", paddingBottom: "10px" }} className="input is-small" type="text" placeholder="Address Line Two" id="standard-basic" onChange={(e) => { setLineTwo(e.target.value); }} value={lineTwo} label="Address Line Two" />
                    </div>
                    <div style={{ padding: "5px" }}>
                        <input required style={{ width: "250px", paddingBottom: "10px" }} className="input is-small" type="text" placeholder="Address Line Three" id="standard-basic" onChange={(e) => { setLineThree(e.target.value); }} value={lineThree} label="Address Line Three" />
                    </div>
                    <div style={{ padding: "5px" }}>
                        <input className="input is-small" value={grade} type="text" required style={{ width: "250px", paddingBottom: "10px" }} onChange={(e) => { setGrade(e.target.value); handleClickGrade(); }} placeholder="Garde" />
                    </div>
                    <div style={{ padding: "5px" }}>
                    <div style={{position:"relative", width: "240px", left:"30%" }}>
                            {
                                dropDownGrade()
                            }
                    </div>
                    </div>
                    <div style={{ padding: "5px" }} >
                        <input className="input is-small" value={program} type="text" required style={{ width: "250px", paddingBottom: "10px" }} onChange={(e) => { setProgram(e.target.value); handleClickProgram(); }} placeholder="Programm" />
                    </div>
                    <div style={{ paddingLeft: "5px" }}>
                      <div style={{  width: "240px",position:"relative" ,left:"30%"}}>
                            {
                                dropDownProgram()
                            }
                      </div>
                    </div>

                    <div style={{ padding: "5px" }}>
                        <PhoneInput
                            style={{ width: "250px", paddingBottom: "10px", position: "relative", left: "30%" }}
                            // `value` will be the parsed phone number in E.164 format.
                            //  Example: "+12133734253".
                            placeholder="Mobile +94 76 875..."
                            value={mobiletel}
                            onChange={setMobiletel} />
                    </div>
                    <div style={{ padding: "5px", }}>
                        <PhoneInput
                            style={{ width: "250px", paddingBottom: "10px", position: "relative", left: "30%" }}
                            placeholder="Home +94 76 875..."
                            value={hometel}
                            onChange={setHometel} />
                    </div>
                    <div>
                        <Button onClick={buttonOnclick}
                            style={{ width: "250px", paddingBottom: "10px", color: "white", backgroundColor: "black" }} >
                            Registration
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    );
};




export default Registration;
