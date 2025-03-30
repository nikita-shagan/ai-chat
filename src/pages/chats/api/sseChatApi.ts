import { mapMessageDtoToMessage } from "@/pages/chats/api/mappers";
import { Message } from "@/pages/chats/model/chats-slice";
import { API_TOKEN, backendBaseUrl } from "@/shared/config";
import { EventSource } from "eventsource";

const streams: Record<string, EventSource> = {};

export const createChatStream = (
  chatId: string,
  callbacks: {
    onCreateMessage: (message: Message) => void;
    onUpdateMessage: (message: Message) => void;
  },
) => {
  if (!streams[chatId]) {
    const connection = new EventSource(
      `${backendBaseUrl}/chat/${chatId}/stream`,
      {
        fetch: (input, init) =>
          fetch(input, {
            ...init,
            headers: {
              ...init?.headers,
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }),
      },
    );
    connection.addEventListener("message", async (event: MessageEvent) => {
      const { data } = event;
      const parsedData = JSON.parse(data);
      if (parsedData.name === "MESSAGE_CREATE") {
        callbacks.onCreateMessage(
          mapMessageDtoToMessage(parsedData.data.message),
        );
      } else if (parsedData.name === "MESSAGE_UPDATE") {
        callbacks.onUpdateMessage(
          mapMessageDtoToMessage(parsedData.data.message),
        );
      }
    });
    streams[chatId] = connection;
  }
  return streams[chatId];
};

export const getChatStream = (chatId: string) => {
  return streams[chatId];
};
