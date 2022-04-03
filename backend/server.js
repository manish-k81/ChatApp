const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server,{
    cors:{
        origin:'*',
    }
})

io.on('connection', socket =>{
    console.log("1")
    console.log('connection made successfully')
    socket.on('message',payload => {
        console.log('Message received on server: ', payload)
        // console.log("7")
        io.emit('message',payload)
        // console.log("8")
    })
})

server.listen(7000,()=>{
    console.log('I am listening at port: 7000)');
})