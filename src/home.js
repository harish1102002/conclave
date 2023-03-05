import "./home.css";
import io from "socket.io-client";
import {useEffect, useState, useRef} from "react";

const soc=io.connect("http://localhost:8000");
function Home(props)
{
    let uni=[]
    const [post,setp]=useState(props.data.filter((e)=>{return(e.send==props.Id || e.rec==props.Id)}))
    const chats= new Map()
    const [inchat,seti]=useState([])
    const r=useRef(0)
    const pr=useRef(post)
    function scr(){document.getElementById("messages").scrollTop=document.getElementById("messages").scrollHeight;}
    
    post.forEach(e => {
        let x=(e.send==props.Id)?e.rec:e.send
        if(chats.has(x))
        {
        let y=chats.get(x)
        y.push(e)
        chats.set(x,y)
        }
        else
        {
        chats.set(x,[e])
        uni.push(x)
        }
    });


    function chatclick(v){
        document.getElementsByClassName("inchat")[0].style.display="block";
        r.current=v
        seti(chats.get(v))
        document.getElementsByClassName("alert "+v)[0].style.display="none";
    }
    const d = new Date()

    function dispuni() {
        document.getElementsByClassName("new")[0].style.display="inline";
        document.getElementsByClassName("newrec")[0].style.display="inline"
        document.getElementsByClassName("newsub")[0].style.display="inline";
        document.getElementsByClassName("newcon")[0].style.display="none";
    }

    function setuni() {
        if(document.getElementsByClassName("new")[0].value.trim()=="")
        return
        document.getElementsByClassName("newrec")[0].style.display="none"
        document.getElementById("new").style.display="none";
        document.getElementById("newsub").style.display="none";
        document.getElementById("newcon").style.display="inline";
        let e={send:props.Id,rec:document.getElementsByClassName("newrec")[0].value.trim()
            ,time:d.getHours()+":"+((d.getMinutes()<10)?"0":"")+d.getMinutes()+"\t"+d.getDate()+"/"+(d.getMonth()+1),
            msg:document.getElementById("new").value.trim()}
        soc.emit("send",e)
        let y=pr.current.slice()
        y.push(e)
        setp(y)
        document.getElementsByClassName("newrec")[0].value=""
        document.getElementById("new").value="";
    }
    useEffect(()=>{
        if(post==pr.current)
        return
        pr.current=post
        let e=post[post.length-1]
        if(e.send==props.Id)
        {
           return
        }
        let y=chats.get(e.send).slice()
        if(r.current==e.send)
        seti(y)
        else
        document.getElementById(e.send).style.display="inline";
        
    },[post])
    useEffect(()=>scr(),[inchat])
    useEffect(()=>{
    soc.on("receive",(e)=>{
        if(e.rec==props.Id)
        {
        let y=pr.current.slice()
        y.push(e)
        setp(y)
        }
    });
    },[soc])

    const sub=()=>{
        if(document.getElementById("typing").value.trim() == "")
        return
        let e={send:props.Id,rec:r.current,time:d.getHours()+":"+((d.getMinutes()<10)?"0":"")+d.getMinutes()+"\t"+d.getDate()+"/"+(d.getMonth()+1),msg:document.getElementById("typing").value.trim()}
        soc.emit("send",e)
        let y=pr.current.slice()
        y.push(e)
        setp(y)
        y=chats.get(e.rec).slice()
        y.push(e)
        seti(y)
        document.getElementById("typing").value="";
    }
    
    return(
        <div className="home">
            <div className="nav"><p className="kuruk">Conclave</p></div>
            <div className="chats" id="chats">
                <div className="chatlog">
                <div className="newchat">
                    <p id="newcon" onClick={dispuni} className="newcon">New contact</p>
                    <input id="newrec" className="newrec" placeholder="name"/>
                    <input id="new" className="new" placeholder="msg"/>
                    <button id="newsub" className="newsub" onClick={setuni}>submit</button>
                </div>
                {
                    uni.map((v)=>
                        <div className="mainchat" onClick={()=>chatclick(v)}>
                            <p>{v}</p>
                            <p className={"alert "+v} id={v}>n</p>
                        </div>
                    )
                }
                </div>
                <div className="inchat">
                    <div id="messages" className="messages">
                    {
                        inchat.map((e)=>
                        <div className="chat">
                        <p className="sender">{e.send}</p>
                        <p className="msg">{e.msg}</p>
                        <p className="date">{e.time}</p>
                        </div>
                        )
                    }
                    </div>
                    <div className="chatbox">
                    <input className="typing" id="typing" placeholder="type ur text" onFocus={(e)=>{e.target.placeholder=" "}} autoComplete="off" onBlur={(e)=>{e.target.placeholder="type ur text"}}/>
                    <button onClick={sub} className="send">send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;