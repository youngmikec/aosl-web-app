import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import MessageComp from "./message-comp"
import { getItem } from "../../../utils";
import ChatInputComp from "./chat-input-comp";
import ChatProfileComp from "./chat-profile-comp"
import { ChatMessage, ChatRoom } from "../../../common";
import { RETREIVE_CHAT_MESSAGES, SEND_CHAT_MESSAGE } from "../../../services/chats";
import { ADD_CHAT_MESSAGE, SET_ACTIVE_CHAT_ROOM, SET_CHAT_MESSAGES } from "../../../store/Chat";
import { RETREIVE_CHAT_ROOMS } from "../../../services/chat-rooms";


const ChatComp = () => {
  const dispatch = useDispatch();

  const sender = getItem('clientD');
  const [senderId, setSenderId] = useState<string>('');
  const [recipientId, setRecipientId] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>('');

  const retrieveChatMessages = useCallback(() => {
    const queryString: string = `?room=${roomId}&populate=sender,recipient,room`;
    RETREIVE_CHAT_MESSAGES(queryString).then(res => {
      const { payload } = res.data;
      setChatMessages(payload);
      dispatch(SET_CHAT_MESSAGES(payload));
    }).catch(err => {
      console.log('error', err);
    });
  }, [roomId, dispatch]);

  const retrieveChatRooms = useCallback((roomId: string) => {
    const query: string = `?_id=${roomId}&sort=-createdAt&populate=members,createdBy`;
    RETREIVE_CHAT_ROOMS(query).then(res => {
      const { payload } = res.data;
      setChatRoom(payload[0]);
      dispatch(SET_ACTIVE_CHAT_ROOM(payload[0]));
    }).catch(err => {
      console.log('error', err);
    });
  }, [dispatch]);

  const sendMessage = useCallback(() => {
    const data = {
      message,
      room: roomId,
      sender: senderId,
      recipient: recipientId
    };
    if (message !== '') {
      SEND_CHAT_MESSAGE(data).then(res => {
        const { payload } = res.data;
        dispatch(ADD_CHAT_MESSAGE(payload));
        setMessage('');
      }).catch(err => {
        console.log('error', err);
      });
    }
  }, [message, roomId, senderId, recipientId, dispatch]);

  useEffect(() => {
    if (sender) {
      setSenderId(sender.id);
      setRoomId(sender.chatRoom);
      retrieveChatRooms(sender.chatRoom);
    }
  }, [sender, retrieveChatRooms]);

  useEffect(() => {
    if (chatRoom) {
      setRoomId(chatRoom.id);
      if (chatRoom.members.length > 0) {
        setRecipientId(chatRoom.members.filter((member: any) => (member.id !== senderId))[0].id);
      }
    }
  }, [chatRoom, senderId]);

  useEffect(() => {
    if (roomId) {
      if (chatMessages.length < 1) {
        setInterval(() => {
          retrieveChatMessages();
        }, 7000);
      } else {
        retrieveChatMessages();
      }
    }
  }, [roomId, chatMessages.length, retrieveChatMessages]);


  return (
    <>
      <div className="w-full bg-white border-[1px] border-[#e0e0e0] rounded-lg shadow-md relative h-[90vh]">
        <ChatProfileComp data={chatRoom} />

        {/* chats */}
        <div className="w-full bg-white overflow-y-scroll mt-[60px] h-[85%] p-4 pb-12">
          {
            chatMessages.length > 0 && chatMessages.map((chat: ChatMessage, idx) => {
              return <MessageComp key={idx} chatMessage={chat} direction={chat.sender.id === senderId ? 'outgoing' : 'incoming'} />
            })
          }
        </div>
        {/* chats */}

        <div className="w-full p-4 absolute bottom-0 left-0 right-0 z-10">
          <ChatInputComp value={message} onChannge={(e) => setMessage(e.target.value)} onSubmit={sendMessage} />
        </div>
      </div>
    </>
  );
}

export default ChatComp;