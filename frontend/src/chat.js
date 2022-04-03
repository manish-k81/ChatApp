import React from "react";
import { useState, useEffect } from "react";
import io from 'socket.io-client'

const socket = io('http://localhost:7000')

function Chat(){
    const [ message, setMessage ] = useState('')
    const [ name, setName ] = useState('')
    const[ chat, setChat ] = useState([])

    useEffect(()=>{
      // console.log("5")
        socket.on('message',payload=>{
            setChat([...chat,payload])
            // console.log("6")
        })
    })
    function sendMessage(e){
        e.preventDefault()
        // console.log("3")
        socket.emit('message',{message,name})
        setMessage('')
        setName('')
        // console.log("4")
    }
    return(
        <div className="App">
        <h1>Welcome to chat app</h1>
        <div className="main">
        <form onSubmit={sendMessage} className="myform">
        <input type="text" name="message" placeholder='Type message' value={message} onChange={(e)=>{setMessage(e.target.value)}} required/><br/> 
        <input type="text" name="name" placeholder="username" value={name} onChange={(e)=>{setName(e.target.value)}} required/><br/> 
        <button type='submit'>Send</button>
      </form>
        </div>
      {chat.map((payload, index)=>{
        return(
          <div>
          <h3 className="heading" key={index}>{payload.name}: <span className="myspan">{payload.message}</span></h3>
          </div>
        )
      })}
    </div>
    )
}
export default Chat;