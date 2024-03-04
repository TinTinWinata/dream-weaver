var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { Server } = require("socket.io");
var http = require('http');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: "*" }))

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    const name = socket.handshake.query.name
    if (typeof name !== 'string') {
        io.to(socket.id).emit('receive-message', {
            error: "socket connection failed"
        })
        return
    }
    socket.join(name)
    socket.on('send-message', ({ room, donation }) => {
        socket.broadcast.to(room).emit('receive-message',donation)
    })
})

httpServer.listen(8888)
