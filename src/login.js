import "./login.css";
import Home from "./home";
import {useEffect, useState} from "react";

let post=[]
function Login() {
    const [userid,setud]=useState("");
    fetch("https://conclave.onrender.com").then(
                (res) => res.json()
            ).then((j)=>
                {post=j})
    const newaccount = (e) => {
        if (document.getElementsByClassName("newacc")[0].innerHTML == 'Login Here') {
            document.getElementsByClassName("retype")[0].style.display = "none";
            document.getElementsByClassName("newacc")[0].innerHTML = 'Sign up';
            document.getElementsByClassName("newacc")[0].style.marginTop = "4vh";
            document.getElementsByClassName("head")[0].innerHTML = "Login";
        }
        else {
            document.getElementsByClassName("retype")[0].style.display = "inline";
            document.getElementsByClassName("newacc")[0].innerHTML = 'Login Here';
            document.getElementsByClassName("newacc")[0].style.marginTop = "4vh";
            document.getElementsByClassName("submit")[0].style.marginTop = "2.5vh";
            document.getElementsByClassName("head")[0].innerHTML = "Create account";
        }
    }

    const submit = (e) => {
        if (document.getElementById("user").value.trim() == "") {
            document.getElementsByClassName("userincorrect")[0].style.display = "inline";
            document.getElementsByClassName("password")[0].style.marginTop = "1vh";
            document.getElementsByClassName("passwordincorrect")[0].style.display = "none";
            document.getElementsByClassName("retypeincorrect")[0].style.display = "none";
            return;
        }
        if (document.getElementById("pass").value.trim() == "") {
            document.getElementsByClassName("passwordincorrect")[0].style.display = "inline";
            document.getElementsByClassName("retype")[0].style.marginTop = "1vh";
            document.getElementsByClassName("newacc")[0].style.marginTop = "2vh";
            document.getElementsByClassName("retypeincorrect")[0].style.display = "none";
            return;
        }
        if(document.getElementById("user").value.trim()+"#1"==document.getElementById("pass").value.trim())
        {
            document.getElementsByClassName("login")[0].style.display="none";
            setud(document.getElementById("user").value.trim());
        }
        else
        {
            document.getElementsByClassName("passwordincorrect")[0].style.display = "inline";
        }
        }

    return (
        <div className="background">
            {userid!=""?<Home Id={userid} data={post}/>:
            <div className="login">
                <h1 className="head">Login</h1>
                <input className="user" id="user" spellCheck="false"
                    onFocus={(e) => {
                        e.target.placeholder = ''; document.getElementsByClassName("userincorrect")[0].style.display = "none";
                        document.getElementsByClassName("password")[0].style.marginTop = "4vh";
                    }}
                    onBlur={(e) => { e.target.placeholder = 'user' }}
                    placeholder='user' />
                <p className="userincorrect" >Please fill valid info</p>
                <input className="password" id="pass" spellCheck="false"
                    onFocus={(e) => {
                        e.target.placeholder = ''; document.getElementsByClassName("passwordincorrect")[0].style.display = "none";
                        document.getElementsByClassName("retype")[0].style.marginTop = "4vh";
                    }}
                    onBlur={(e) => { e.target.placeholder = 'password' }} placeholder='password' />
                <p className="passwordincorrect" >Please fill valid info</p>
                <input className="retype" id="retype" spellCheck="false"
                    onFocus={(e) => {
                        e.target.placeholder = ''; document.getElementsByClassName("retypeincorrect")[0].style.display = "none";
                        document.getElementsByClassName("newacc")[0].style.marginTop = "4vh";
                    }}
                    onBlur={(e) => { e.target.placeholder = 'retype' }} placeholder='retype' />
                <p className="retypeincorrect" >Please fill valid info</p>
                <span className="newacc" >Sign up</span>
                <button className="submit" onClick={submit}>Submit</button>
                </div>}
            </div>
    );
}

export default Login;