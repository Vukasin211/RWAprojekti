const listenPort = 8080;
const ioPort = 4000;

const io = require('socket.io')(ioPort, {
    cors:{
        origin: ["http://127.0.0.1:5500"],
    }
});

io.on('connection', socket => {
    console.log(socket.id);

    socket.on("send-message", ({id, card}) => {
        socket.broadcast.emit("recive-message", {id, card});
    })
})

