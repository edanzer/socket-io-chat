import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../lib/storage";

let user = JSON.parse(getLocalStorage("tellyChatUser"))
  ? JSON.parse(getLocalStorage("tellyChatUser"))
  : null;

const initialState = {
  isInChat: false,
  user: user,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => ({ ...state, user: action.payload }),
    removeUser: (state, action) => ({ ...state, user: null }),
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
