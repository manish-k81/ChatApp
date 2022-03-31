import React from "react";
import { useState, useEffect } from "react";
import io from 'socket.io-client'

const socket = io('http://localhost:7000')
// const userName = 'User '+parseInt(Math.random()*10)

function Chat(){
    const [ message, setMessage ] = useState('')
    const [ name, setName ] = useState('')
    const[ chat, setChat ] = useState([])

    useEffect(()=>{
        socket.on('message',payload=>{
            setChat([...chat,payload])
        })
    })
    function sendMessage(e){
        e.preventDefault()
        socket.emit('message',{message,name})
        // console.log(message)
        // console.log(name)
        setMessage('')
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