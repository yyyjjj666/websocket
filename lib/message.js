const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
}

const myEmitter = new MyEmitter();

let register_Event = (event_name, socket) => {
    myEmitter.on(event_name, () => {
        console.log('触发了一个事件！');
        socket.emit(`${socket.id} is received`);
    });
};

module.exports.myEmitter = myEmitter;
module.exports.register_Event = register_Event;
