import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import AuthLogin from "./Authentication";
import { Button, Checkbox } from 'antd';

const Login = () => {
    const [type, setType] = useState("password");
    const [err, setErr] = useState("");
   
    const [loginData, setLoginData] = useState({
    user :"",pass:""
    });
   
    const showPassword = (e) => {
        setErr("");  
        var status = e.target.checked.toString();
        if (status === "true") { 
         //  console.log(status); 
           setType("text");
         } else { setType("password"); }
    }

    const submitBtn=()=>{
        var len = loginData.user.length;
        var isgmail =  loginData.user.split("@");
       // console.log("isgmail",isgmail);
        if(isgmail[1] === "gmail.com" && loginData.user.length !== 0 && loginData.pass.length !== 0)
        { 
      //  console.log(loginData.user,loginData.pass);
        var obj =  new  AuthLogin();
        obj.userLoginFunction(loginData.user,loginData.pass);
    }else{
        setErr("Error !");  
    }
    }

    return (
        <div>
            <form onSubmit={(e)=>{e.preventDefault();}}>
                <div className="mb-3">
                    <label  className="form-label">Email address</label>
                    <input onChange={ (e) => {
                        setLoginData({
                            ...loginData, user : e.target.value
                        });}
                    } type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
              <p style={{color:"red"}}>{err}</p>
                </div>
                <div className="mb-3 ">
                    <label  className="form-label">Password</label>
                    <input onChange={ (e) => {
                        setLoginData({
                            ...loginData, pass : e.target.value
                        });
                    }
                    }  type={type} className="form-control" id="inputPassword" />
                     <p style={{color:"red"}}>{err}</p>
                    <Checkbox onChange={showPassword}>show</Checkbox> 
                </div>
                <Button onClick={submitBtn} type="submit" style={{ color: "white", backgroundColor: "black" }} >Login</Button>
            </form>
        </div>
    );
}

export default Login;
