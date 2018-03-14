let SocketObj = {};
let SocketID = {};

let sendMessage = (id, str) => {
    SocketObj[id].emit('receiveMessage', str);
};

module.exports = (server) => {
    let io = require('socket.io')(server, {
        "transports": ['websocket', 'polling']
    });
    io.sockets.on('connection', function (socket) {
        console.log('User connected');
        socket.emit('get_id', "");
        socket.on('send_id', function (data) {
            SocketObj[data] = socket;
            SocketID[socket.id] = data;
            console.log(data);
        });
        socket.on('disconnected', function () {
            console.log('User disconnected');
            delete SocketObj[SocketID[socket.id]];
        });
        socket.on('sendMessage', function (data) {
            socket.emit('receiveMessage', `[${Date.now().toString()}]${JSON.stringify(data)}`)
            SocketObj[data.id].emit('receiveMessage', 'receiveMessage');
        });
    });
};

module.exports.sendMessage = sendMessage;