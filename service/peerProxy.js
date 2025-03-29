const {WebSocketServer} = require('ws')

function peerProxy(server) {
    const socketServer = new WebSocketServer({server})

    socketServer.on('connection', (socket)=>{
        socket.isAlive = true

        socket.on('message', function message(data) {
            socketServer.clients.forEach((client)=>{
                if (/*client !== socket &&*/ client.readyState === WebSocket.OPEN){
                    client.send(data);
                };
            });
        })

        socket.on('pong', ()=>{
            socket.alive = true;
        })
    })
    setInterval(()=>{
        socketServer.clients.forEach(function each(client){
            if (client.isAlive === false) return client.terminate();

            client.isAlive = false;
            client.ping()
        });
    }, 10000);
}


module.exports = {
    peerProxy
}