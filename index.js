'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const port = process.env.PORT || 3000;
const index = path.join(__dirname, 'index.html');

const server = express()
    .use((req, res)=>res.sendFile(index))
    .listen(port, ()=>{console.log('Listening on port:', port)});


const io = socketIO(server);

io.on('connection', (socket)=>{
    console.log('client connected');
    socket.on('disconnect', ()=>{console.log('client disconnected')});
});

setInterval(()=> io.emit('time',new Date().toTimeString()),100);