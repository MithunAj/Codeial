module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);
    io.sockets.on('connection',function(socket){
        // console.log('New connection recieved',socket.id);
        socket.on('disconnect',function(){
            // console.log('Connection disconnected!!!')
        })

        socket.on('join_room',function(data){
            // console.log('Joining req received');
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined',data);
        })

        // detect send message event and broadcast it to evryone in the respective chatroom

        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('recieve_message',data);
        })
    })

}