import { createSlice } from "@reduxjs/toolkit";

interface ChatsState {
  messages: string[];
}

const initialState: ChatsState = {
  messages: ["lol", "kek"],
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
});

export const chatsReducer = chatsSlice.reducer;
