class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io('http://localhost:3000',{ transports : ['websocket'] })

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;

        this.socket.on('connect',function(){
            // console.log('connetion established using sockets......')

            self.socket.emit('join_room',{
                email : self.userEmail,
                chatroom : 'CodeialRoom'
            })

            self.socket.on('user_joined',function(data){
                console.log('user joined',data);
            })
        });


        //send a message on clicking the send message button on front end

        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();
            if(msg!= ''){
                self.socket.emit('send_message',{
                    message : msg,
                    user_email: self.userEmail,
                    chatroom : 'CodeialRoom'
                })
            }
        })

        //detect for the incoming messages and show case in the chat room
        self.socket.on('recieve_message',function(data){
            // console.log('recieved message',data);

            let newMessage = $('<li>');
            let messageType = 'other-messages';

            if(data.user_email == self.userEmail){
                messageType = 'self-messages';
            }

            newMessage.append($('<span>',{
                html : data.message
            }));

            newMessage.append($('<sub>',{
                html : data.user_email
            }));

            newMessage.addClass(messageType);
            $('#chat-messages-list').append(newMessage);
        })
    }
}