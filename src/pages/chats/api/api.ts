import { ChatDto, MessageDto, ModelDto } from "@/pages/chats/api/dto";
import {
  mapChatDtoToChat,
  mapMessageDtoToMessage,
  mapModelDtoToModel,
} from "@/pages/chats/api/mappers";
import { request } from "@/shared/api";

export const getChats = async () => {
  const { data } = await request<{ data: ChatDto[] }>("/chat/list");
  return data.map(mapChatDtoToChat);
};

export const postChat = async (name: string, modelId: string) => {
  const chatDto = await request<ChatDto>("/chat", {
    method: "POST",
    body: { name, modelId: modelId },
  });
  return mapChatDtoToChat(chatDto);
};

export const deleteChatsById = async (id: string) => {
  return (
    await request<ChatDto>(`/chat/${id}`, {
      method: "DELETE",
    })
  ).id;
};

export const updateChat = async (id: string, params: { modelId: string }) => {
  const chatDto = await request<ChatDto>(`/chat/${id}`, {
    method: "PATCH",
    body: params,
  });
  return mapChatDtoToChat(chatDto);
};

export const getMessages = async (chatId: string) => {
  const { data } = await request<{ data: MessageDto[] }>(`/message/list`, {
    params: { chatId },
  });
  return data.map(mapMessageDtoToMessage);
};

export const postMessage = async (chatId: string, message: string) => {
  const res = await request<MessageDto>(`/message/send`, {
    method: "POST",
    body: { chatId, message },
  });
  return mapMessageDtoToMessage(res);
};

export const getModels = async () => {
  const res = await request<ModelDto[]>(`/model/list/compact`);
  return res
    .map(mapModelDtoToModel)
    .filter(
      (model) =>
        model.id === "gpt" || model.id === "midjourney" || model.id === "tts",
    );
};
