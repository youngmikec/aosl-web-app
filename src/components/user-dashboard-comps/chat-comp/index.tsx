import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MessageComp from "./message-comp"
import { getItem } from "../../../utils";
import { RootState } from "../../../store";
import ChatInputComp from "./chat-input-comp";
import ChatProfileComp from "./chat-profile-comp"
import { ChatMessage, ChatRoom } from "../../../common";
import { RETREIVE_CHAT_MESSAGES, SEND_CHAT_MESSAGE } from "../../../services/chats";
import { ADD_CHAT_MESSAGE, SET_ACTIVE_CHAT_ROOM, SET_CHAT_MESSAGES } from "../../../store/Chat";
import { RETREIVE_CHAT_ROOMS } from "../../../services/chat-rooms";


const ChatComp = () => {
  const ChatMessages: ChatMessage[] = useSelector((state: RootState) => state.chatState.value.chatMessages);

  const dispatch = useDispatch();

  const sender = getItem('clientD');
  const [loadingRoom, setLoadingRoom] = useState<boolean>(false);
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
  const [senderId, setSenderId] = useState<string>('');
  const [recipientId, setRecipientId] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>('');

  const retrieveChatMessages = () => {
    setLoadingMessages(true)
    const queryString: string = `?room=${roomId}&populate=sender,recipient,room`
    RETREIVE_CHAT_MESSAGES(queryString).then(res => {
      setLoadingMessages(false);
      const { payload } = res.data;
      setChatMessages(payload);
      dispatch(SET_CHAT_MESSAGES(payload));
    }).catch(err => {
      setLoadingMessages(false);
      console.log('error', err);
    })
  }

  const retrieveChatRooms = (roomId: string) => {
    setLoadingRoom(true);
    const query: string = `?_id=${roomId}&sort=-createdAt&populate=members,createdBy`;
    RETREIVE_CHAT_ROOMS(query).then(res => {
      setLoadingRoom(false)
      const { payload } = res.data;
      setChatRoom(payload[0]);
      dispatch(SET_ACTIVE_CHAT_ROOM(payload[0]));
    }).catch(err => {
      setLoadingRoom(false)
      console.log('error', err);
    })
  }


  const sendMessage = () => {
    const data = {
      message,
      room: roomId,
      sender: senderId,
      recipient: recipientId
    }
    if(message !== ''){
      SEND_CHAT_MESSAGE(data).then(res => {
        const { payload } = res.data;
        dispatch(ADD_CHAT_MESSAGE(payload))
        setMessage('');
      }).catch(err => {
        console.log('error', err);
      });
    }
  }

    useEffect(() => {
      if(sender){
        setSenderId(sender.id);
        setRoomId(sender.chatRoom);
        retrieveChatRooms(sender.chatRoom);
      }
    }, [sender]);

    useEffect(() => {
      if(chatRoom) {
        setRoomId(chatRoom.id);
        if(chatRoom.members.length > 0){
          setRecipientId(chatRoom.members.filter((member: any) => (member.id !== senderId))[0].id);
        }
      }
    }, [chatRoom]);

    useEffect(() => {
      if(roomId){
        if(chatMessages.length < 1) {
          setInterval(() => {
            retrieveChatMessages();
          }, 7000);
        }else {
          retrieveChatMessages();
        }
      }
    }, [roomId]);

    // useEffect(() => {
    //   setChatMessages(ChatMessages);
    // }, [ChatMessages]);


  return (
    <>
      <div className="w-full bg-white border-[1px] border-[#e0e0e0] rounded-lg shadow-md relative h-[90vh]">
        <ChatProfileComp data={chatRoom} />

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