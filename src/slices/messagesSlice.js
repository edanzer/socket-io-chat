import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../lib/storage";

const initialMessages = JSON.parse(getLocalStorage("tellyChatMessages"))
  ? JSON.parse(getLocalStorage("tellyChatMessages"))
  : [];

const initialState = {
  messages: initialMessages,
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearAllMessages: (state, action) => ({ ...state, messages: [] }),
  },
});

export const { addMessage, clearAllMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
