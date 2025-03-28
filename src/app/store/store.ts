import { configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "@/widgets/chat/model/chat-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      chat: chatReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
