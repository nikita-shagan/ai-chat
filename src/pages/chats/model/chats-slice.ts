import {
  deleteChatsById,
  getChats,
  getMessages,
  getModels,
  postChat,
  postMessage,
  updateChat,
} from "@/pages/chats/api/api";
import { createChatStream, getChatStream } from "@/pages/chats/api/sseChatApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type Model = {
  id: string;
  label: string;
};

export type Chat = {
  id: string;
  name: string;
  modelId: string;
  createdAt: string;
};

export type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
  tokens: number;
  createdAt: string;
  modelId: string;
  parentModel: Model | null;
};

interface ChatsState {
  chats: Chat[];
  chatsLoading: boolean;
  selectedChat: Chat | null;
  messages: Message[];
  models: Model[];
}

const initialState: ChatsState = {
  chats: [],
  chatsLoading: false,
  selectedChat: null,
  messages: [],
  models: [],
};

export const addChat = createAsyncThunk<
  Chat | null,
  { name?: string; existingChats?: Chat[] } | void
>("chats/addChat", async (data) => {
  try {
    const baseName = data?.name ?? "Новый чат";
    let uniqueName = baseName;
    let count = 2;
    const existingNamesSet = new Set(
      data?.existingChats?.map((c) => c.name) ?? [],
    );
    while (existingNamesSet.has(uniqueName)) {
      uniqueName = `${baseName} (${count})`;
      count++;
    }
    return await postChat(uniqueName, "gpt");
  } catch (e) {
    console.log(e);
    return null;
  }
});

export const fetchChats = createAsyncThunk<Chat[] | null>(
  "chats/fetchChats",
  async (_, { dispatch }) => {
    try {
      const chats = await getChats();
      if (chats.length === 0) {
        await dispatch(addChat());
        return null;
      } else {
        return chats;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  },
);

export const deleteChat = createAsyncThunk<string | null, string>(
  "chats/deleteChat",
  async (id) => {
    try {
      return await deleteChatsById(id);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
);

export const changeChatModel = createAsyncThunk<
  Chat | null,
  { chat: Chat | null; model: Model | null }
>("chats/changeChatModel", async ({ chat, model }) => {
  try {
    if (chat?.id && model?.id) {
      return await updateChat(chat.id, { modelId: model.id });
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
});

export const fetchMessages = createAsyncThunk<Message[] | null, string>(
  "chats/fetchMessages",
  async (chatId) => {
    try {
      return await getMessages(chatId);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
);

export const createMessage = createAsyncThunk<Message | null, Message>(
  "chats/createMessage",
  async (message) => {
    try {
      return message;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
);

export const updateMessage = createAsyncThunk<Message | null, Message>(
  "chats/updateMessage",
  async (message) => {
    try {
      return message;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
);

export const sendMessage = createAsyncThunk<
  void,
  {
    chat: Chat | null;
    message: string;
    existingChats?: Chat[];
  }
>(
  "chats/sendMessage",
  async ({ chat, message, existingChats }, { dispatch }) => {
    try {
      let chatId = chat?.id;
      if (!chatId) {
        chatId = (await dispatch(addChat({ existingChats })).unwrap())?.id;
      }
      if (chatId) {
        const stream = getChatStream(chatId);
        if (!stream) {
          createChatStream(chatId, {
            onCreateMessage: (message) => {
              dispatch(createMessage(message));
            },
            onUpdateMessage: (message) => {
              dispatch(updateMessage(message));
            },
          });
        }
        await postMessage(chatId, message);
      }
    } catch (e) {
      console.log(e);
    }
  },
);

export const fetchModels = createAsyncThunk<Model[] | null>(
  "chats/fetchModels",
  async () => {
    try {
      return await getModels();
    } catch (e) {
      console.log(e);
      return null;
    }
  },
);

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    selectChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChats.pending, (state) => {
      state.chatsLoading = true;
    });
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.chatsLoading = false;
      if (action.payload) {
        state.chats = action.payload;
        if (action.payload.length && !state.selectedChat) {
          state.selectedChat = action.payload[0];
        }
      }
    });
    builder.addCase(addChat.fulfilled, (state, action) => {
      if (action.payload) {
        state.chats.push(action.payload);
        state.selectedChat = action.payload;
      }
    });
    builder.addCase(changeChatModel.fulfilled, (state, action) => {
      const chat = action.payload;
      if (chat) {
        state.chats = state.chats.map((c) => {
          if (c.id === chat.id) {
            return { ...c, modelId: chat.modelId };
          }
          return c;
        });
        if (state.selectedChat?.id === chat.id) {
          state.selectedChat.modelId = chat.modelId;
        }
      }
    });
    builder.addCase(deleteChat.fulfilled, (state, action) => {
      if (action.payload) {
        state.chats = state.chats.filter((chat) => chat.id !== action.payload);
        state.selectedChat = null;
        state.messages = [];
      }
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      if (action.payload) {
        state.messages = action.payload;
      }
    });
    builder.addCase(createMessage.fulfilled, (state, action) => {
      if (action.payload) {
        state.messages.push(action.payload);
      }
    });
    builder.addCase(updateMessage.fulfilled, (state, action) => {
      const message = action.payload;
      if (message) {
        state.messages = state.messages.map((m) => {
          if (m.id === message.id) {
            return { ...m, content: message.content, tokens: message.tokens };
          }
          return m;
        });
      }
    });
    builder.addCase(fetchModels.fulfilled, (state, action) => {
      if (action.payload) {
        state.models = action.payload;
      }
    });
  },
});

export const chatsReducer = chatsSlice.reducer;
export const { selectChat } = chatsSlice.actions;
