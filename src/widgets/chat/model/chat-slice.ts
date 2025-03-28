import { createSlice } from "@reduxjs/toolkit";

interface ChatState {
  messages: string[];
}

const initialState: ChatState = {
  messages: ["lol", "kek"],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
});

export const chatReducer = chatSlice.reducer;
