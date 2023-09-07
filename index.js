const express = require('express');
const cors =require('cors');
const app=express();
const http=require('http');
const {Server}= require('socket.io');
app.use(cors());
const server= http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    },
});

io.on("connection",(socket)=>{
    console.log('User Conneccted:'+socket.id);

    socket.on("join_room",(data)=>{
        socket.join(data.room);
    });
    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data);
    });
    //Not working was trying to give the Information of the person who was leaving the server to everyone
    socket.on("leave_room",(data)=>{
        // userLeave(socket.id);
        socket.broadcast.to(data.room).emit("leave_message",data);
        socket.leave(data.room);
    });
  
});
server.listen(3001,()=>{
    console.log("Server Working Fine");
});