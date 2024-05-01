import { useState, useEffect } from "react";

import ChatProfileComp from "./chat-profile-comp"
import MessageComp from "./message-comp"
import { ChatMessage } from "../../../common";
import { RETREIVE_CHAT_MESSAGES } from "../../../services/chats";
import { getItem } from "../../../utils";


const ChatComp = () => {
  const senderId: string = getItem('clientD');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const retrieveChatMessages = () => {
    const queryString: string = `?room=65fa00449edba15dc46167e7&sort=-updatedAt&populate=sender,recipient,room`
    RETREIVE_CHAT_MESSAGES(queryString).then(res => {
      const { payload } = res.data;
      console.log('payload', payload);
      setChatMessages(payload);
    }).catch(err => {
      console.log('error', err);
    })
  }

  useEffect(() => {
    retrieveChatMessages();
  }, [])


  return (
    <>
      <div className="w-full bg-white border-[1px] border-[#e0e0e0] rounded-lg shadow-md relative h-[90vh]">
        <ChatProfileComp data={{profileImage: 'https://picsum.photos/200'}} />

        {/* chats */}
        <div className="w-full bg-white overflow-y-scroll h-[90%] p-4">
          {
            chatMessages.length > 0 && chatMessages.map((chat: ChatMessage, idx) => {
              return <MessageComp key={idx} chatMessage={chat} direction={chat.sender.id === senderId ? 'outgoing' : 'incoming'} />
            })
          }
        </div>
        {/* chats */}
      </div>
    </>
  )
}

export default ChatComp