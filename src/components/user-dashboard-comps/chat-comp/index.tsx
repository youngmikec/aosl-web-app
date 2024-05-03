import { useState, useEffect } from "react";

import ChatProfileComp from "./chat-profile-comp"
import MessageComp from "./message-comp"
import { ChatMessage } from "../../../common";
import { RETREIVE_CHAT_MESSAGES, SEND_CHAT_MESSAGE } from "../../../services/chats";
import { getItem } from "../../../utils";
import ChatInputComp from "./chat-input-comp";


const ChatComp = () => {
  const sender = getItem('clientD');
  const [senderId, setSenderId] = useState<string>('');
  const [recipientId, setRecipientId] = useState<string>('636f5426eea18523e0393dbe');
  const [roomId, setRoomId] = useState<string>('65fa00449edba15dc46167e7');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>('');

  const retrieveChatMessages = () => {
    const queryString: string = `?room=65fa00449edba15dc46167e7&populate=sender,recipient,room`
    RETREIVE_CHAT_MESSAGES(queryString).then(res => {
      const { payload } = res.data;
      console.log('payload', payload);
      setChatMessages(payload);
    }).catch(err => {
      console.log('error', err);
    })
  }

  const sendMessage = () => {
    const payload = {
      message,
      room: roomId,
      sender: senderId,
      recipient: recipientId
    }
    if(message !== ''){
      SEND_CHAT_MESSAGE(payload).then(res => {
        const { message, success, payload } = res.data;
        console.log('message', message);
        setMessage('');
        retrieveChatMessages();
      }).catch(err => {
        console.log('error', err);
      });
    }
  }

  useEffect(() => {
    if(chatMessages.length < 1) {
      setInterval(() => {
        retrieveChatMessages();
      }, 4000);
    }else {
      retrieveChatMessages();
    }
  }, [])

  useEffect(() => {
    sender && setSenderId(sender.id);
  }, [sender]);


  return (
    <>
      <div className="w-full bg-white border-[1px] border-[#e0e0e0] rounded-lg shadow-md relative h-[90vh]">
        <ChatProfileComp data={{profileImage: 'https://picsum.photos/200'}} />

        {/* chats */}
        <div className="w-full bg-white overflow-y-scroll mt-[60px] h-[85%] p-4 pb-12">
          {
            chatMessages.length > 0 && chatMessages.map((chat: ChatMessage, idx) => {
              return <MessageComp key={idx} chatMessage={chat} direction={chat.sender.id == senderId ? 'outgoing' : 'incoming'} />
            })
          }
        </div>
        {/* chats */}

        <div className="w-full p-4 absolute bottom-0 left-0 right-0 z-10">
          <ChatInputComp value={message} onChannge={(e) => setMessage(e.target.value)} onSubmit={sendMessage}/>
        </div>
      </div>
    </>
  )
}

export default ChatComp