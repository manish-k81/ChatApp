import React from "react";
import { useState, useEffect } from "react";
import io from 'socket.io-client'

const socket = io('http://localhost:7000')
const userName = 'User '+parseInt(Math.random()*10)


function Chat(){
    const [ message, setMessage ] = useState('')
    const[ chat, setChat ] = useState([])

    useEffect(()=>{
        socket.on('message',payload=>{
            setChat([...chat,payload])
        })
    })

    function sendMessage(e){
        e.preventDefault()
        socket.emit('message',{userName,message})
        console.log(message)
        setMessage('')
    }
    return(
        // <div className="main">
        //     <h1>Messengerr</h1>
        //     <form className="myForm" onSubmit={sendMessage}>
        //         <input type="text" value={message} onChange={(e)=>{setMessage(e.target.value)}} required></input>
        //         <button type="submit">Send</button>
        //     </form>
        //     <p>{message}</p>
            
        //     {
        //         chat.map((payload,index)=>{
        //             <div>
        //             <h3>{payload}</h3>
        //             <h3>{index}</h3>
        //             </div>
        //         })
        //     }
        // </div>

        <div className="App">
      <h1>Welcome to chat app</h1>
      <form onSubmit={sendMessage}>
        <input type="text" name="message"
        placeholder='Type message'
        value={message}
        onChange={(e)=>{setMessage(e.target.value)}}
        required
        ></input>
        <button type='submit'>Send</button>
      </form>
      {chat.map((payload, index)=>{
        return(
          <h3 key={index}>{payload.userName}: <span>{payload.message}</span></h3>
        )
      })}
    </div>
    )
}
export default Chat