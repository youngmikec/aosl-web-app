import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessage, ChatRoom } from "../../common";

export interface ChatState {
  value: {
    activeRoom: ChatRoom | null,
    chatMessages: ChatMessage[] | []
  }
}

const initialState: ChatState = {
  value: {
    activeRoom:  null,
    chatMessages: []
  }
}

export const chatSlice = createSlice({
  name: 'chatState',
  initialState,
  reducers: {
    SET_ACTIVE_CHAT_ROOM: (state, action: PayloadAction<ChatRoom | null>) => {
      state.value.activeRoom = action.payload
    },
    SET_CHAT_MESSAGES: (state, action: PayloadAction<ChatMessage[]>) => {
      state.value.chatMessages = action.payload
    }, 
    ADD_CHAT_MESSAGE: (state, action: PayloadAction<ChatMessage>) => {
      const { chatMessages } = state.value
      state.value.chatMessages = [...chatMessages, action.payload]
    }
  }
})

export const { SET_ACTIVE_CHAT_ROOM, SET_CHAT_MESSAGES, ADD_CHAT_MESSAGE } = chatSlice.actions;
export default chatSlice.reducer;